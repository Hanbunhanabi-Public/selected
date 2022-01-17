/*
COMP 4490
Assignment 1
Li Borui

*/
#include "Circle.h"

Circle::Circle(
	point4 initialCenter,
	glm::vec3 initialTheta,
	glm::vec3 initialScale,
	FrameControl* frameControl,
	std::string veterxShader,
	std::string freShader) :
	Shape(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader) {
	this->useScale = 0;
	initShape();


}



void Circle::initShape() {
	float dr = 360.0f / 50.0f;
	this->vertices1D.push_back(glm::vec4(0, 0, 0, 1));
	for (int i = 0; i < 50; i++)
	{

		this->vertices1D.push_back(glm::vec4(cos(glm::radians(i * dr)), sin(glm::radians(i * dr)), 0, 1));
		if (i != 49)
			this->vertices1D.push_back(glm::vec4(cos(glm::radians((i + 1) * dr)), sin(glm::radians((i + 1) * dr)), 0, 1));
		else
			this->vertices1D.push_back(glm::vec4(cos(glm::radians(0.0f)), sin(glm::radians(0.0f)), 0, 1));
	}
	for (size_t i = 1; i < vertices1D.size() - 1; i++)
	{
		this->indicies.push_back(0);
		this->indicies.push_back(i);
		this->indicies.push_back(i + 1);
	}
}

void Circle::update() {

}

void Circle::drawShape() {
	glUseProgram(program);
	glBindVertexArray(vao);
	glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));
	drawTriBatch();
	glBindVertexArray(0);
}