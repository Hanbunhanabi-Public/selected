/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#pragma once
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <vector>
typedef glm::vec4 point4;
class Face
{
public:
	std::vector<point4>* verties;
	std::vector<GLuint>* inputInidices;
	std::vector<GLuint> newIndeices;
	int center;
	Face();
	Face(const Face &face);
	Face(
		std::vector<point4>* verties,
		std::vector<GLuint>* inputInidices
		);
	void interplateFace();
	int searchPoints(point4 target);
	point4 sum(std::vector<point4>* vetries, std::vector<GLuint>* inices);
	point4 cacl_VF(std::vector<point4>* vetries, std::vector<GLuint>* inices);
	std::vector<std::vector <GLuint> > generateNewFaces();
	~Face();
};

