/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#pragma once
#include "BasicAlgorithm.h"
class Bezier :
	public BasicAlgorithm
{
public:
	Bezier(
		std::vector<point4>* originVertices,
		std::vector<point4>* interpertedVertices,
		std::vector<GLuint>* interpertedVerticesIndicies,
		std::vector<int>* interpertedindex,
		int interval

	);
	glm::mat4 BezierMatrix;
	point4 virtual caculateMatrix(point4 p0, point4 p1, point4 p2, point4 p3, float t);
	void virtual processing();
	~Bezier();
};

