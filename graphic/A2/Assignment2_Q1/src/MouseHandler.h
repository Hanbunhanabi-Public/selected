/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#pragma once
#include "common.h"
#include <iostream>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
#include "Lines.h"

typedef enum {
	READY, LEFT_MOUSE_PRESSED, RIGHT_MOUSE_PRESSED
}MouseStates;
typedef enum {NO_ACTION, ADD_POINT, REMOVE_POINT } MouseActionName;
typedef struct {
	MouseStates mouseState;
	MouseActionName mouseActionName;
} StateElement;
typedef glm::vec4 point4;

class MouseHandler
{
private:
	Lines* line;
	MouseStates currentState;

	StateElement stateTable[3][5] = {
		//NO_CLICK							LEFT_MOUSE_DOWN						LEFT_MOUSE_UP						RIGHT_MOUSE_DOWN					RIGHT_MOUSE_UP
		{{READY, NO_ACTION},				{LEFT_MOUSE_PRESSED, ADD_POINT},	{READY, NO_ACTION},					{RIGHT_MOUSE_PRESSED, REMOVE_POINT},{READY, NO_ACTION}},				//READY
		{{LEFT_MOUSE_PRESSED, NO_ACTION},	{LEFT_MOUSE_PRESSED, NO_ACTION},	{READY, NO_ACTION},					{LEFT_MOUSE_PRESSED, NO_ACTION},	{LEFT_MOUSE_PRESSED, NO_ACTION}},	//LEFT_MOUSE_PRESSED
		{{RIGHT_MOUSE_PRESSED, NO_ACTION},	{RIGHT_MOUSE_PRESSED,NO_ACTION},	{RIGHT_MOUSE_PRESSED, NO_ACTION},	{RIGHT_MOUSE_PRESSED, NO_ACTION},	{READY, NO_ACTION}}					//RIGHT_MOUSE_PRESSED
	};

public:
	int width;
	int height;
	MouseHandler(Lines* line);
	//	set the call back handler
	void processMouseCallBack(int button, int state, int x, int y);
	void resetLeftMouse();
	void resetRightMouse();
	
	~MouseHandler();
};

