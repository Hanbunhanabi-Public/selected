/*
COMP 4490
Assignment 3
Li Borui

*/
#pragma once
#include <string.h>
#include <iostream>
#include <vector>
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
#include "json.hpp"
#include "utli.h"
#include "AABB.h"
typedef glm::vec4 color4;
typedef glm::vec4 point4;
typedef glm::vec3 point3;
using json = nlohmann::json;
class Object
{
public:
	int index;
	int secondIndex;
	AABB* box;
	static int objectIndex;
	MaterialLight materialLight;
	Object();
	Object(json& config);
	virtual void initial(json &object);
	virtual IntersectionResult intersectionTest(const point3& e, const point3& s);
	virtual IntersectionResult directionIntersectionTest(const point3& e, const point3& d,Object* ref = nullptr)=0;
	IntersectionResult planeDirectionIntersectionTest(point3 center, point3& normal, const point3& e, const point3& d);
	IntersectionResult planeIntersectionTest(point3 center, point3& normal, const point3& e, const point3& s);
	virtual ~Object();
};

