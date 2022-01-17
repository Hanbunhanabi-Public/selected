/*
COMP 4490
Assignment 1
Li Borui

*/
#pragma once
#include <string.h>
#include <iostream>
#include <vector>
#include "frameControl.h"
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
#include "json.hpp"
typedef glm::vec4 color4;
typedef glm::vec4 point4;
typedef glm::vec3 point3;
using json = nlohmann::json;
typedef struct {
	bool isIntersect;
	point3 intersectionpoint;
	point3 intersectionNormal;
	point3 color;
} IntersectionResult;
class Shape
{
private:
	
public:
	point3 center;
	json config;

	Shape(
	
	);

	Shape(
		json& config
	);
	virtual void updateData(json& config);

	virtual ~Shape();

};
