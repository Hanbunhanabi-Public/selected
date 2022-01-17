/*
COMP 4490
Assignment 1
Li Borui

*/

// Display a cube, using glDrawElements

#include "common.h"
#include "Ball.h"
#include "Grid.h"
#include "circle.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <iostream>
#include <chrono>

const char* WINDOW_TITLE = "Cube with Indices";
const double FRAME_RATE_MS = 1000.0 / 60.0;
int viewState = 0;

// Array of rotation angles (in degrees) for each coordinate axis
enum { Xaxis = 0, Yaxis = 1, Zaxis = 2, NumAxes = 3 };
int      Axis = Yaxis;

FrameControl frameControl;
GLuint  Time;
int viewRotate = 0;
int viewRotateY = 0;
auto* ball = new Ball(
	point4(0, 1, 0, 0), 
	glm::vec3(0, 0, 45), 
	glm::vec3(0.25,0.25,0.25),
	&frameControl,
	"vshader10.glsl",
	"fshader10.glsl"
);
auto* ground = new Grid(
	point4(0, -1, 0, 0), 
	glm::vec3(-90, 0, 0), 
	glm::vec3(1.0, 1.0, 1.0),

	&frameControl,
	"vshader10.glsl",
	"fshader10.glsl"
	
);
auto* wall = new Grid(
	point4(0, 0, -1, 0), 
	glm::vec3(0, 0, 0), 
	glm::vec3(1, 1, 1),
	&frameControl,
	"vshader10.glsl",
	"fshader10.glsl"

);




//----------------------------------------------------------------------------

// OpenGL initialization
void
init()
{
	ball->colors.push_back(glm::vec4(0.85, 0.337, 0.32, 1.0));
	ball->colors.push_back(glm::vec4(0.7, 0.7, 0.7, 1.0));

	ball->initial();

	wall->initial();
	wall->colors.push_back(glm::vec4(0.85, 0.337, 0.32, 1.0));
	wall->colors.push_back(glm::vec4(0.5, 0.5, 0.5, 1.0));

	ground->initial();
	ground->colors.push_back(glm::vec4(0.85, 0.337, 0.32, 1.0));
	ground->colors.push_back(glm::vec4(0.5, 0.5, 0.5, 1.0));
	glProvokingVertex(GL_FIRST_VERTEX_CONVENTION);
	glEnable(GL_DEPTH_TEST);
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
	glShadeModel(GL_FLAT);
	glClearColor(0.0, 0.0, 0.0, 1.0);
}

//----------------------------------------------------------------------------

void
display(void)
{
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	


	long long ms = std::chrono::duration_cast<std::chrono::milliseconds>(
		std::chrono::system_clock::now().time_since_epoch()).count();
	ball->ms = ms;
	if (ball->prev_ms == 0)
		ball->prev_ms = ms;

	//  Generate the model-view matrix

	const glm::vec3 viewer_pos(0.0, 0.0, 3.0);

	  //global change
	frameControl.push(); //1
	frameControl.translate(-viewer_pos);
	frameControl.rotate(glm::vec3(viewRotateY, viewRotate, 0));



	frameControl.push(); //2
	wall->draw(); 
	frameControl.pop();  //2

	frameControl.push(); //2
	ground->draw();
	frameControl.pop(); //2

	frameControl.push(); //2
	ball->draw();
	frameControl.pop(); //2

	frameControl.pop(); //1


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
		viewState = (viewState + 1) % 3;
		if (viewState == 0)
			viewRotate = 0;
		else if (viewState == 1)
			viewRotate = 45;
		if (viewState == 2)
			viewRotate = 90;
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
	if (state == GLUT_DOWN) {
		switch (button) {
		case GLUT_LEFT_BUTTON:    Axis = Xaxis;  break;
		case GLUT_MIDDLE_BUTTON:  Axis = Yaxis;  break;
		case GLUT_RIGHT_BUTTON:   Axis = Zaxis;  break;
		}
	}
}

//----------------------------------------------------------------------------

void
update(void)
{



	if (viewRotate > 360.0) {
		viewRotate -= 360.0;
	}
	if (viewRotate<0)
		viewRotate += 360.0;

	if (viewRotateY > 360.0) {
		viewRotateY -= 360.0;
	}
	if (viewRotateY < 0)
		viewRotateY += 360.0;
	ball->Axis = Axis;
	ball->update();


}

//----------------------------------------------------------------------------

void
reshape(int width, int height)
{
	glViewport(0, 0, width, height);
	ball->reShape(width,height);
	wall->reShape(width,height);
	ground->reShape(width,height);


}
