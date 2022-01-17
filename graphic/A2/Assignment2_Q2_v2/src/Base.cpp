/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "Base.h"
//#include "shaderprintf.h"
#include <omp.h>
Base::Base(
	point4 initialCenter,
	glm::vec3 initialTheta,
	glm::vec3 initialScale,
	FrameControl* frameControl,
	std::string veterxShader,
	std::string freShader) :
	Shape(initialCenter, initialTheta, initialScale, frameControl, veterxShader, freShader) {
	this->underLerp = false;
	this->currentDepth = 0;
	this->nextDepth = 0;
	this->currentLerp = 0;

	//initShape();
}

bool Base::goToNext()
{

	underLerp = true;
	nextDepth += 1;
	if (currentLerp == 1)
		currentLerp = 0;

	if (currentDepth == nextDepth)
		currentDepth -= 1;
	
	if (nextDepth >= objectList.size() )
	{
		Objects next = Objects(objectList[objectList.size() - 1]);
		
		next = catmull_clark.process(&next);
		next.updateNext();
		objectList.push_back(next);
		std::cout << "newDepth: " << nextDepth << std::endl;
	}
	return true;
}

bool Base::goToPrev()
{
	nextDepth -= 1;
	if (nextDepth < 0)
	{
		nextDepth = 0;
		std::cout << "reach the base, depth: 0 cannot go back" << std::endl;
		return false;
		
	}
	else {
		underLerp = true;
		if (currentLerp == 0)
			currentLerp = 1;
		if (currentDepth == nextDepth)
			currentDepth += 1;
		return true;
	}
}

std::vector<point4> Base::lerp(Objects* low, Objects* end)
{
	std::vector<point4> interperted;
	interperted.resize(low->verties.size());

	for (int i = 0; i < low->verties.size(); i++) {
		interperted[i] = low->verties[i] + (end->verties[i] - low->verties[i]) * currentLerp;
		interperted[i].w = 1;
	}

	return interperted;
}

int Base::lerpControl()
{
	std::vector<point4> interperted;
	int size;
	
	if (currentDepth != nextDepth) {
		float dLerp;
		Objects* low;
		Objects* high;
		
		if (currentDepth < nextDepth)
		{
			low = &objectList[currentDepth];
			high = &objectList[currentDepth+1];
			dLerp = LERP_DX;
		}
		else {
			low = &objectList[currentDepth-1];
			high = &objectList[currentDepth];
			dLerp = -LERP_DX;
		}
		interperted = lerp(low, high);
		currentLerp += dLerp;
		if (currentLerp >= 1)
		{
			currentLerp = 0;
			currentDepth += 1;
			std::cout << "current depth: " << currentDepth << " going to: " << nextDepth << std::endl;
		}
		else if (currentLerp <= 0) {
			currentLerp = 1;
			currentDepth -= 1;
			std::cout << "current depth: " << currentDepth << " going to: " << nextDepth << std::endl;
		}
		//upadteData(&interperted, &low->indices, &low->oldIndices,low->endVertiesIndex,  currentLerp);
		upadteData(&interperted, &low->indices,low->endVertiesIndex,  currentLerp);
		size = low->indices.size();
	}

	if (currentDepth == nextDepth) {
		if (underLerp == true) {
			underLerp == false;
			upadteData(objectList[currentDepth]);

		}
		
		size = objectList[currentDepth].indices.size();
		//size = objectList[currentDepth].indices.size()+ objectList[currentDepth].oldIndices.size();
	}
	return size;

}




void Base::initShape() {
}	

void Base::upadteData(Objects &object)
{
	upadteData(&object.verties, &object.indices, object.endVertiesIndex, 0.0f);
}



void Base::upadteData(std::vector<point4>* targetVerties, std::vector<GLuint>* targetIndicies,  int displayEnd, float opacity)
{
	glBindVertexArray(this->vao);
	glGenBuffers(1, &buffer);
	glBindBuffer(GL_ARRAY_BUFFER, buffer);
	glBufferData(GL_ARRAY_BUFFER, targetVerties->size() * sizeof(point4), NULL, GL_DYNAMIC_DRAW);
	glBufferSubData(GL_ARRAY_BUFFER, 0, targetVerties->size() * sizeof(point4), (point4*)&targetVerties->at(0));
	glGenBuffers(1, &buffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, buffer);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, targetIndicies->size() * sizeof(GLuint), (GLuint*)&targetIndicies->at(0), GL_DYNAMIC_DRAW);
	glEnableVertexAttribArray(vPosition);
	glVertexAttribPointer(vPosition, 4, GL_FLOAT, GL_FALSE, 0, BUFFER_OFFSET(0));
	glUniform1i(glGetUniformLocation(program, "displayLimit"), displayEnd);
	glUniform1f(glGetUniformLocation(program, "opacity"), opacity);
	Projection = glGetUniformLocation(program, "Projection");
}

void Base::initialRest()
{
	Shape::initialRest();
	upadteData(objectList[currentDepth]);


}

void Base::update() {
	
}

Base::~Base() = default;



void Base::drawShape() {
	
	

	glUseProgram(program);
	glBindVertexArray(this->vao);
	
	int inidicesEnd = lerpControl();
	//int inidicesEnd = objectList[0].indices.size();

	glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));
	//bindPrintBuffer(program, printBuffer);
	for (int i = 0; i < inidicesEnd; i += 4) {
		glDrawElements(GL_LINE_LOOP, 4, GL_UNSIGNED_INT, (void*)(i * sizeof(GLuint)));
	}
	//printf("\n\nGLSL print:\n%s\n", getPrintBufferString(printBuffer).c_str());
	glBindVertexArray(0);

}