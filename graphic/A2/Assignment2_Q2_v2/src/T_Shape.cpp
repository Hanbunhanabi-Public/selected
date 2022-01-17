/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "T_Shape.h"

T_Shape::T_Shape(point4 initialCenter, glm::vec3 initialTheta, glm::vec3 initialScale, FrameControl* frameControl, std::string veterxShader, std::string freShader)
	: Base(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader)
{
	initShape();
}

void T_Shape::initShape()
{
	float z = 0.3;
	vertices1D = std::vector<point4>{
		point4(-1,1,z,1),	point4(1,1,z,1), point4(1,0.5,z,1), point4(0.3,0.5,z,1),point4(0.3, -1,z,1),
		point4(-0.3,-1,z,1), point4(-0.3,0.5,z,1), point4(-1,0.5,z,1),
		
		point4(-1,1,-z,1),	point4(1,1,-z,1), point4(1,0.5,-z,1), point4(0.3,0.5,-z,1),point4(0.3, -1,-z,1),
		point4(-0.3,-1,-z,1), point4(-0.3,0.5,-z,1), point4(-1,0.5,-z,1)
	};

	std::vector<GLuint> face1{ 0, 7, 15, 8 };
	std::vector<GLuint> face2{ 0,1,9,8};
	std::vector<GLuint> face3{ 1,2,10,9 };
	std::vector<GLuint> face4{ 3,2,10,11 };
	std::vector<GLuint> face5{ 3, 4,12,11 };
	std::vector<GLuint> face6{ 4,5,13,12 };
	std::vector<GLuint> face7{ 5, 6, 14,13};
	std::vector<GLuint> face8{ 6,7,15,14};
	//std::vector<GLuint> face9{ 0,7,15,8};
	std::vector<GLuint> face9{ 0,1,2,3,4,5,6,7};
	std::vector<GLuint> face10{ 8,9,10,11,12,13,14,15};
	this->quad.push_back(face1);
	this->quad.push_back(face2);
	this->quad.push_back(face3);
	this->quad.push_back(face4);
	this->quad.push_back(face5);
	this->quad.push_back(face6);
	this->quad.push_back(face7);
	this->quad.push_back(face8);
	this->quad.push_back(face9);
	this->quad.push_back(face10);
	

	objectList.push_back(Objects(this->vertices1D, this->quad));
}

T_Shape::~T_Shape() = default;
