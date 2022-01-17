#include "Sphere.h"

Sphere::Sphere()
{
}

void Sphere::updateData(json& config)
{
	Shape:; updateData(config);
	this->radius = config["radius"];
}

Sphere::Sphere(json& config) :Shape(config) {
	this->radius = config["radius"];
}

IntersectionResult Sphere::intersectionTest(point3 center, float radius ,const point3& e, const point3& s) {
	this->center = center;
	this->radius = radius;
	IntersectionResult result;
	result.isIntersect = false;

	point3 d = (s - e);

	point3 ec = e - this->center;
	float b = glm::dot(d, ec);
	float dd = glm::dot(d, d);
	float y = glm::pow(b, 2) - dd * (glm::dot(ec, ec) - glm::pow(this->radius,2));
	if (y < 0)
		return result;
	float t1 = (-b - glm::sqrt(y)) /dd;
	float t2 = (-b + glm::sqrt(y)) /dd;

	d = glm::normalize(d);
	point3 p1 = - d * t1;
	point3 p2 = - d * t2;
	float length1 = glm::distance(p1, e);
	float length2 = glm::distance(p2, e);
	point3 finalT = length1 <= length2 ? p1 : p2;
	if (finalT.z < 1)
		return result;
	result.intersectionpoint = finalT;
	result.intersectionNormal = ec - finalT;
	result.isIntersect = true;
	if (finalT.x == center.x && finalT.y == center.y)
		result.color = point3(0, 1, 0);
	else
		result.color = point3(1, 1, 1);
	return result;
}

Sphere::~Sphere() = default;