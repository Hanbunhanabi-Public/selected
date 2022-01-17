/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#include "MouseHandler.h"
MouseHandler::MouseHandler( Lines* line){
	this -> line = line;
	this->currentState = READY;
	this->height = 640;
	this->width = 640;

}

void MouseHandler::processMouseCallBack(int button, int state, int x, int y) {
	
	int stateIndex = 0;

	if (state == GLUT_DOWN) {
		switch (button) {
		case GLUT_LEFT_BUTTON: stateIndex = 1; break;
		case GLUT_RIGHT_BUTTON: stateIndex = 3; break;
		}
	}
	else if (state == GLUT_UP) {
		switch (button) {
		case GLUT_LEFT_BUTTON: stateIndex = 2; break;
		case GLUT_RIGHT_BUTTON: stateIndex = 4; break;
		}
	}

	float convertx = (x - width * 1.0/2) / (width * 1.0 / 2);
	float converty = (height * 1.0/2 - y) / (height * 1.0 / 2);

	StateElement currentElement = stateTable[currentState][ stateIndex];
	currentState = currentElement.mouseState;

	if (currentElement.mouseActionName == ADD_POINT) {
		
		line->addVertiex(point4(convertx, converty, 0, 1));
		std::cout << "add point x:" << convertx << " y: " << converty << std::endl;
	}
	else if (currentElement.mouseActionName == REMOVE_POINT) {
		std::cout << "remove the last point" << std::endl;
		line->removeVertiex();
		
	}
}

MouseHandler::~MouseHandler() = default;