#include "RefractionStack.h"
//#include "Windows.h"

RefractionStack::RefractionStack()
{

	push(1);
	push(1);

}

bool RefractionStack::isDebug = false;

void RefractionStack::push(float newIndex) {
	refractionStack.push_back(newIndex);
	if (isDebug) {

		std::stringstream fmt;
		fmt << "push " << newIndex << std::endl;
		colorPrint(fmt.str(), FOREGROUND_INTENSITY | FOREGROUND_GREEN);
	}

}

float RefractionStack::pop() {

	if (refractionStack.size() > 2)
	{
		if (isDebug) {

			std::stringstream fmt;
			fmt<< "pop" << peak() << std::endl;
			colorPrint(fmt.str(), FOREGROUND_INTENSITY | FOREGROUND_GREEN);
		}
		float result = peak();
		refractionStack.pop_back();
		return result;
	}
	else {
		if (isDebug) {

			colorPrint("error in stack", FOREGROUND_INTENSITY | FOREGROUND_RED);
		}
		return -1;
	}

}

float RefractionStack::peak()
{
	return refractionStack[ refractionStack.size()-1];
}

float RefractionStack::secondary()
{
	return  refractionStack[refractionStack.size() - 2];
}

RefractionStack::~RefractionStack() = default;

