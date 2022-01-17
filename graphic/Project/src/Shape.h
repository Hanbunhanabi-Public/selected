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

class Shape
{
private:
	
public:


	Shape(
	
	);
	
	IntersectionResult shphereIntersectionTest(point3 center, float radius, const point3& e, const point3& s);
	IntersectionResult planeIntersectionTest(point3 center, point3& normal, const point3& e, const point3& s);
	IntersectionResult TriListIntersectionTest(std::vector<std::vector<std::vector<float>>> &vertexes, const point3& e, const point3& s);
	IntersectionResult TriIntersectionTest(std::vector<std::vector<float>>& vertexes, const point3& e, const point3& s);
	int triTestHelper(point3 first, point3 second, point3 third, point3 x, point3 N);

	bool test(point3 d, point3 e, point3 c, float r, point3& hit);
	virtual ~Shape();

};
