/*
COMP 4490
Assignment 2 Q2
Li Borui

*/

// Display a cube, using glDrawElements

#include "common.h"
#include "Base.h"
#include "Cube.h"
#include "L_Shape.h"
#include "T_Shape.h"
#include "O_Shape.h"
#include <omp.h>

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <iostream>
#include <chrono>

float ROTATION_SPEED = 0.5;
const char* WINDOW_TITLE = "Cube with Indices";
const double FRAME_RATE_MS = 1000.0 / 60.0;
int viewState = 0;

// Array of rotation angles (in degrees) for each coordinate axis
enum { Xaxis = 0, Yaxis = 1, Zaxis = 2, NumAxes = 3 };
int      Axis = Yaxis;
GLfloat  Theta[NumAxes] = { 0.0, 0.0, 0.0 };
FrameControl frameControl;
GLuint  Time;
float viewRotate = 0;
float rotation_speed = ROTATION_SPEED;
int viewRotateY = 0;
Base* currentObject;

auto* cube = new Cube(
	point4(0, 0, 0, 0),
	glm::vec3(0, 0, 0),
	glm::vec3(0.8, 0.8, 0.8),
	&frameControl,
	"vshader9.glsl",
	"fshader9.glsl"
);

auto* l_shape = new L_Shape(
	point4(0, 0, 0, 0),
	glm::vec3(0, 0, 0),
	glm::vec3(0.8, 0.8, 0.8),
	&frameControl,
	"vshader9.glsl",
	"fshader9.glsl"
);

auto* t_shape = new T_Shape(
	point4(0, 0, 0, 0),
	glm::vec3(0, 0, 0),
	glm::vec3(0.8, 0.8, 0.8),
	&frameControl,
	"vshader9.glsl",
	"fshader9.glsl"
);

auto* o_shape = new O_Shape(
	point4(0, 0, 0, 0),
	glm::vec3(0, 0, 0),
	glm::vec3(0.8, 0.8, 0.8),
	&frameControl,
	"vshader9.glsl",
	"fshader9.glsl"
);



//----------------------------------------------------------------------------

// OpenGL initialization
void
init()
{
	//initial omp, pain old omp........
	std::cout << "+++++++++++++++++++++" << std::endl;
	std::cout << "+++initial OMP ++++++" << std::endl;
	std::cout << "thread configed: " << omp_get_max_threads() << std::endl;
	std::cout << "+++++++++++++++++++++" << std::endl;
	omp_set_num_threads(omp_get_max_threads());


	cube->initial();
	l_shape->initial();
	t_shape->initial();
	o_shape->initial();
	currentObject = cube;

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



	//long long ms = std::chrono::duration_cast<std::chrono::milliseconds>(
	//	std::chrono::system_clock::now().time_since_epoch()).count();
	//quad->ms = ms;
	//if (quad->prev_ms == 0)
	//	quad->prev_ms = ms;

	//  Generate the model-view matrix

	const glm::vec3 viewer_pos(0.0, 0.0, 4.0);

	//global change
	frameControl.push(); //1
	frameControl.translate(-viewer_pos);
	frameControl.rotate(glm::vec3(Theta[0],Theta[1],Theta[2]));

	frameControl.push(); //2
	currentObject->draw();
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
		rotation_speed = rotation_speed == ROTATION_SPEED ? 0 : ROTATION_SPEED;
		break;
	case 'w':
		currentObject->goToNext();
		break;
	case 's':
		currentObject->goToPrev();
		break;

	case '1':
		currentObject = cube;
		break;
	case '2':
		currentObject = l_shape;
		break;
	case '3':
		currentObject = t_shape;
		break;
	case '4':
		currentObject = o_shape;
		break;

		/*case '.':
			viewRotate = (viewRotate + 1);
			break;
		case ',':
			viewRotate = (viewRotate - 1);
			break;*/
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

	Theta[Axis] += rotation_speed;

	if (viewRotate > 360.0) {
		viewRotate -= 360.0;
	}
	if (viewRotate < 0)
		viewRotate += 360.0;



	currentObject->update();


}

//----------------------------------------------------------------------------

void
reshape(int width, int height)
{
	glViewport(0, 0, width, height);
	cube->reShape(width, height);
	l_shape->reShape(width, height);
	t_shape->reShape(width, height);
	o_shape->reShape(width, height);



}
