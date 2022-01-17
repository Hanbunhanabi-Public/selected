/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#include "Catmull_Rom.h"
Catmull_Rom::Catmull_Rom(

	std::vector<point4>* originVertices,
	std::vector<point4>* interpertedVertices,
	std::vector<GLuint>* interpertedVerticesIndicies,
	std::vector<int>* interpertedindex,
	int interval
	)
	: BasicAlgorithm(originVertices, interpertedVertices, interpertedVerticesIndicies, interpertedindex, interval,2) {
	this->Coeff = glm::mat4
	(0, 1, 0, 0,
		0, 0, 1, 0,
		-0.5, 0, 0.5, 0,
		0, -0.5, 0, 0.5);

}

point4 Catmull_Rom::caculateMatrix(point4 p0, point4 p1, point4 p2, point4 p3, float t) {
	glm::mat4x2 points = generatePointMatrix(p0, p1, p2, p3);
	//glm::vec2 tempResult = generateT(t) * Hermite * Coeff * points;
	glm::vec2 tempResult = points* Coeff*Hermite*generateT(t);
	return glm::vec4(tempResult, 0, 1);
}

void Catmull_Rom::processing() {
	
		BasicAlgorithm::processing();
		if (drawable) {
		processingVertices.insert(processingVertices.begin(), processingVertices[0]);
		processingVertices.push_back(processingVertices[processingVertices.size() - 1]);
		int no = 0;
		for (int i = 0; i < processingVertices.size() - 3; i++) {
			float dx = 1.0 / interval;
			interpertedindex->push_back(interpertedVerticesIndicies->size());
			for (int j = 0; j < interval; j++)
			{
				interpertedVertices->push_back(
					caculateMatrix(processingVertices[i], processingVertices[i + 1], processingVertices[i + 2], processingVertices[i + 3], dx * j));
				interpertedVerticesIndicies->push_back(no++);
			}

		}
		interpertedindex->push_back(interpertedVerticesIndicies->size());
	}
}

Catmull_Rom::~Catmull_Rom() = default;