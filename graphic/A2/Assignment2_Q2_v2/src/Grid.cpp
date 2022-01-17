/*
COMP 4490
Assignment 1
Li Borui

*/
#include "Grid.h"

Grid::Grid(
	point4 initialCenter,
	glm::vec3 initialTheta,
	glm::vec3 initialScale,
	FrameControl* frameControl,
	std::string veterxShader,
	std::string freShader) :
	Shape(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader) {
	initShape();

	this->top = new Light(
		glm::vec4(0,2, 0, 1),
		glm::vec4(0.3, 0.3, 0.3, 1.0),
		glm::vec4(0.8, 0.8, 0.8, 1.0),
		glm::vec4(1, 1, 1, 1.0),
		50
	);
	this->front = new Light(
		glm::vec4(0, 0, 2, 1),
		glm::vec4(0.3, 0.3, 0.3, 1.0),
		glm::vec4(0.8, 0.8, 0.8, 1.0),
		glm::vec4(1, 1, 1, 1.0),
		50
	);
}


void Grid::initShape() {

	float dx = 2.0 / N;
	for (size_t i = 0; i <= N; i++)
	{
		float x = -1 + i * dx;
		std::vector < point4 > temp;
		for (size_t j = 0; j <= N; j++)
		{
			float y = -1 + j * dx;
			temp.push_back(point4(x, y, 0, 1));
		}
		vertices.push_back(temp);
	}
	flattenVertices();
	linkIndiciesLoop();
	triangleConvert();

}





void Grid::update() {}


void Grid::updateDraw() {
	glUniform1i(glGetUniformLocation(program, "shaderIndex"), objectIndex);
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



void Grid::drawShape() {
	glUseProgram(program);
	glBindVertexArray(vao);

	frameControl->rotate(Theta);
	glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));
	if (this->veterxShader != "vshader10.glsl")
		drawTri();
	else {
		//bindPrintBuffer(program, printBuffer);
		glUniform1i(glGetUniformLocation(program, "rowSize"), vertices.size());
		glUniform1i(glGetUniformLocation(program, "patternSize"), 1);

		updateDraw();

		drawTriBatch();
		//printf("\n\nGLSL print:\n%s\n", getPrintBufferString(printBuffer).c_str());
	}
	glBindVertexArray(0);
}