/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#include "common.h"

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <iostream>
#include <chrono>
#include "frameControl.h"
#include "Lines.h"
#include "mouseHandler.h"
const char* WINDOW_TITLE = "Cube with Indices";
const double FRAME_RATE_MS = 1000.0 / 60.0;


// Array of rotation angles (in degrees) for each coordinate axis
enum { Xaxis = 0, Yaxis = 1, Zaxis = 2, NumAxes = 3 };
int      Axis = Yaxis;

FrameControl frameControl;
GLuint  Time;
int viewRotate = 0;
int viewRotateY = 0;



auto * lines = new Lines(
	point4(0, 0, 0, 0),
	glm::vec3(0, 0, 0),
	glm::vec3(1,1,1),
	&frameControl,
	"vshader9.glsl",
	"fshader9.glsl"
);

MouseHandler * mouseHandler = new MouseHandler(lines);



//----------------------------------------------------------------------------

// OpenGL initialization
void
init()
{
	lines->initial();
	lines->colors.push_back(point4(1, 1, 1, 1));
	lines->colors.push_back(point4(1, 0, 0, 1));
	lines->colors.push_back(point4(0, 1, 0, 1));
	std::cout << "lines initial finished" << std::endl;
	std::cout << "switch to: CATNUM_ROM" << std::endl;
	glProvokingVertex(GL_FIRST_VERTEX_CONVENTION);
	glEnable(GL_DEPTH_TEST);
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
	//glShadeModel(GL_FLAT);
	glPointSize(6);
	glClearColor(0.0, 0.0, 0.0, 1.0);
	
}

//----------------------------------------------------------------------------

void
display(void)
{
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	


	long long ms = std::chrono::duration_cast<std::chrono::milliseconds>(
		std::chrono::system_clock::now().time_since_epoch()).count();


	//  Generate the model-view matrix

	const glm::vec3 viewer_pos(0.0, 0.0, 3.0);

	  //global change
	frameControl.push(); //1
	frameControl.translate(-viewer_pos);
	frameControl.rotate(glm::vec3(viewRotateY, viewRotate, 0));
	//frameControl.rotate(shape->Theta);

	lines->draw();
	frameControl.pop();

	glutSwapBuffers();
	glFinish();
}

//----------------------------------------------------------------------------

void
keyboard(unsigned char key, int x, int y)
{
	switch (key) {

	case 033: // Escape Key
	case 'q': case 'Q':
		exit(EXIT_SUCCESS);
		break;
	case ' ': 
		lines->switchNext();
		break;
	//case '.':
	//	viewRotate = (viewRotate + 1);
	//	break;
	//case ',':
	//	viewRotate = (viewRotate - 1);
	//	break;
	//case '[':
	//	viewRotateY = (viewRotateY + 1);
	//	break;
	//case ']':
	//	viewRotateY = (viewRotateY - 1);
	//	break;
	}
	
	std::cout << key << std::endl;
}

//----------------------------------------------------------------------------

void
mouse(int button, int state, int x, int y)
{
	//if (state == GLUT_DOWN) {
	//	switch (button) {
	//	case GLUT_LEFT_BUTTON:    Axis = Xaxis;  break;
	//	case GLUT_MIDDLE_BUTTON:  Axis = Yaxis;  break;
	//	case GLUT_RIGHT_BUTTON:   Axis = Zaxis;  break;
	//	}
	//}
	mouseHandler->processMouseCallBack(button, state, x, y);
}

//----------------------------------------------------------------------------

void
update(void)
{



}

//----------------------------------------------------------------------------

void
reshape(int width, int height)
{
	glViewport(0, 0, width, height);
	mouseHandler->width = width;
	mouseHandler->height = height;

	//lines->reShape(width,height);
	lines->reShapeOtrho(width, height);
}
