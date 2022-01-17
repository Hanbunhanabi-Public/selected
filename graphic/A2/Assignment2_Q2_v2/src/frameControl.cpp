/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "frameControl.h"

FrameControl::FrameControl() {
	drawingStack.push_back(glm::mat4());
	peak = &drawingStack.at(drawingStack.size() - 1);
}

void FrameControl::push() {
	drawingStack.push_back(drawingStack[drawingStack.size() - 1]);
	peak = &drawingStack.at(drawingStack.size() - 1);
}

void FrameControl::pop() {
	assert(drawingStack.size() > 1);
	drawingStack.pop_back();
	peak = &drawingStack.at(drawingStack.size() - 1);

}

void FrameControl::rotate(glm::vec3 offest) {
	*peak = glm::rotate(*peak, glm::radians(offest[0]), glm::vec3(1, 0, 0));
	*peak = glm::rotate(*peak, glm::radians(offest[1]), glm::vec3(0, 1, 0));
	*peak = glm::rotate(*peak, glm::radians(offest[2]), glm::vec3(0, 0, 1));
}

void FrameControl::rescale(glm::vec3 offset){ 
	*peak = glm::scale(*peak, offset);
}



void FrameControl::translate(glm::vec3 offset) {
	*peak = glm::translate(*peak, offset);
}

FrameControl::~FrameControl() = default;

