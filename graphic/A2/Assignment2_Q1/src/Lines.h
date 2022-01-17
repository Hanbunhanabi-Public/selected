/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#pragma once
#include "Shape.h"
#include "Catmull_Rom.h"
#include "Bezier.h"
#include "B_Spline.h"

typedef enum { CATNUMM_ROM, BEZIER, B_SPLINE } currentLineType;

class Lines :
	public Shape
{
private:
	bool done;
	int t;
	int drawOffest;
	int interval;

public:
	GLuint arrayBuffer;
	GLuint interperatedArrayBuffer;
	GLuint indicieBuffer;
	GLuint interperatedIndicieBuffer;
	std::vector<point4> interpertedVertices;
	std::vector<GLuint> interpertedVerticesIndicies;
	std::vector<int> interpertedindex;
	Catmull_Rom * catmullRomAlg;
	Bezier* bezierAlg;
	B_Spline* bSplineAlg;
	BasicAlgorithm* currentAlgrothim;
	int next;

	Lines(
		point4 initialCenter,
		glm::vec3 initialAngle,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader
	);
	
	void updateVertiex();
	void updateinterpertedVertiex();
	void addVertiex(point4 newPoint);
	void removeVertiex();
	void initShape();
	void initial();

	void drawShape();
	void initVerticesBuffer();
	void initIndiciesBuffer();
	void initVetriexData();
	void drawControlPoints();
	void drawControlLines();
	void drawCurvelLines();
	void update();
	void generateLineSegment();
	void reInitVertiexData();
	void switchNext();
	~Lines();
	
};

