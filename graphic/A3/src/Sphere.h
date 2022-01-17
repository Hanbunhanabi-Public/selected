#pragma once
#include "Shape.h"
class Sphere :
	public Shape
{
public:
	float radius;

	Sphere();
	void updateData(json& config);
	Sphere(json& config);
	point4 cacluateNormal(point4 inputPoint);
	IntersectionResult intersectionTest(point3 center, float radius, const point3& e, const point3& s);
	~Sphere();
};

