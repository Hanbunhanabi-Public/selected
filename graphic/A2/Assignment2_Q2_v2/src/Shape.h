/*
COMP 4490
Assignment 1
Li Borui

*/
#pragma once
#include <string.h>
#include <iostream>
#include <vector>
#include "frameControl.h"
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>

//#include "shaderprintf.h"
typedef glm::vec4 color4;
typedef glm::vec4 point4;
class Shape
{
private:
	
public:
	glm::vec3 initialScale;
	glm::vec3 currentScale;
	glm::vec3 ScaleOffset;
	static int no;
	int objectIndex;
	long long ms;
	long long prev_ms;

	GLuint vao;
	GLuint buffer;
	GLuint program;
	GLuint vPosition;
	GLuint ModelView;
	GLuint Projection;
	GLuint color1;
	GLuint color2;
	GLuint vNormal;
	GLuint printBuffer;
	
	//GLuint printBuffer;

	std::string veterxShader;
	std::string freShader;
	std::string vetrexPosition;

	point4 initCenter;
	point4 currentCenter;

	glm::vec3 initTheta;
	glm::vec3 Theta;


	FrameControl* frameControl;
	std::vector<std::vector<point4>> vertices;
	std::vector<point4> vertices1D;
	std::vector<color4> colors;
	std::vector<glm::vec3 > noramls;
	std::vector<GLuint> indicies;
	std::vector<std::vector<GLuint>>quad;
	std::vector <point4> face1;




	Shape(
		point4 initialCenter,
		glm::vec3 initialTheta,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader

	);


	void initVAO();
	void initial();
	void virtual initialRest();
	void initVerticesBuffer();
	void initIndiciesBuffer();
	void initVetriexData();
	void virtual initShape() = 0;
	void virtual drawShape() = 0;
	void virtual update() = 0;
	void triangleConvert();
	void linkIndiciesLoop();
	void flattenVertices();
	void draw();
	void drawTri();
	void drawTriBatch();
	void rotate(glm::vec3 offset,int absolute);
	void rescale(glm::vec3 offset, int absolute);
	void translate(glm::vec3 offset, int absolute);
	void reShape(int width, int height);
	void updateDraw();
	~Shape();

};
