/*
COMP 4490
Assignment 3
Li Borui

*/
#include "Plane.h"
Plane::Plane()
{
}

Plane::Plane(json& object):Object(object)
{
	this->initial(object);
}

void Plane::initial(json& object)
{
	Object::initial(object);
	this->center = vector_to_vec3( object["position"]);
	this->normal = vector_to_vec3 (object["normal"]);
}

IntersectionResult Plane::directionIntersectionTest(const point3& e, const point3& d,Object* ref )
{
	return planeDirectionIntersectionTest(this->center, this->normal, e, d);
}

Plane::~Plane() = default;

