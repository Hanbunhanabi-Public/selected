#pragma once
#include "Object.h"
#include "utli.h"
class Cones :
	public Object
{public:
	float alpha;
	float r1;
	float r2;
	point3 Pa;
	point3 pMiddle;
	point3 pButton;
	point3 vA;
	Cones(json& object);
	void initial(json& object) override;
	IntersectionResult directionIntersectionTest(const point3& e, const point3& d, Object* ref = nullptr) override;
	~Cones();
};

