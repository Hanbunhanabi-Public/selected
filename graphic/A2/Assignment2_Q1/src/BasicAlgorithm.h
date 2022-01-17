/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#pragma once
#include<iostream>
#include <vector>
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
typedef glm::vec4 point4;
class BasicAlgorithm
{
public:
	BasicAlgorithm(
		std::vector<point4>* originVertices,
		std::vector<point4>* interpertedVertices,
		std::vector<GLuint>* interpertedVerticesIndicies,
		std::vector<int>* interpertedindex,
		int interval,
		int minDrawSize
		);
	bool drawable;
	int minDrawSize;
	std::vector<point4> * originVertices;
	std::vector<point4> * interpertedVertices;
	std::vector<point4> processingVertices;
	
	std::vector<GLuint> * interpertedVerticesIndicies;

	std::vector<int> * interpertedindex;
	
	int interval;

	glm::mat4 Hermite;
	//point4 virtual generateCurve();
	void virtual preProcessing();
	point4 virtual caculateMatrix(point4 p0, point4 p1, point4 p2, point4 p3, float t) = 0;
	glm::mat4x2 generatePointMatrix(point4 p0, point4 p1, point4 p2, point4 p3);
	glm::vec4 generateT(float t);
	void virtual processing();

	~BasicAlgorithm();

};

