// Assignment 2 Question 1

#include "common.h"
#include "raytracer.h"
#include "omp.h"
#include <iostream>
#define M_PI 3.14159265358979323846264338327950288
#include <cmath>

#include <glm/glm.hpp>

const char* WINDOW_TITLE = "Ray Tracing";
const double FRAME_RATE_MS = 1;

colour3 texture[1 << 16]; // big enough for a row of pixels
point3 vertices[2]; // xy+u for start and end of line
GLuint Window;
int vp_width, vp_height;
float drawing_y = 0;
RayTracer rayTracer;
//point3 eye;
//float d = 1;



// OpenGL initialization
void init(char* fn) {

	//initial omp, pain old omp........
	std::cout << "+++++++++++++++++++++" << std::endl;
	std::cout << "+++initial OMP ++++++" << std::endl;
	std::cout << "thread configed: " << omp_get_max_threads() << std::endl;
	std::cout << "+++++++++++++++++++++" << std::endl;
	omp_set_num_threads(omp_get_max_threads());

	rayTracer.choose_scene(fn);

	// Create a vertex array object
	GLuint vao;
	glGenVertexArrays(1, &vao);
	glBindVertexArray(vao);

	// Create and initialize a buffer object
	GLuint buffer;
	glGenBuffers(1, &buffer);
	glBindBuffer(GL_ARRAY_BUFFER, buffer);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), NULL, GL_STATIC_DRAW);

	// Load shaders and use the resulting shader program
	GLuint program = InitShader("v.glsl", "f.glsl");
	glUseProgram(program);

	// set up vertex arrays
	GLuint vPos = glGetAttribLocation(program, "vPos");
	glEnableVertexAttribArray(vPos);
	glVertexAttribPointer(vPos, 3, GL_FLOAT, GL_FALSE, 0, 0);

	Window = glGetUniformLocation(program, "Window");

	// glClearColor( background_colour[0], background_colour[1], background_colour[2], 1 );
	glClearColor(0.7, 0.7, 0.8, 1);

	// set up a 1D texture for each scanline of output
	GLuint textureID;
	glGenTextures(1, &textureID);
	glBindTexture(GL_TEXTURE_1D, textureID);
	glTexParameteri(GL_TEXTURE_1D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
	glTexParameteri(GL_TEXTURE_1D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
}
/*
 * antialiasing and depth of field.
 */
//----------------------------------------------------------------------------
point3 antialiasing(int x, int y) { 
	point3 finalFinalColor;
	for (int j = 0; j < rayTracer.camera->depthBlur; j++)
	{
		std::vector<Point3Tuple2> rays;
		point3 offset = rayTracer.camera->caclOffset();
		rays.push_back(rayTracer.camera->getRay(x, y, offset));
		for (int i = 1; i < rayTracer.camera->antialisingLevel; i++) {
			rays.push_back(rayTracer.camera->getRandomRay(x, y, offset));
		}


		point3 finalcolor;
		for (int i = 0; i < rays.size(); i++) {
			point3 rayColor = texture[x];
			if (!rayTracer.trace(rays[i].a, rays[i].b, rayColor, false, false)) {
				//texture[x] = background_colour;
				rayColor = rayTracer.camera->background_colour;
			}
			finalcolor += rayColor;
		}
		finalFinalColor += finalcolor / (rayTracer.camera->antialisingLevel * 1.0f);
	}
	finalFinalColor /= (rayTracer.camera->depthBlur * 1.0f);
	return finalFinalColor;
}

//----------------------------------------------------------------------------

void display(void) {
	// draw one scanline at a time, to each buffer; only clear when we draw the first scanline
	// (when fract(drawing_y) == 0.0, draw one buffer, when it is 0.5 draw the other)
	if (drawing_y <= 0.5) {
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

		glFlush();
		glFinish();
		glutSwapBuffers();

		drawing_y += 0.5;

	}
	else if (drawing_y >= 1.0 && drawing_y <= vp_height + 0.5) {
		int y = int(drawing_y) - 1;

		// only recalculate if this is a new scanline
		if (drawing_y == int(drawing_y)) {
#pragma omp parallel for
			for (int x = 0; x < vp_width; x++) {
				//Point3Tuple2 ray = rayTracer.camera->getRay(x, y);
				//if (!rayTracer.trace(ray.a, ray.b, texture[x], false)) {
				//	//texture[x] = background_colour;
				//	texture[x] = rayTracer.camera->background_colour;
				//}
				texture[x] = antialiasing(x, y);
			}

			// to ensure a power-of-two texture, get the next highest power of two
			// https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
			unsigned int v; // compute the next highest power of 2 of 32-bit v
			v = vp_width;
			v--;
			v |= v >> 1;
			v |= v >> 2;
			v |= v >> 4;
			v |= v >> 8;
			v |= v >> 16;
			v++;

			glTexImage1D(GL_TEXTURE_1D, 0, GL_RGB, v, 0, GL_RGB, GL_FLOAT, texture);
			vertices[0] = point3(0, y, 0);
			vertices[1] = point3(v, y, 1);
			glBufferSubData(GL_ARRAY_BUFFER, 0, 2 * sizeof(point3), vertices);
		}

		glDrawArrays(GL_LINES, 0, 2);

		glFlush();
		glFinish();
		glutSwapBuffers();

		drawing_y += 0.5;
	}
}

//----------------------------------------------------------------------------

void keyboard(unsigned char key, int x, int y) {
	switch (key) {
	case 033: // Escape Key
	case 'q': case 'Q':
		exit(EXIT_SUCCESS);
		break;
	case ' ':
		drawing_y = 1;
		break;
	}
}

//----------------------------------------------------------------------------

void mouse(int button, int state, int x, int y) {
	y = vp_height - y - 1;
	colour3 c;
	Point3Tuple2 ray;
	if (state == GLUT_DOWN) {
		switch (button) {
		case GLUT_LEFT_BUTTON:
			//colour3 c;
			//point3 uvw = s(x, y);
			ray = rayTracer.camera->getRay(x, y, rayTracer.camera->caclOffset());
			//point3 uvw = 
			std::cout << std::endl;
			//if (trace(eye, uvw, c, true)) {
			if (rayTracer.trace(ray.a, ray.b, c, true, false)) {
				std::cout << "HIT @ ( " << ray.b.x << "," << ray.b.y << "," << ray.b.z << " )\n";
				std::cout << "      colour = ( " << c.r << "," << c.g << "," << c.b << " )\n";
			}
			else {
				std::cout << "MISS @ ( " << ray.b.x << "," << ray.b.y << "," << ray.b.z << " )\n";
			}

			colorPrint("				END OF TRACK				\n", FOREGROUND_INTENSITY | BACKGROUND_INTENSITY | BACKGROUND_YELLOW | FOREGROUND_BLUE);

			//	std::cout << "HIT @ ( " << uvw.x << "," << uvw.y << "," << uvw.z << " )\n";
			//	std::cout << "      colour = ( " << c.r << "," << c.g << "," << c.b << " )\n";
			//} else {
			//	std::cout << "MISS @ ( " << uvw.x << "," << uvw.y << "," << uvw.z << " )\n";
			//}
			break;
		case GLUT_RIGHT_BUTTON:
			//colour3 c;
			ray = rayTracer.camera->getRay(x, y, rayTracer.camera->caclOffset());
			if (rayTracer.trace(ray.a, ray.b, c, true, true)) {
				std::cout << "HIT @ ( " << ray.b.x << "," << ray.b.y << "," << ray.b.z << " )\n";
				std::cout << "      colour = ( " << c.r << "," << c.g << "," << c.b << " )\n";
			}
			else {
				std::cout << "MISS @ ( " << ray.b.x << "," << ray.b.y << "," << ray.b.z << " )\n";
			}
			colorPrint("				END OF TRACK				\n", FOREGROUND_INTENSITY | BACKGROUND_INTENSITY | BACKGROUND_YELLOW | FOREGROUND_BLUE);
			break;
		}
	}
}

//----------------------------------------------------------------------------

void update(void) {
}

//----------------------------------------------------------------------------

void reshape(int width, int height) {
	glViewport(0, 0, width, height);
	rayTracer.camera->update(width, height);
	// GLfloat aspect = GLfloat(width)/height;
	// glm::mat4  projection = glm::ortho( -aspect, aspect, -1.0f, 1.0f, -1.0f, 1.0f );
	// glUniformMatrix4fv( Projection, 1, GL_FALSE, glm::value_ptr(projection) );
	vp_width = width;
	vp_height = height;
	glUniform2f(Window, width, height);
	drawing_y = 0;
}
