/*
COMP 4490
Assignment 3
Li Borui

*/
#include "Object.h"
Object::Object() {
	this->secondIndex =  secondIndex = objectIndex++;
}

Object::Object(json& config)
{
	
}

void Object::initial(json& object)
{
	this->index = objectIndex++;
	this->secondIndex = 0;
	this->materialLight = generateNewMaterialLight(object);
}

IntersectionResult Object::intersectionTest(const point3& e, const point3& s)
{
	return directionIntersectionTest(e, s - e);
}

int Object::objectIndex = 0;

IntersectionResult Object::planeDirectionIntersectionTest(point3 center, point3& normal, const point3& e, const point3& d)
{
	IntersectionResult result;
	result.isIntersect = false;
	float part2 = glm::dot(normal, d);
	if (part2 == 0)
		return result;

	float t = (glm::dot(normal, (center - e))) / part2;
	if (t <= 0)
		return result;

	result.intersectionpoint = e + float(t) * d;
	result.intersectionNormal = glm::normalize(normal);
	result.isIntersect = true;

	result.t = t;
	return result;
}

Object::~Object() = default;


IntersectionResult Object::planeIntersectionTest(point3 center, point3& normal, const point3& e, const point3& s)
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
	result.t = t;

	return result;
}

