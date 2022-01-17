#include "Toroids.h"

Toroids::Toroids(json& object):Object(object)
{
	this->initial(object);
}

void Toroids::initial(json& object)
{
	Object::initial(object);
	this->center = vector_to_vec3( object["center"]);
	this->innerRadius = (float)object["innerRadius"];
	this->outterRadius = (float)object["outterRadius"];
	this->box = new AABB(
		this->center - point3(this->innerRadius + this->outterRadius),
		this->center + point3(this->innerRadius + this->outterRadius)
	);
}

void Toroids::changeCenter(point3 newCenter)
{
	this->center = newCenter;
	free(this->box);
	this->box = new AABB(
		this->center - point3(this->innerRadius + this->outterRadius),
		this->center + point3(this->innerRadius + this->outterRadius)
	);
}

IntersectionResult Toroids::directionIntersectionTest(const point3& e, const point3& c, Object* ref)
{
	/*equation from https://blog.csdn.net/libing_zeng/article/details/54563431 for calculate intersection
	 *only algorithm for A,B,C,D,E no code is used.
	 * 
	 */
	point3 d = glm::normalize(c);
	point3 oc = e - this->center;
	float factor1 = glm::dot(d, d); //x1^2 + y1^2 + z1^2 ray
	float factor2 = glm::dot(oc, oc); //x0^2 + y0^2 + z0^2 to center
	float rPow2 = innerRadius * innerRadius + outterRadius * outterRadius;
	float factor3 = glm::dot(oc, d); //x0x1 + y0y1 + z0z1

	float A = factor1 * factor1;
	float B = 4 * factor3 * factor1;
	float C = 2 * factor1 * (factor2 - rPow2) + 4 * factor3 * factor3 + 
		4 * outterRadius * outterRadius * d.z * d.z;
	float D = 4 * factor3 * (factor2 - rPow2) + 
		8 * outterRadius * outterRadius * d.z * oc.z;
	float E = pow((factor2 - rPow2), 2) - 4 * outterRadius * outterRadius * (innerRadius * innerRadius - oc.z * oc.z);
	std::vector<float> roots = solve4thQuadEqul(A, B, C, D, E);
	
	for (size_t i = 0; i < roots.size(); i++)
	{
		if (roots[i] < 0)
		{
			roots.erase(roots.begin() + i);
			i--;
		}
	}
	
	if (roots.size() == 0)
		return IntersectionResult();
	std::sort(roots.begin(), roots.end());
	float root = getCloestT((roots));
	if (root == -1)
		return IntersectionResult();
	
	IntersectionResult result;
	result.isIntersect = true;
	point3 hitPoint = e + root * d;
	result.t = root/glm::length(c);
	// a simple test for correct the normal
	point3 innerTest = hitPoint - this->center;
	innerTest.z = 0;
	bool isInnerCircle = glm::length(innerTest) < this->outterRadius;


	result.intersectionpoint = hitPoint;
	result.intersectionNormal.x = 2 * (glm::dot(hitPoint, hitPoint) - rPow2) * 2 * hitPoint.x;
	result.intersectionNormal.y = 2 * (glm::dot(hitPoint, hitPoint) - rPow2) * 2 * hitPoint.y;
	result.intersectionNormal.z = -(2 * (glm::dot(hitPoint, hitPoint) - rPow2) * 2 * hitPoint.z + 8 * outterRadius * outterRadius * hitPoint.z);

	if (isInnerCircle)
	{
		result.intersectionNormal.x = -result.intersectionNormal.x;
		result.intersectionNormal.y = -result.intersectionNormal.y;
	}

	result.intersectionNormal = glm::normalize(result.intersectionNormal);

	return result;
}

Toroids::~Toroids()
{
	free(box);
}

