/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "Cube.h"

Cube::Cube(point4 initialCenter, glm::vec3 initialTheta, glm::vec3 initialScale, FrameControl* frameControl, std::string veterxShader, std::string freShader)
	: Base(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader)
{
	initShape();
}

void Cube::initShape()
{

	std::vector<point4>upper;
	upper.push_back(point4(1, 1, 1, 1));
	upper.push_back(point4(-1, 1, 1, 1));
	upper.push_back(point4(-1, 1, -1, 1));
	upper.push_back(point4(1, 1, -1, 1));

	std::vector<point4>lower;
	lower.push_back(point4(1, -1, 1, 1));
	lower.push_back(point4(-1, -1, 1, 1));
	lower.push_back(point4(-1, -1, -1, 1));
	lower.push_back(point4(1, -1, -1, 1));

	this->vertices.push_back(upper);
	this->vertices.push_back(lower);

	flattenVertices();
	std::vector<GLuint>top;
	std::vector<GLuint>buttom;
	std::vector<GLuint>front;
	std::vector<GLuint>back;
	std::vector<GLuint>left;
	std::vector<GLuint>right;

	top.push_back(0);
	top.push_back(1);
	top.push_back(2);
	top.push_back(3);

	buttom.push_back(4);
	buttom.push_back(5);
	buttom.push_back(6);
	buttom.push_back(7);

	front.push_back(0);
	front.push_back(1);
	front.push_back(5);
	front.push_back(4);


	back.push_back(2);
	back.push_back(3);
	back.push_back(7);
	back.push_back(6);

	left.push_back(1);
	left.push_back(2);
	left.push_back(6);
	left.push_back(5);

	right.push_back(0);
	right.push_back(3);
	right.push_back(7);
	right.push_back(4);
	this->quad.push_back(top);
	this->quad.push_back(buttom);
	this->quad.push_back(front);
	this->quad.push_back(back);
	this->quad.push_back(left);
	this->quad.push_back(right);


	objectList.push_back(Objects(this->vertices1D, this->quad));
}

Cube::~Cube() = default;
