/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#pragma once
#include "Base.h"
class T_Shape :
	public Base
{
public:
	T_Shape(
		point4 initialCenter,
		glm::vec3 initialTheta,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader);
	void virtual initShape();
	~T_Shape();
};

