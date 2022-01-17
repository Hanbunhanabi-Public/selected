/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#pragma once
#include "Shape.h"
#include "Objects.h"
#include "Catmull_Clark.h"

#define LERP_DX 0.01
class Base :
	public Shape
{
private:

public:
	bool underLerp;

	float currentLerp;
	int currentDepth;
	int nextDepth;
	Catmull_Clark catmull_clark;

	std::vector<Objects> objectList;
	
	
	Base(
		point4 initialCenter,
		glm::vec3 initialTheta,
		glm::vec3 initialScale,
		FrameControl* frameControl,
		std::string veterxShader,
		std::string freShader);

	bool goToNext();
	bool goToPrev();
	std::vector<point4> lerp(Objects* low, Objects* end);
	int lerpControl();
	void drawShape();
	void virtual initShape();
	void upadteData(Objects& object);
	void upadteData(std::vector<point4>* targetVerties, std::vector<GLuint>* targetIndicies, int displayEnd, float opacity);
	void initialRest();

	void update();
	~Base();
};

