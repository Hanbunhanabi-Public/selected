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
typedef glm::vec4 color4;
typedef glm::vec4 point4;
typedef glm::vec3 point3;
using json = nlohmann::json;

class Light
{
public:
	Light();
	point3 ambient(const point3 & Ia, const point3 & Ka );
	point3 diffuse(const point3 & N, const point3 & L, const point3 & Id, const point3 & Kd);
	point3 specular(const point3 & Is, const point3 & Ks, const point3 & N, const point3 & L, const point3 & V, const float & shiness);
	point3 ambientLighting(const MaterialLight & materialLight, const LightSource & lightSource);
	point3 directionalLighting(const IntersectionResult & intersectionResult, const MaterialLight & materialLight, const LightSource & lightSource, const point3 & eye);
	point3 pointLighting(const IntersectionResult & intersectionResult, const point3 & eye, const MaterialLight & materialLight, const LightSource & lightSource);
	point3 spotLighting(const IntersectionResult & intersectionResult, const point3 & eye, const MaterialLight & materialLight, const LightSource & lightSource);
	point3 processLighting(const IntersectionResult & intersectionResult, const point3 & eye, const LightSource & lightSource);
	//point3 basicLighting(IntersectionResult intersectionResult, point3 eye, MaterialLight materialLight, LightSource lightSource);
	
	~Light();
};

