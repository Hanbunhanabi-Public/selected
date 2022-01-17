/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#pragma once
#include"Face.h"
#include<map>
class Objects
{
public:
	int endVertiesIndex;
	std::vector<Face> faces;
	std::vector<point4> verties;
	std::vector<GLuint> indices;
	std::vector<GLuint> oldIndices;
	
	std::vector<std::vector<GLuint>> quads;
	std::vector<std::vector<GLuint>> newQuads;
	std::vector<std::vector<int>> verties_FaceIndex;
	std::map<GLuint, std::vector<int>>verties_midEdgeIndex;
	Objects(
		std::vector<point4> verties,
		std::vector<std::vector<GLuint>> quads
	);
	Objects();
	Objects(const Objects & object);
	void generateVerties_FaceIndex();
	void generateMidIndex_Index();
	void processing();
	void update();
	void updateNext();
	void updateFace();
	void generateIndices();
	void generateOldIndices();
	std::vector<std::vector<GLuint>> findPointMIndex();
	std::vector<std::vector<GLuint>> findPointVIndex();
	std::vector<GLuint> findPointEVIndex( GLuint target );
	std::vector<GLuint> findPointEDIndex( GLuint target );
	~Objects();
};

