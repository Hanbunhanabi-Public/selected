/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "Shape.h"
//#include"shaderprintf.h"
Shape::Shape(
	point4 initialCenter,
	glm::vec3 initialAngle,
	glm::vec3 initialScale,
	FrameControl* frameControl,
	std::string veterxShader,
	std::string freShader

) {
	this->initCenter = initialCenter;
	this->currentCenter = initialCenter;
	this->initTheta = initialAngle;
	this->Theta = glm::vec3(0,0,0);
	this->frameControl = frameControl;
	this->vao =0;
	this->buffer =0;
	this->program=0;
	this->vPosition=0;
	this->Theta = glm::vec3(0, 0, 0);
	this->initialScale = initialScale;
	this->currentScale = initialScale;
	this->ScaleOffset = glm::vec3(1, 1, 1);
	this->ms = 0;
	this->prev_ms = 0;
	this->veterxShader = veterxShader;
	this->freShader = freShader;
	this->vetrexPosition = "vPosition";
	this->objectIndex = no++;

}

int Shape::no = 0;
void Shape::initial() {
	initVAO();

	initVerticesBuffer();
	initIndiciesBuffer();
	initVetriexData();
	initialRest();
}

void Shape::initialRest() {
	 //create a buffer to hold the printf results
	//printBuffer = createPrintBuffer();
	 //bind it to the current program
	//bindPrintBuffer(program, printBuffer);
	ModelView = glGetUniformLocation(program, "ModelView");
	Projection = glGetUniformLocation(program, "Projection");

}


void Shape::draw() {
	frameControl->push();
	frameControl->translate(currentCenter);
	frameControl->rotate(initTheta);
	frameControl->rescale(initialScale);
	drawShape();
	frameControl->pop();
}

void Shape::triangleConvert() {
	for (size_t i = 0; i < quad.size(); i++)
	{
		glm::vec3 u_1 = vertices1D[quad.at(i).at(0)] - vertices1D[quad.at(i).at(3)];
		glm::vec3 v_1 = vertices1D[quad.at(i).at(1)] - vertices1D[quad.at(i).at(0)];
		glm::vec3 normal_1 = normalize(cross(u_1, v_1));

			
		glm::vec3 u_2 = vertices1D[quad.at(i).at(1)] - vertices1D[quad.at(i).at(3)];
		glm::vec3 v_2 = vertices1D[quad.at(i).at(2)] - vertices1D[quad.at(i).at(1)];

		glm::vec3 normal_2 = normalize(cross(u_2, v_2));



		indicies.push_back(quad.at(i).at(3)); noramls.push_back(normal_1);
		indicies.push_back(quad.at(i).at(0)); noramls.push_back(normal_1);
		indicies.push_back(quad.at(i).at(1)); //noramls.push_back(normal_1);

		indicies.push_back(quad.at(i).at(3)); noramls.push_back(normal_2);
		indicies.push_back(quad.at(i).at(1)); noramls.push_back(normal_2);
		indicies.push_back(quad.at(i).at(2)); //noramls.push_back(normal_2);
		
	}
}

void Shape::linkIndiciesLoop() {
	for (size_t i = 0; i < vertices.size() - 1; i++) //y
	{

		for (size_t j = 0; j < vertices.at(i).size()-1; j++) //x
		{
			std::vector <GLuint> currentQuad;
			currentQuad.push_back(i * vertices.at(i).size() + j);
			currentQuad.push_back((i + 1) * vertices.at(i).size() + j);
			currentQuad.push_back((i + 1) * vertices.at(i).size() + j + 1);
			currentQuad.push_back(i * vertices.at(i).size() + j + 1);
			quad.push_back(currentQuad);
		}

	}

}

void Shape::rotate(glm::vec3 offset, int absolute =0) {

		this->Theta = absolute? offset:this->Theta+=offset;

	
}
void Shape::rescale(glm::vec3 offset, int absolute = 0) {
	this->currentScale = absolute ? offset : this->currentScale += offset;
}
void Shape::translate(glm::vec3 offset, int absolute = 0) {
	if (!absolute) {
		this->currentCenter.x += offset.x;
		this->currentCenter.y += offset.y;
		this->currentCenter.z += offset.z;
	}
	else {
		this->currentCenter.x = offset.x;
		this->currentCenter.y = offset.y;
		this->currentCenter.z = offset.z;
	}
}



void Shape::drawTri() {
	for (int i = 0; i < indicies.size(); i += 3) {
		glDrawElements(GL_LINE_LOOP, 3, GL_UNSIGNED_INT, (void*)(i * sizeof(GLuint)));
	}
}

void Shape::drawTriBatch() {
	
	glDrawElements(GL_TRIANGLES, indicies.size(),GL_UNSIGNED_INT,0);
}

void Shape::initVAO() {
	this->vao = 0;
	glGenVertexArrays(1, &this->vao);
	glBindVertexArray(this->vao);
	
}


void Shape::initVerticesBuffer() {

	// Create and initialize a buffer object
	glGenBuffers(1, &buffer);
	glBindBuffer(GL_ARRAY_BUFFER, buffer);

	glBufferData(GL_ARRAY_BUFFER, vertices1D.size() * sizeof(point4) + noramls.size()* sizeof(glm::vec3), NULL, GL_STATIC_DRAW);

	glBufferSubData(GL_ARRAY_BUFFER, 0, vertices1D.size() * sizeof(point4), (point4*)&vertices1D[0]);
	if (noramls.size()>0)
		glBufferSubData(GL_ARRAY_BUFFER, vertices1D.size() * sizeof(point4), noramls.size() * sizeof(glm::vec3), (glm::vec3*)&noramls[0]);


}

void Shape::initIndiciesBuffer() {

	glGenBuffers(1, &buffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer);
	if(indicies.size()>0)
		glBufferData( GL_ELEMENT_ARRAY_BUFFER, indicies.size()*sizeof(GLint), (GLint*)&indicies[0], GL_STATIC_DRAW );

}

void Shape::initVetriexData() {
	//program = InitShader("vshader6.glsl", "fshader6.glsl");
	program = InitShader(veterxShader.c_str(), freShader.c_str());
	glUseProgram(program);
	vPosition = glGetAttribLocation(program, vetrexPosition.c_str());
	glEnableVertexAttribArray(vPosition);
	glVertexAttribPointer(vPosition, 4, GL_FLOAT, GL_FALSE, 0, BUFFER_OFFSET(0));

	vNormal = glGetAttribLocation(program, "vNormal");
	glEnableVertexAttribArray(vNormal);
	glVertexAttribPointer(vNormal, 3, GL_FLOAT, GL_FALSE, 0,BUFFER_OFFSET(vertices1D.size() * sizeof(point4)));
}


void Shape::flattenVertices() {
	for (int i = 0; i < vertices.size(); i++)
	{
		vertices1D.insert(vertices1D.end(), vertices.at(i).begin(), vertices.at(i).end());
	}
}

Shape::~Shape() = default;

void Shape::reShape(int width, int height) {

	GLfloat aspect = GLfloat(width) / height;
	glUseProgram(program);
	glm::mat4  projection = glm::perspective(glm::radians(45.0f), aspect, 0.5f, 10.0f);

	glUniformMatrix4fv(Projection, 1, GL_FALSE, glm::value_ptr(projection));
}

