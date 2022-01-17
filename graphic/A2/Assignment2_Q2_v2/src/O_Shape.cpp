/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "O_Shape.h"

O_Shape::O_Shape(point4 initialCenter, glm::vec3 initialTheta, glm::vec3 initialScale, FrameControl* frameControl, std::string veterxShader, std::string freShader)
	: Base(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader)
{
	initShape();
}

void O_Shape::initShape()
{
	float z = 0.3;
	vertices1D = std::vector<point4>{
			point4(-1,1,z,1), point4(1,1,z,1), point4(1,-1,z,1), point4(-1,-1,z,1),
			point4(-0.5,0.5,z,1), point4(0.5,0.5,z,1), point4(0.5,-0.5,z,1), point4(-0.5,-0.5,z,1),

			point4(-1,1,-z,1), point4(1,1,-z,1), point4(1,-1,-z,1), point4(-1,-1,-z,1),
			point4(-0.5,0.5,-z,1), point4(0.5,0.5,-z,1), point4(0.5,-0.5,-z,1), point4(-0.5,-0.5,-z,1),
	};

	std::vector<GLuint> face1{ 0,1,9,8 };
	std::vector<GLuint> face2{ 1,2,10,9};
	std::vector<GLuint> face3{ 2,3,11,10 };
	std::vector<GLuint> face4{ 0,3,11,8 };

	std::vector<GLuint> face5{ 4,5,13,12 };
	std::vector<GLuint> face6{ 5,6,14,13 };
	std::vector<GLuint> face7{ 6,7,15,14 };
	std::vector<GLuint> face8{ 4,7,15,12};

	std::vector<GLuint> face9{ 0,4,5,1};
	std::vector<GLuint> face10{ 1,2,6,5};
	std::vector<GLuint> face11{ 2,3,7,6};
	std::vector<GLuint> face12{ 3,0,4,7};

	std::vector<GLuint> face13{ 8,9,13,12};
	std::vector<GLuint> face14{ 9,10,14,13};
	std::vector<GLuint> face15{ 10,11,15,14};
	std::vector<GLuint> face16{ 11,8,12,15};
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
	this->quad.push_back(face11);
	this->quad.push_back(face12);
	this->quad.push_back(face13);
	this->quad.push_back(face14);
	this->quad.push_back(face15);
	this->quad.push_back(face16);
	
	

	objectList.push_back(Objects(this->vertices1D, this->quad));
}

O_Shape::~O_Shape() = default;
