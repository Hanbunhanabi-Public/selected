#pragma once
#include "Object.h"
class Toroids :
	public Object
{
public:
	point3 center;
	float innerRadius;
	float outterRadius;
	
	Toroids(json& object);
	void initial(json& object) override;
	void changeCenter(point3 newCenter);
	IntersectionResult directionIntersectionTest(const point3& e, const point3& d, Object* ref = nullptr) override;
	~Toroids();

};

