#pragma once
#include "utli.h"
class RefractionStack
{
public:
	static bool isDebug;
	std::vector<float>refractionStack;



	RefractionStack();
	void push(float newIndex);
	float pop();
	float peak();
	float secondary();
	~RefractionStack();
};

