/*
COMP 4490
Assignment 1
Li Borui

*/
#pragma once
#include "Shape.h"
#include "Light.h"




class Grid :
	public Shape
{
public:
	const int N = 17;
	const int NumVertices = N * N * 4;
	Grid(
		point4 initialCenter,
		glm::vec3 initialTheta,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader);
	Light* front;
	Light* top;
	void initShape();
	void drawShape();
	//void initial();
	//void initialRest();
	void update();
	void updateDraw();
};

