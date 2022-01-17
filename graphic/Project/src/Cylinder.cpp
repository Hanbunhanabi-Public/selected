#include "Cylinder.h"

Cylinder::Cylinder(json& object):Object(object)
{
	this->initial(object);
}

void Cylinder::initial(json& object)
{
	Object::initial(object);
	this->pA = vector_to_vec3(object["a"]);
	this->pB = vector_to_vec3(object["b"]);
	this->radius = (float)object["r"];
	point3 temp = pB - pA;
	this->vA = temp / glm::length(temp);

	Point3Tuple2 boxTesting = findMinMax({ this->pA, this->pB });
	this->box = new AABB(boxTesting.a - point3(this->radius, this->radius, this->radius),
		boxTesting.b + point3(this->radius, this->radius, this->radius));

}

IntersectionResult Cylinder::directionIntersectionTest(const point3& e, const point3& d, Object* ref)
{
	/*
	 * equation for cylinder from: https://mrl.nyu.edu/~dzorin/rend05/lecture2.pdf
	 * for algorithm to calculate A, B, C, and idea for check the top and button
	 */

	//step 1: calculate the t that hit the infinite cylinder, if no solution then no hit at all
	point3 temp = d - glm::dot(d, vA) * vA;
	float A = glm::dot(temp, temp);
	point3 deltaP = e - pA;
	float B = 2.0f * glm::dot(d - glm::dot(d, vA) * vA, deltaP - glm::dot(deltaP, vA) * vA);
	point3 temp2 = deltaP - glm::dot(deltaP, vA) * vA;
	float C = glm::dot(temp2, temp2) - radius * radius;
	float rootCount = 0;
	FloatTuple2 ts = solve2ndQuadEql(A, B, C, rootCount);
	float t;
	std::vector<float> tss;
	if (rootCount == 0)
		return IntersectionResult();

	//gather and check intersections
	if (rootCount == 1 && ts.a >= 0)
		tss.push_back(ts.a);
	else {
		if (ts.a >=0)
			tss.push_back(ts.a);
		if (ts.b>=0)
			tss.push_back(ts.b);
	}
	//check each intersection point is in range
	for (size_t i = 0; i < tss.size(); i++)
	{
		point3 q = e + tss[i] * d;
		if (!(glm::dot(vA, q - pA) > 0 && glm::dot(vA, q - pB) < 0)) {
			tss.erase(tss.begin() + i);
			i--;
		}
	}
	//step 2 check cap interesction
	IntersectionResult cap1 = planeDirectionIntersectionTest(pA, -vA, e, d);
	IntersectionResult cap2 = planeDirectionIntersectionTest(pB, vA, e, d);
	

	if (cap1.isIntersect ) {
		point3 temp3 = cap1.intersectionpoint - pA;
		if (glm::dot(temp3, temp3) < radius * radius)
			tss.push_back(cap1.t);
	}
	if (cap2.isIntersect) {
		point3 temp4 = cap2.intersectionpoint - pB;
		if (glm::dot(temp4, temp4) < radius * radius)
			tss.push_back(cap2.t);
	}
	if (tss.size() == 0)
		return IntersectionResult();

	std::sort(tss.begin(), tss.end());
	float root = getCloestT(tss);
	if (root == -1)
		return IntersectionResult();
	
	IntersectionResult final;
	final.intersectionpoint = e + root * d;
	if (root == cap1.t) {
		final.intersectionNormal = cap1.intersectionNormal;
	}
	else if (root == cap2.t)
	{
		final.intersectionNormal = cap2.intersectionNormal;
	}
	else {
		float centerFactor = glm::dot( final.intersectionpoint - pA, vA );
		point3 centerPoint = pA + centerFactor * vA;
		final.intersectionNormal = glm::normalize(final.intersectionpoint - centerPoint);
	}
	final.ref = this;
	final.materialLight = materialLight;
	final.t = root;
	final.isIntersect = true;
	return final;
}

Cylinder::~Cylinder() {
	free(box);
}

