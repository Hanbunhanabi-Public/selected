/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "L_Shape.h"

L_Shape::L_Shape(point4 initialCenter, glm::vec3 initialTheta, glm::vec3 initialScale, FrameControl* frameControl, std::string veterxShader, std::string freShader)
	: Base(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader)
{
	initShape();
}

void L_Shape::initShape()
{
	float z = 0.3;
	vertices1D = std::vector<point4>{
	point4(-1,1,z,1),	point4(-1,-1,z,1),	point4(1, -1,z, 1),	point4(1,-0.5,z,1),	point4(-0.5,-0.5,z,1), point4(-0.5,1,z,1),
	point4(-1,1,-z,1),	point4(-1,-1,-z,1),	point4(1, -1,-z, 1),	point4(1,-0.5,-z,1),	point4(-0.5,-0.5,-z,1), point4(-0.5,1,-z,1)
	};

	std::vector<GLuint> face1{ 1,2,8,7 };
	std::vector<GLuint> face2{ 2,3,9,8 };
	std::vector<GLuint> face3{ 3,4,10, 9 };
	std::vector<GLuint> face4{ 4,5,11,10 };
	std::vector<GLuint> face5{ 0,5,11,6 };
	std::vector<GLuint> face6{ 0,1,7,6 };
	std::vector<GLuint> face7{ 0,1,2,3,4,5};
	std::vector<GLuint> face8{ 6,7,8,9,10,11};
	this->quad.push_back(face1);
	this->quad.push_back(face2);
	this->quad.push_back(face3);
	this->quad.push_back(face4);
	this->quad.push_back(face5);
	this->quad.push_back(face6);
	this->quad.push_back(face7);
	this->quad.push_back(face8);

	objectList.push_back(Objects(this->vertices1D, this->quad));
}

L_Shape::~L_Shape() = default;
