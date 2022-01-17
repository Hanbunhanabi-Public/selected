/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#include "B_Spline.h"

B_Spline::B_Spline(
	std::vector<point4>* originVertices,
	std::vector<point4>* interpertedVertices,
	std::vector<GLuint>* interpertedVerticesIndicies,
	std::vector<int>* interpertedindex,
	int interval)
	: BasicAlgorithm(originVertices, interpertedVertices, interpertedVerticesIndicies, interpertedindex, interval, 2) {
	this->BCoffe = glm::mat4
	(-1, 3, -3, 1,
		3, -6, 3, 0,
		-3, 0, 3, 0,
		1, 4, 1, 0);
}

point4  B_Spline::caculateMatrix(point4 p0, point4 p1, point4 p2, point4 p3, float t) {
	glm::mat4x2 points = generatePointMatrix(p0, p1, p2, p3);
	//glm::vec2 tempResult = generateT(t) * Hermite * Coeff * points;
	glm::vec2 tempResult = points *BCoffe * (1.0f / 6)* generateT(t) ;
	return glm::vec4(tempResult, 0, 1);
}


void B_Spline::processing() {

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

B_Spline:: ~B_Spline() = default;