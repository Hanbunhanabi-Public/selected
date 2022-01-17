/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "Face.h"
#include "omp.h"
Face::Face()
{
}
Face::Face(const Face& face)
{
	this->verties = face.verties;
	this->inputInidices = face.inputInidices;
	this->newIndeices = face.newIndeices;
	this->center = face.center;
}

Face::Face(std::vector<point4>* verties, std::vector<GLuint>* inputInidices)
{
	this->verties = verties;
	this->inputInidices = inputInidices;
	this->newIndeices.resize(2 * this->inputInidices->size());
#pragma omp parallel for
	for (int i = 0; i < this->inputInidices->size(); i++)
	{
		newIndeices[i * 2] = this->inputInidices->at(i);
	}
	interplateFace();
}



int Face::searchPoints(point4 target)
{
	for (int i = 0; i < verties->size(); i++)
	{
		if (glm::all(glm::equal(verties->at(i), target)))
			return i;
	}
	return -1;
}


point4 Face::sum(std::vector<point4>* vetries, std::vector<GLuint>* inices) {
	point4 result;
#pragma parallel for reduction(+:result)
	for (size_t i = 0; i < inices->size(); i++)
	{
		result += vetries->at(inices->at(i));
	}
	return  result;
}

point4 Face::cacl_VF(std::vector<point4>* vetries, std::vector<GLuint>* inices) {
	return  (1.0f / inices->size()) * sum(vetries, inices);
}

void Face::interplateFace()
{
#pragma omp parallel for 
	for (int i = 1; i < newIndeices.size(); i += 2)
	{	//add Ms'verties 
		point4 newPoint;
		if (i != newIndeices.size() - 1) {
			newPoint = (verties->at(newIndeices[i - 1]) + verties->at(newIndeices[i + 1])) / 2.0f;
		}
		else
		{
			newPoint = (verties->at(newIndeices[i - 1]) + verties->at(newIndeices[0])) / 2.0f;
		}

		int index = searchPoints(newPoint);
#pragma omp critical
		{
			if (index == -1) {
				newIndeices[i] = this->verties->size();
				this->verties->push_back(newPoint);
			}
			else {
				newIndeices[i] = index;
			}
		}
	}
	// add center into verites
	point4 newCenter = cacl_VF(this->verties, this->inputInidices);

	this->center = this->verties->size();
	this->verties->push_back(newCenter);
}



std::vector<std::vector<GLuint>> Face::generateNewFaces()
{
	std::vector<std::vector<GLuint>> newFaces;
#pragma parallel for 
	for (int i = 0; i < newIndeices.size(); i += 2)
	{
		std::vector<GLuint> temp;

		if (i == 0) {
			temp.push_back(newIndeices[newIndeices.size() - 1]);
			temp.push_back(newIndeices[0]);
			temp.push_back(newIndeices[1]);
			;
		}
		else {
			temp.push_back(newIndeices[i - 1]);
			temp.push_back(newIndeices[i]);
			temp.push_back(newIndeices[i + 1]);

		}
		temp.push_back(center);
#pragma omp critical
		newFaces.push_back(temp);
	}

	return newFaces;
}

Face::~Face() = default;

