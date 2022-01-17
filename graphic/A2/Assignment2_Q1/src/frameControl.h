/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#pragma once
#include <string.h>
#include <vector>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>

class FrameControl
{
public:
	std::vector<glm::mat4>drawingStack;
	
	glm::mat4* peak;
	glm::mat4* transPeak;
	FrameControl();


	void push();
	void pop();
	void rotate(glm::vec3 offset);
	void rescale(glm::vec3 offset);
	void translate(glm::vec3 offset);
	
	~FrameControl();
};

