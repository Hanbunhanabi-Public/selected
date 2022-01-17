/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#include "BasicAlgorithm.h"

BasicAlgorithm::BasicAlgorithm(
	std::vector<point4> * originVertices,
	std::vector<point4>* interpertedVertices,
	std::vector<GLuint>* interpertedVerticesIndicies,
	std::vector<int> *interpertedindex,
	int interval,
	int minDrawSize
) {

	this->originVertices = originVertices;
	this->interpertedVertices = interpertedVertices;
	this->interpertedVerticesIndicies = interpertedVerticesIndicies;
	this->interpertedindex = interpertedindex;
	this->interval = interval;
	this->drawable = false;
	this->minDrawSize = minDrawSize;
	this->Hermite = glm::mat4
	(2, -2, 1, 1,
	-3, 3, -2, -1,
	0, 0, 1, 0,
	1, 0, 0, 0);

}

void BasicAlgorithm::preProcessing() {
	drawable = originVertices->size() >= minDrawSize;
	interpertedVertices->clear();
	interpertedVerticesIndicies->clear();
	processingVertices.clear();
	interpertedindex->clear();
	processingVertices.insert(processingVertices.begin(), originVertices->begin(), originVertices->end());
}

void BasicAlgorithm::processing() {
	preProcessing();
}

glm::mat4x2 BasicAlgorithm::generatePointMatrix(point4 p0, point4 p1, point4 p2, point4 p3) {
	return glm::mat4x2(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

glm::vec4  BasicAlgorithm::generateT(float t) {
	return glm::vec4(pow(t, 3), pow(t, 2), t, 1);
}


BasicAlgorithm::~BasicAlgorithm() = default;