/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#pragma once
#include <vector>;
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
#include "Objects.h"
typedef glm::vec4 point4;

class Catmull_Clark
{
public:

	Catmull_Clark();

	Objects process( Objects * target );
	point4 sum(std::vector<point4>* vetries, std::vector<GLuint>* inices);
	point4 cacl_VF(std::vector<point4>* vetries, std::vector<GLuint>* inices);
	point4 cacl_E(point4 d1, point4 d2, point4 v1, point4 v1_1);
	point4 cacl_d_(point4 d1, point4 r, point4 s, int n);
	point4 cacl_R(std::vector<point4>* vetries, std::vector<GLuint>* inices);
	point4 cacl_S(std::vector<point4>* vetries, std::vector<GLuint>* inices, int m);

	~Catmull_Clark();
	
	

};

