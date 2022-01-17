#include"Cones.h"

Cones::Cones(json& object):Object(object)
{
	this->initial(object);
}

void Cones::initial(json& object)
{
	Object::initial(object);
	this->pMiddle = vector_to_vec3(object["middle"]);
	this->pButton = vector_to_vec3(object["button"]);
	this->r1 = (float)object["r1"];
	this->r2 = (float)object["r2"];
	point3 temp = pMiddle - pButton;
	this->Pa = pButton + r1 * temp / (r1 - r2);
	this->vA = -temp / glm::length(temp);
	this->alpha = glm::atan( (r1 - r2) / glm::length(temp));
	Point3Tuple2 boxTesting = findMinMax({ this->pButton, this->Pa });
	this->box = new AABB(boxTesting.a - point3(this->r1, this->r1, this->r1),
		boxTesting.b + point3(this->r1, this->r1, this->r1));
}

IntersectionResult Cones::directionIntersectionTest(const point3& e, const point3& c, Object* ref)
{
	/*
	 * equation from https://mrl.nyu.edu/~dzorin/rend05/lecture2.pdf: for calculate the angle
	 * equation from http://lousodrome.net/blog/light/2017/01/03/intersection-of-a-ray-and-a-cone/ for calculate the the intersection on cone surface
	 * for algorithm calculate A, B, C, and angle
	 */
	point3 d = glm::normalize(c);
	point3 deltaP = e - Pa;

	float A = pow(glm::dot(d, vA), 2) - pow(cos(alpha), 2);
	float B = 2.0f * (glm::dot(d, vA) * glm::dot(deltaP, vA) - glm::dot(d, deltaP) * pow(cos(alpha), 2));
	float C = pow(glm::dot(deltaP, vA), 2) - glm::dot(deltaP, deltaP) * pow(cos(alpha), 2);

	//---------------------from cylinder;
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
		if (ts.a >= 0 )
			tss.push_back(ts.a);
		if (ts.b >= 0 )
			tss.push_back(ts.b);

	}

	for (size_t i = 0; i < tss.size(); i++)
	{
		point3 tests1 = e + tss[i] * d;
		point3 q = e + tss[i] * d - Pa;
		float h = glm::dot(q, vA);

		if (h < 0 || h> abs( glm::length(Pa-pButton))) {
			tss.erase(tss.begin()+i);
			i--;
		}

		

	}


	IntersectionResult cap1 = planeDirectionIntersectionTest(pButton, vA, e, d);
	if (cap1.isIntersect) {
		point3 temp3 = cap1.intersectionpoint - pButton;
		if (glm::dot(temp3, temp3) < r1 * r1)
			tss.push_back(cap1.t);
	}
	if (tss.empty())
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
	else {
		float centerFactor = glm::dot( final.intersectionpoint - pButton,-vA);
		point3 centerPoint = pButton + centerFactor * -vA;

		point3 a = final.intersectionpoint - centerPoint;
		point3 b = Pa - centerPoint;
		point3 c = Pa - final.intersectionpoint;
		point3 k = glm::cross(a, b);
		final.intersectionNormal = glm::normalize(glm::cross(c, k));

	}
	
	final.ref = this;
	final.refPoint = e;
	final.materialLight = materialLight;
	final.t = root/ glm::length(c);
	final.isIntersect = true;
	return final;
}

Cones::~Cones()
{
	free(box);
}


