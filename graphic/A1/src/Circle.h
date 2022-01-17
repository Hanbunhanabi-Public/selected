
/*
COMP 4490
Assignment 1
Li Borui

*/
#pragma once
#include "Shape.h"
#define CIRCLE_FAN 50
class Circle :
	public Shape
{
private:

public:
	
	Circle(
		point4 initialCenter,
		glm::vec3 initialTheta,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader);
	float sizeOffset = 1;
	int useScale;
	void drawShape();
	void initShape();
	//void initial();
	//void initialRest();
	void update();
	~Circle();
};

