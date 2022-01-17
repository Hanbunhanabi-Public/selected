/*
COMP 4490
Assignment 1
Li Borui

*/
#include "Ball.h"
#include <cmath>
#include <iostream>
//#include "shaderprintf.h"

Ball::Ball(
	point4 initialCenter,
	glm::vec3 initialTheta,
	glm::vec3 initialScale,
	FrameControl* frameControl,
	std::string veterxShader,
	std::string freShader
) :
	Shape(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader) {

	this->direction = 0.01;
	this->currentScale.x = initialScale.x * (ScaleOffset.x);
	this->currentScale.y = initialScale.y * (ScaleOffset.y);
	this->currentScale.z = initialScale.z * (ScaleOffset.z);
	this->vel = 0;
	initShape();

	Circle* wellShadow = new Circle(
		point4(0, 0, -0.99, 0),
		glm::vec3(0, 0, 0),
		glm::vec3(0.5, 0.5, 0.5),
		frameControl,
		"vshader9.glsl",
		"fshader9.glsl"
	);
	Circle* groundShadow = new Circle(
		point4(0, 0, 0, 0),
		glm::vec3(90, 0, 0),
		glm::vec3(0.5, 0.5, 0.5),
		frameControl,
		"vshader9.glsl",
		"fshader9.glsl"
	);
	groundShadow->useScale = 1;
	this->circles.push_back(wellShadow);
	this->circles.push_back(groundShadow);

	this->top = new Light(
		glm::vec4(0, 2, 0, 1),

		glm::vec4(0.3, 0.3, 0.3, 1.0),
		glm::vec4(0.75, 0.75, 0.75, 1.0),
		glm::vec4(1, 1, 1, 1.0),
		50
	);
	this->front = new Light(
		glm::vec4(0, 0, 2, 1),
		glm::vec4(0.3, 0.3, 0.3, 1.0),
		glm::vec4(0.75, 0.75, 0.75, 1.0),
		glm::vec4(1, 1, 1, 1.0),
		50
	);

}

void Ball::initial() {

	Shape::initial();



	for (size_t i = 0; i < circles.size(); i++)
	{
		circles[i]->initial();
	}

}

void Ball::initShape() {

	//initial vertex

	float interval = 20;
	for (int i = 0; i <= 360; i += interval)
	{
		std::vector <point4> temp;
		float f = glm::radians(i * 1.0f);
		for (int j = 0; j <= 180; j += interval)
		{
			float o = glm::radians(j * 1.0f);
			float x = sin(f) * cos(o);
			float y = sin(f) * sin(o);
			float z = cos(f);

			temp.push_back(point4(x, z, -y, 1));
		}
		vertices.push_back(temp);
	}
	flattenVertices();

	linkIndiciesLoop();
	triangleConvert();
	setNormal();
}

void Ball::setNormal() {
	noramls.clear();

	for (size_t i = 0; i < vertices1D.size(); i++)
	{
		noramls.push_back(normalize(glm::vec3(vertices1D[i].x, vertices1D[i].y, vertices1D[i].z)));
	}
}


void Ball::update() {
	//Theta[Axis] += 0.5;
	Theta[Axis] += 1.0;
	if (Theta[Axis] > 360.0) {
		Theta[Axis] -= 360.0;
	}

	currentCenter.x += direction;
	if (currentCenter.x + initialScale.x >= 1)
	{
		currentCenter.x = 1 - initialScale.x;
		direction = -direction;
	}
	else if (currentCenter.x - initialScale.x <= -1)
	{
		currentCenter.x = -1 + initialScale.x;
		direction = -direction;
	}

}

void Ball::gravty() {
	double dt = (ms - prev_ms) * 0.001;
	vel += acc * dt;
	currentCenter.y += vel * dt;
	if (currentCenter.y <= -1 + currentScale.y)
	{
		currentCenter.y = -1 + currentScale.y;
		vel = sqrt(2 * (initCenter.y - currentCenter.y) * (-acc));
	}
	prev_ms = ms;
}

void Ball::updateDraw() {
	glUniform1i(glGetUniformLocation(program, "shaderIndex"), objectIndex);
	glUniform1i(glGetUniformLocation(program, "rowSize"), vertices.at(0).size());
	glUniform1i(glGetUniformLocation(program, "patternSize"), 1);
	glUniform1i(glGetUniformLocation(program, "useLight"), 1);
	glUniformMatrix4fv(glGetUniformLocation(program, "ModelViewInverseTranspose"), 1, GL_FALSE,
		glm::value_ptr(glm::transpose(glm::inverse(*frameControl->peak))));
	glUniform4fv(glGetUniformLocation(program, "color1"),
		1, glm::value_ptr(colors[0]));
	glUniform4fv(glGetUniformLocation(program, "color2"),
		1, glm::value_ptr(colors[1]));

	glUniformMatrix4fv(glGetUniformLocation(program, "worldSetup"), 1, GL_FALSE, glm::value_ptr(frameControl->drawingStack[1]));
	

	glUniform4fv(glGetUniformLocation(program, "topAmbient"),
		1, glm::value_ptr(top->lightAmbient));
	glUniform4fv(glGetUniformLocation(program, "topDiffuse"),
		1, glm::value_ptr(top->lightDiffuse));
	glUniform4fv(glGetUniformLocation(program, "topSpecular"),
		1, glm::value_ptr(top->lightSpecular));


	glUniform4fv(glGetUniformLocation(program, "topLightPosition"),
		1, glm::value_ptr(top->lightPosition));

	glUniform1f(glGetUniformLocation(program, "topShininess"),
		top->material_shininess);
	//------------------------------------------------------------------//
	glUniform4fv(glGetUniformLocation(program, "frontAmbient"),
		1, glm::value_ptr(front->lightAmbient));
	glUniform4fv(glGetUniformLocation(program, "frontDiffuse"),
		1, glm::value_ptr(front->lightDiffuse));
	glUniform4fv(glGetUniformLocation(program, "frontSpecular"),
		1, glm::value_ptr(front->lightSpecular));

	glUniform4fv(glGetUniformLocation(program, "frontLightPosition"),
		1, glm::value_ptr(front->lightPosition));

	glUniform1f(glGetUniformLocation(program, "frontShininess"),
		front->material_shininess);


}


void Ball::drawShape() {

	gravty();
	glUseProgram(program);
	glBindVertexArray(vao);
	frameControl->rotate(Theta);
	frameControl->rescale(ScaleOffset);

    glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));

	if (this->veterxShader != "vshader10.glsl")
		drawTri();
	else {
		//bindPrintBuffer(program, printBuffer);
		updateDraw();
		drawTriBatch();
		
		//printf("\n\nGLSL print:\n%s\n", getPrintBufferString(printBuffer).c_str());
	}
	glBindVertexArray(0);


}

void Ball::draw() {
	frameControl->push(); //1

	frameControl->push();  //2
	point4 tempSpot;
	tempSpot.x = currentCenter.x;
	tempSpot.z = currentCenter.z;
	tempSpot.y = -0.99f;

	float ch1 = (initCenter.y - currentCenter.y)+0.15;
	float cr1 = (initialScale.y) * (initCenter.y + 1);


	circles[1]->initialScale.x = cr1 / ch1;
	circles[1]->initialScale.y = cr1 / ch1;
	circles[1]->initialScale.z = cr1 / ch1;

	frameControl->translate(tempSpot);

	circles[1]->draw();
	frameControl->pop(); //2


	frameControl->translate(currentCenter);
	frameControl->push();

	float circleR2Y = ( currentCenter.y - front-> lightPosition.y);
	float circleh2Y = ( front-> lightPosition.z - currentCenter.z);
	float circleH2Y = (  1+ front->lightPosition.z);
	float circler2Y = circleH2Y * circleR2Y / circleh2Y;
	float circleOffsetY = circler2Y - currentCenter.y;

	float circleR2X = (currentCenter.x - front->lightPosition.x);
	float circleh2X = (front->lightPosition.z - currentCenter.z);
	float circleH2X = (1 + front->lightPosition.z);
	float circler2X = circleH2X * circleR2X / circleh2X;
	float circleOffsetX = circler2X - currentCenter.x;

	frameControl->translate(glm::vec3(circleOffsetX, circleOffsetY, 0));
	circles[0]->draw();
	frameControl->pop();

	frameControl->rotate(initTheta);
	frameControl->rescale(initialScale);
	drawShape();
	frameControl->pop(); //1

}
void Ball::reShape(int width, int height)
{
	Shape::reShape(width, height);
	for (size_t i = 0; i < circles.size(); i++)
	{
		circles[i]->reShape(width, height);
	}
}
Ball::~Ball() = default;