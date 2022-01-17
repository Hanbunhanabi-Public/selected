/*
COMP 4490
Assignment 1
Li Borui

*/
#pragma once
#include "Shape.h"
#include "Circle.h"
#include "Light.h"
#define BALL_DX_FACTOR 25
class Ball :
	public Shape
{
private:
	GLint RowSize, PatternSize;
	GLuint ModelViewInverseTranspose;
	float v = 0;
	double acc = -9.8;
	double vel;
	std::vector<Circle*> circles;
	Light *top;
	Light* front;
	float direction;

public:
	float Axis = 1;
	Ball(point4 initialCenter,
		glm::vec3 initialTheta,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader

	);

	void drawShape();
	void initShape();
	void initial();
	//void initialRest();
	void update();
	void gravty();
	void draw();
	void updateDraw();
	void reShape(int width, int height);
	void setNormal();
	~Ball();

};

