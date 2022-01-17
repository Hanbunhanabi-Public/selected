/*
COMP 4490
Assignment 3
Li Borui

*/
#include "Sphere.h"

Sphere::Sphere()
{
}

Sphere::Sphere(json& object):Object(object)
{
	this->initial(object);
}

void Sphere::initial(json& object)
{
	Object::initial(object);
	this->center = vector_to_vec3( object["position"]);
	this->radius =  float (object["radius"]);
	box = new AABB(this->center - point3(this->radius, this->radius, this->radius),
		this->center + point3(this->radius, this->radius, this->radius));
}

IntersectionResult Sphere::directionIntersectionTest(const point3& e, const point3& d, Object* ref )
{
	IntersectionResult result;
	result.isIntersect = false;



	double disc = pow(glm::dot(d, e - this->center), 2) - glm::dot(d, d) * (glm::dot(e - this->center, e - this->center) - radius * radius);

	if (disc < 0)
		return result;

	double rest = glm::dot(-d, e - this->center) / glm::dot(d, d);
	double sqrtDisc = sqrt(disc);
	double t;
	double t3;
	if (disc > 0)
	{
		double t1 = rest + sqrtDisc / glm::dot(d, d);
		double t2 = rest - sqrtDisc / glm::dot(d, d);

		if (t1 < t2)
		{
			t = t1;
			t3 = t2;
		}
		else 
		{ 
			t = t2;
			t3 = t1;
		}
		if (t <= 0)
			t = t3;
	}
	else { 
		t = rest; 

	}

	if (t <= 0)
		return result;
	result.intersectionpoint = e + float(t) * d;
	result.intersectionNormal = glm::normalize(result.intersectionpoint - this->center);
	result.isIntersect = true;
	result.t = t;
	return result;
}

Sphere::~Sphere() {
	free(box);
};

