/*
COMP 4490
Assignment 2 Q1
Li Borui

*/
#include "Lines.h"

Lines::Lines(
	point4 initialCenter,
	glm::vec3 initialAngle,
	glm::vec3 initialScale,
	FrameControl* frameControl,
	std::string veterxShader,
	std::string freShader
) : Shape(initialCenter, initialAngle, initialScale, frameControl, veterxShader, freShader) {
	this -> drawOffest = 0;
	this ->arrayBuffer = 0;
	this->indicieBuffer = 0;
	this->interval = 100;
	this->t = 0;
	this->done = true;
	initShape();
	catmullRomAlg = new Catmull_Rom(&vertices1D, &interpertedVertices, &interpertedVerticesIndicies, &interpertedindex, interval);
	bezierAlg = new Bezier(&vertices1D, &interpertedVertices, &interpertedVerticesIndicies, &interpertedindex, interval);
	bSplineAlg = new B_Spline(&vertices1D, &interpertedVertices, &interpertedVerticesIndicies, &interpertedindex, interval);
	//currentAlgrothim = bezierAlg;
	currentAlgrothim = catmullRomAlg;
	//currentAlgrothim = bSplineAlg;
	this->next = CATNUMM_ROM;
	
}


void Lines::initVerticesBuffer() {

	// Create and initialize a buffer object
	glGenBuffers(1, &interperatedArrayBuffer);
	glBindBuffer(GL_ARRAY_BUFFER, interperatedArrayBuffer);
	glGenBuffers(1, &arrayBuffer);
	glBindBuffer(GL_ARRAY_BUFFER, arrayBuffer);
	if (vertices1D.size() > 0) {
		glBufferData(GL_ARRAY_BUFFER, vertices1D.size() * sizeof(point4), (point4*)&vertices1D[0], GL_DYNAMIC_DRAW);

	}

}

void Lines::initIndiciesBuffer() {

	glGenBuffers(1, &indicieBuffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indicieBuffer);
	if (indicies.size() > 0) {
		glBufferData(GL_ELEMENT_ARRAY_BUFFER, indicies.size() * sizeof(GLint), (GLint*)&indicies[0], GL_DYNAMIC_DRAW);
		done = false;
	}
	glGenBuffers(1, &interperatedIndicieBuffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, interperatedIndicieBuffer);

}

void Lines::initVetriexData() {
	//program = InitShader("vshader6.glsl", "fshader6.glsl");
	program = InitShader(veterxShader.c_str(), freShader.c_str());
	glUseProgram(program);
	vPosition = glGetAttribLocation(program, vetrexPosition.c_str());
	glEnableVertexAttribArray(vPosition);
	glVertexAttribPointer(vPosition, 4, GL_FLOAT, GL_FALSE, 0, BUFFER_OFFSET(0));


}

void Lines::reInitVertiexData() {
	glUseProgram(program);
	vPosition = glGetAttribLocation(program, vetrexPosition.c_str());
	glEnableVertexAttribArray(vPosition);
	glVertexAttribPointer(vPosition, 4, GL_FLOAT, GL_FALSE, 0, BUFFER_OFFSET(0));
}


void Lines::initShape() {
	// for debug
	//vertices1D.push_back(point4(0.5, 0.5, 0, 1));
	//vertices1D.push_back(point4(0.0, 0.0, 0, 1));
	//indicies.push_back(0);
	//indicies.push_back(1);
}

void Lines::initial() {
	Shape::initial();
	generateLineSegment();
}
void Lines::updateVertiex() {
	if (vertices1D.size() > 0) {
		glBindVertexArray(this->vao);
		glBindBuffer(GL_ARRAY_BUFFER, arrayBuffer);
		// since we add points into the program, such that the maximum buffer cannot be deside

		glBufferData(GL_ARRAY_BUFFER, vertices1D.size() * sizeof(point4), (point4*)&vertices1D[0], GL_DYNAMIC_DRAW);

		glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indicieBuffer);
		// since we add points into the program, such that the maximum buffer cannot be deside
		glBufferData(GL_ELEMENT_ARRAY_BUFFER, indicies.size() * sizeof(GLint), (GLint*)&indicies[0], GL_DYNAMIC_DRAW);
	}
}

void Lines::updateinterpertedVertiex() {
	if (interpertedVertices.size() > 0) {
		glBindVertexArray(this->vao);
		glBindBuffer(GL_ARRAY_BUFFER, interperatedArrayBuffer);
		// since we add points into the program, such that the maximum buffer cannot be deside

		glBufferData(GL_ARRAY_BUFFER, interpertedVertices.size() * sizeof(point4), (point4*)&interpertedVertices[0], GL_DYNAMIC_DRAW);

		glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, interperatedIndicieBuffer);
		// since we add points into the program, such that the maximum buffer cannot be deside
		glBufferData(GL_ELEMENT_ARRAY_BUFFER, interpertedVerticesIndicies.size() * sizeof(GLint), (GLint*)&interpertedVerticesIndicies[0], GL_DYNAMIC_DRAW);
	}
}


void Lines::generateLineSegment() {
	done = false;
	if (vertices1D.size() > 1) {
		currentAlgrothim->processing();
	}
	updateinterpertedVertiex();
}

void Lines::addVertiex(point4 newPoint) {
	vertices1D.push_back(newPoint);
	indicies.push_back(vertices1D.size() - 1);
	updateVertiex();
	generateLineSegment();
}

void Lines::removeVertiex() {
	if (vertices1D.size() > 0){
		vertices1D.pop_back();
		indicies.pop_back();
		drawOffest = 0;
		t = 0;
		if (drawOffest < 0)
			drawOffest = 0;
		//regenerate line segments
		updateVertiex();
		generateLineSegment();
		std::cout << "remove index: "<<vertices1D.size() << std::endl;
	}
	else
	{
		
		std::cout << "nothing to delete" << std::endl;
	}
}

void Lines::drawControlLines() {

	glBindVertexArray(this->vao);
	glBindBuffer(GL_ARRAY_BUFFER, arrayBuffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indicieBuffer);
	reInitVertiexData();
	glUniform4fv(glGetUniformLocation(program, "inColor"), 1, glm::value_ptr(colors[0]));
	glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));
	//bindPrintBuffer(program, printBuffer);

	glDrawElements(GL_LINE_STRIP, indicies.size(), GL_UNSIGNED_INT, 0);

}

void Lines::drawControlPoints() {
	
	glBindVertexArray(this->vao);
	glBindBuffer(GL_ARRAY_BUFFER, arrayBuffer);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indicieBuffer);
	reInitVertiexData();
	glUniform4fv(glGetUniformLocation(program, "inColor"), 1, glm::value_ptr(colors[1]));
	glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));
	//bindPrintBuffer(program, printBuffer);
	glDrawArrays(GL_POINTS, 0, vertices1D.size());

}

void Lines::drawCurvelLines() {
	if (vertices1D.size() >= 2) {
		
		glBindVertexArray(this->vao);
		glBindBuffer(GL_ARRAY_BUFFER, interperatedArrayBuffer);
		glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, interperatedIndicieBuffer);
		reInitVertiexData();
		glUniform4fv(glGetUniformLocation(program, "inColor"), 1, glm::value_ptr(colors[2]));
		glUniformMatrix4fv(ModelView, 1, GL_FALSE, glm::value_ptr(*frameControl->peak));
		//bindPrintBuffer(program, printBuffer);
		
		glDrawElements(GL_LINE_STRIP, interpertedindex[drawOffest]+t, GL_UNSIGNED_INT, 0);
		
		if (!done) {
			if ( drawOffest!= interpertedindex.size()-1 && t < interpertedindex[drawOffest+1] - interpertedindex[drawOffest])
				t++;
			else {
				t = 0;
				if (drawOffest < interpertedindex.size() - 1)
					drawOffest++;
				
			}
			if (drawOffest == interpertedindex.size() - 1) {
				done = true;
				t = 0;
			}
		}
		


		//printf("\n\nGLSL print:\n%s\n", getPrintBufferString(printBuffer).c_str());
	
	}

}

void Lines::switchNext() {
	next = (++next) % 3;

	switch (next)
	{
	case CATNUMM_ROM: currentAlgrothim = catmullRomAlg;std::cout<< "switch to: " <<"CATNUM_ROM" <<std::endl ;break;
	case B_SPLINE: currentAlgrothim = bSplineAlg; std::cout << "switch to: " << "B_SPLINE" << std::endl; break;
	case BEZIER: currentAlgrothim = bezierAlg; std::cout << "switch to: " << "BEZIER" << std::endl; break;

	default:
		currentAlgrothim = catmullRomAlg; std::cout << "switch to: " << "CATNUM_ROM" << std::endl; break;
	}
	updateVertiex();
	generateLineSegment();
	drawOffest = 0;
	t = 0;

}


void Lines::drawShape() {


	frameControl->push();
	drawControlPoints();
	frameControl->pop();

	frameControl->push();
	drawControlLines();
	frameControl->pop();

	frameControl->push();
	frameControl->translate(glm::vec3(0,0,1));
	if (currentAlgrothim->drawable)
		drawCurvelLines();
	frameControl->pop();
}

void Lines::update() {};

Lines::~Lines() = default;