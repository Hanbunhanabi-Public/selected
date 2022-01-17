/*
COMP 4490
Assignment 3
Li Borui

*/
#include "Shape.h"
#include "utli.h"

Shape::Shape(
) {
}
IntersectionResult Shape::shphereIntersectionTest(point3 c, float radius, const point3& e, const point3& s)
{

	IntersectionResult result;
	result.isIntersect = false;

	point3 d = s - e;

	double disc = pow(glm::dot(d, e - c), 2) - glm::dot(d, d) * (glm::dot(e - c, e - c) - radius * radius);

	if (disc < 0)
		return result;

	double rest = glm::dot(-d, e - c) / glm::dot(d, d);
	double sqrtDisc = sqrt(disc);
	double t;
	if (disc > 0)
	{
		double t1 = rest + sqrtDisc / glm::dot(d, d);
		double t2 = rest - sqrtDisc / glm::dot(d, d);

		if (t1 < t2)
			t = t1;
		else t = t2;
	}
	else t = rest;

	result.intersectionpoint = e + float(t) * d;
	result.intersectionNormal = glm::normalize(result.intersectionpoint - c);
	result.isIntersect = true;
	return result;
}

IntersectionResult Shape::planeIntersectionTest(point3 center, point3& normal, const point3& e, const point3& s)
{
	IntersectionResult result;
	result.isIntersect = false;
	point3 d = s - e;
	float part2 = glm::dot(normal, d);
	if (part2 == 0)
		return result;

	float t = (glm::dot(normal, (center - e))) / part2;
	if (t <= 0)
		return result;

	result.intersectionpoint = e + float(t) * d;
	result.intersectionNormal = glm::normalize(normal);
	result.isIntersect = true;

	return result;
}

IntersectionResult Shape::TriListIntersectionTest(std::vector<std::vector<std::vector<float>>>& vertexes, const point3& e, const point3& s)
{
	IntersectionResult result;
	for (size_t i = 0; i < vertexes.size(); i++)
	{
		result = TriIntersectionTest(vertexes[i], e, s);
		if (result.isIntersect)
			return result;
	}
	result.isIntersect = false;
	return result;
}

IntersectionResult Shape::TriIntersectionTest(std::vector<std::vector<float>>& vertexes, const point3& e, const point3& s)
{
	point3 a = vector_to_vec3(vertexes[0]);
	point3 b = vector_to_vec3(vertexes[1]);
	point3 c = vector_to_vec3(vertexes[2]);
	point3 normal = glm::normalize(glm::cross((a - b) , (a - c)));
	IntersectionResult result = planeIntersectionTest(a, normal, e, s);
	if (!result.isIntersect)
		return result;
	int count = 0;
	count += triTestHelper(b, a, a, result.intersectionpoint, normal);
	count += triTestHelper(c, b, b, result.intersectionpoint, normal);
	count += triTestHelper(a, c, c, result.intersectionpoint, normal);
	
	if (3 != abs(count))
		result.isIntersect = false;
	result.intersectionNormal = normal;
	return result;
	

}

int Shape::triTestHelper(point3 first, point3 second, point3 third, point3 x, point3 N)
{
	float result = glm::dot(glm::cross( (first - second) , (x - third) ), N);
	if (result >0)
		return 1;
	if (result == 0)
		return 0;
	else return -1;

	
}

bool Shape::test(point3 d, point3 e, point3 c, float r, point3& hit) {
	float disc = pow(glm::dot(d, e - c), 2) - (glm::dot(d, d) * (glm::dot(e - c, e - c) - pow(r, 2)));
	if (disc < 0)
		return false;
	double rest = glm::dot(-d, e - c) / glm::dot(d, d);
	double sqrtDisc = sqrt(disc);
	double t;
	if (disc > 0)
	{
		double t1 = rest + sqrtDisc / glm::dot(d, d);
		double t2 = rest - sqrtDisc / glm::dot(d, d);

		if (t1 < t2)
			t = t1;
		else t = t2;
	}
	else t = rest;
	hit = e + float(t) * d;
	return true;
}


Shape::~Shape() = default;



