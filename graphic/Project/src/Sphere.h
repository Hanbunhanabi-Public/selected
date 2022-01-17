/*
COMP 4490
Assignment 3
Li Borui

*/
#pragma once
#include"Object.h"
class Sphere :
	public Object
{
public:
	point3 center;
	float radius;
	Sphere();
	Sphere(json& object);
	void initial(json& object) override;
	//IntersectionResult intersectionTest(const point3& e, const point3& s) override;
	IntersectionResult directionIntersectionTest(const point3& e, const point3& d,Object* ref =nullptr) override;
	~Sphere();
	

};

