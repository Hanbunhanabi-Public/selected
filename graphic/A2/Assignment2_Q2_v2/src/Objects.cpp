/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "Objects.h"
#include <omp.h>
#include <algorithm> 
Objects::Objects(std::vector<point4> verties, std::vector<std::vector<GLuint>> quads)
{
	this->verties = verties;
	this->quads = quads;
	this->endVertiesIndex = verties.size();
	update();
}

Objects::Objects()
{
}

Objects::Objects(const Objects& object)
{
	this->endVertiesIndex = object.endVertiesIndex;
	this->faces = object.faces;
	this->verties = object.verties;
	this->indices = object.indices;
	this->quads = object.quads;
	this->newQuads = object.newQuads;
	//dagerous 
	this->verties_FaceIndex = object.verties_FaceIndex;
	this->verties_midEdgeIndex = object.verties_midEdgeIndex;
	this->oldIndices = object.oldIndices;
	for (size_t i = 0; i < this->faces.size(); i++)
	{
		faces[i].verties = &this->verties;
		faces[i].inputInidices = &this->quads[i];
	}
	
}



void Objects::generateVerties_FaceIndex()
{
	verties_FaceIndex.resize(endVertiesIndex);
#pragma omp parallel for
	for (int i = 0; i < this->faces.size(); i++)
	{
		for (int j = 0; j < this->faces[i].inputInidices->size(); j++) {
#pragma omp critical
			verties_FaceIndex[this->faces[i].inputInidices->at(j)].push_back(i);
		}
	}
}

void Objects::generateMidIndex_Index()
{
	for (int i = 0; i < this->faces.size(); i++)
	{
		for (int j = 1; j < this->faces[i].newIndeices.size(); j+=2) {
			std::map<GLuint, std::vector<int>>::iterator iter;
			iter = verties_midEdgeIndex.find(this->faces[i].newIndeices[j]);
			if (iter != verties_midEdgeIndex.end())
				iter->second.push_back(i);
			else
			{
				std::vector<int>temp;
				temp.push_back(i);
				verties_midEdgeIndex.insert(std::pair<GLuint, std::vector<int>>(this->faces[i].newIndeices[j],  temp));
			}
		}
	}
}

void Objects::processing()
{
	
}

void Objects::update()
{

	for (int i = 0; i < this->quads.size();i++)
	{
		faces.push_back(Face(&this->verties, &this->quads[i]));
	}
	
	generateVerties_FaceIndex();
	generateMidIndex_Index();
	updateFace();
	generateIndices();
	generateOldIndices();
}

void Objects::updateNext()
{
	this->quads = this->newQuads;
	this->verties_FaceIndex.clear();
	this->indices.clear();
	this->newQuads.clear();
	this->verties_midEdgeIndex.clear();
	this->faces.clear();
	this->endVertiesIndex = verties.size();
	update();
}

void Objects::updateFace()
{
	std::vector<std::vector<GLuint>> temp;
	for (size_t i = 0; i < this->faces.size(); i++)
	{
		std::vector<std::vector<GLuint>> temp2 = this->faces[i].generateNewFaces();
		temp.insert(temp.end(),temp2.begin(), temp2.end());
	}
	this->newQuads = temp;
}

void Objects::generateIndices()
{
	for each (std::vector<GLuint> var in newQuads)
	{
		this->indices.insert(this->indices.end(), var.begin(), var.end());
	}

}

void Objects::generateOldIndices()
{
	for (int i = 0; i < quads.size(); i++)
	{
		this->oldIndices.insert(oldIndices.end(), quads[i].begin(), quads[i].end());
	}
}

std::vector<std::vector<GLuint>> Objects::findPointMIndex()
{	
	std::vector<std::vector<GLuint>> result;



	for (int i = 0; i < verties_FaceIndex.size(); i++)
	{
		std::vector<GLuint> singleM;
		for each (int face in verties_FaceIndex[i])
		{
			std::vector<GLuint>::iterator newIndicesItr = find(this->faces[face].newIndeices.begin(), this->faces[face].newIndeices.end(), i);
			if ((*newIndicesItr) == this->faces[face].newIndeices[0]) {
				singleM.push_back(this->faces[face].newIndeices[this->faces[face].newIndeices.size() - 1]);
				singleM.push_back(this->faces[face].newIndeices[1]);
			}
			else {
				singleM.push_back(*std::prev(newIndicesItr,1));
				singleM.push_back(*std::next(newIndicesItr,1));
			}
		}
		std::sort(singleM.begin(), singleM.end());
		std::vector<GLuint>::iterator uniqueItr = std::unique(singleM.begin(), singleM.end());
		singleM.resize(std::distance(singleM.begin(), uniqueItr));

		result.push_back(singleM);
	}

	return result;
	
}



std::vector<std::vector<GLuint>> Objects::findPointVIndex()
{
	std::vector<std::vector<GLuint>> result;

	for each (std::vector<int> vertexes in verties_FaceIndex) {
		std::vector<GLuint> singleV;
		for each (int face in vertexes)
		{

			singleV.push_back(this->faces[face].center);

		}
		result.push_back(singleV);
	}
	return result;
}

std::vector<GLuint> Objects::findPointEVIndex(GLuint target)
{
	std::vector<GLuint> result;
	std::map<GLuint, std::vector<int>>::iterator itr = verties_midEdgeIndex.find(target);
	for each (int face in itr->second)
	{
		result.push_back(this->faces[face].center);
	}
	return result;
}

std::vector<GLuint> Objects::findPointEDIndex(GLuint target)
{
	std::vector<GLuint>result;
	std::map<GLuint, std::vector<int>>::iterator itr = verties_midEdgeIndex.find(target);
	int face = itr->second[0];
	
	std::vector<GLuint>::iterator gitr = std::find(this->faces[face].newIndeices.begin(), this->faces[face].newIndeices.end(), target);
	result.push_back(*(gitr - 1));

	if (gitr != this->faces[face].newIndeices.end() - 1)
	{
		result.push_back(*(gitr + 1));
	}
	else
	{
		result.push_back(this->faces[face].newIndeices[0]);
	}
	
	return result;
}

Objects::~Objects() = default;



