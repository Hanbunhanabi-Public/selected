#pragma once
#include "Object.h"
#include "utli.h"
class Cylinder :
	public Object
{
public:
	point3 pA;
	point3 pB;
	point3 vA;

	float radius;
	Cylinder(json& object);
	void initial(json& object) override;
	IntersectionResult directionIntersectionTest(const point3& e, const point3& d, Object* ref = nullptr) override;

	~Cylinder();

};

