/*
COMP 4490
Assignment 3
Li Borui

*/
#pragma once
#include "Sphere.h"
#include "Plane.h"
#include "Meshs.h"
#include "Light.h"
#include "Cylinder.h"
#include "BasicNode.h"
#include "Cones.h"
#include "Toroids.h"
class ObjectList
{
public:
	Light light;
	bool isDebug;
	std::vector<Object*> list;
	std::vector<Object*> walls;
	BasicNode* root;
	ObjectList(json& senses);
	ObjectList();
	IntersectionResult tracing(const point3& e, const point3& s);
	IntersectionResult directionalTracing(const point3& e, const point3& d);
	IntersectionResult partialTracing(const point3& e, const point3& d, Object* ref);
	Point3Tuple2 findTreeMinMax(std::vector<Object*>list);

	
	~ObjectList();
};

