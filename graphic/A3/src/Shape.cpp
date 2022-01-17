/*
COMP 4490
Assignment 1
Li Borui

*/
#include "Shape.h"
#include "utli.h"

Shape::Shape(
) {
}
void Shape ::updateData(json& config) {
	this->config = config;
	std::vector<float> pos = this->config["position"];
	this->center = vector_to_vec3(pos);
}

Shape::Shape(
	json& config
) {
	this->config = config;
	std::vector<float> pos = this->config["position"];
	this->center = vector_to_vec3(pos);
}
Shape::~Shape() = default;



