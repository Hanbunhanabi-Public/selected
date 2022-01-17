#include "Triangle.h"

Triangle::Triangle(std::vector<std::vector<float>>& triangle, MaterialLight& materialLight): Object()
{
	for (size_t i = 0; i < triangle.size(); i++)
	{
		this->triangle.push_back(vector_to_vec3(triangle[i]));
	}
	this->materialLight = materialLight;
	Point3Tuple2 firstCompare = findMinMax({ this->triangle[0],this->triangle[1] });
	Point3Tuple2 secondCompare = findMinMax({ firstCompare.a, this->triangle[2] });
	Point3Tuple2 thirdCompare = findMinMax({ firstCompare.b, this->triangle[2] });
	this->min = secondCompare.a;
	this->max = thirdCompare.b;
	point3 a = this->triangle[0];
	point3 b = this->triangle[1];
	point3 c = this->triangle[2];


	this->normal = glm::normalize(glm::cross((a - c), (b - a)));
	box = new AABB(this->min, this->max);
}

Triangle::Triangle(std::vector<std::vector<float>>& triangle, MaterialLight& materialLight, int id):Object()
{
	for (size_t i = 0; i < triangle.size(); i++)
	{
		this->triangle.push_back(vector_to_vec3(triangle[i]));
	}
	this->materialLight = materialLight;
	Point3Tuple2 firstCompare = findMinMax({ this->triangle[0],this->triangle[1] });
	Point3Tuple2 secondCompare = findMinMax({ firstCompare.a, this->triangle[2] });
	Point3Tuple2 thirdCompare = findMinMax({ firstCompare.b, this->triangle[2] });
	this->min = secondCompare.a;
	this->max = thirdCompare.b;
	point3 a = this->triangle[0];
	point3 b = this->triangle[1];
	point3 c = this->triangle[2];
	this->index = id;

	this->normal = glm::normalize(glm::cross((a - c), (b - a)));
	box = new AABB(this->min, this->max);
}

IntersectionResult Triangle::directionIntersectionTest(const point3& e, const point3& d, Object* ref)
{
	point3 a = this->triangle[0];
	point3 b = this->triangle[1];
	point3 c = this->triangle[2];
	IntersectionResult result = planeDirectionIntersectionTest(a, normal, e, d);
	if (!result.isIntersect)
		return result;
	int count = 0;
	count += triTestHelper(b, a, a, result.intersectionpoint, normal);
	count += triTestHelper(c, b, b, result.intersectionpoint, normal);
	count += triTestHelper(a, c, c, result.intersectionpoint, normal);

	if (3 != abs(count))
		result.isIntersect = false;
	result.secondaryRef = this;
	result.ref = this;
	return result;
}

int Triangle::triTestHelper(point3 first, point3 second, point3 third, point3 x, point3 N)
{
	float result = glm::dot(glm::cross((first - second), (x - third)), N);
	if (result > 0)
		return 1;
	if (result == 0)
		return 0;
	else return -1;
}

void Triangle::resetNormal(point3 center)
{
	point3 direction = this->triangle[0] - center;
	if (glm::dot(this->normal, direction) < 0)
		this->normal = -normal;
}

Triangle::~Triangle() {
	free(box);
}
