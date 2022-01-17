/*
COMP 4490
Assignment 2 Q2
Li Borui

*/

brief:
	visual stuido solution: Assignment2_Q2.sln 

	The Assignment2_Q2.cpp is the file called by main.cpp

	this program implemented 4 different objects: please use key shown on the question to switch between them
	press q will exit the program.

	this program implemented "one more feature": animate lerp between different depth

	this program caches all the depth of object it generated, please be careful about your memory, and CPU, going donwn to depth 3 is should be fine after that, it need some time to generate the new object
	
	this program is paralleled by OpenMp, please be aware you have proper setup 

	in case i forgot delete shaderprintf.h 	
	the file shaderprintf.h is a thrid party file for gsgl debug purpose, and has been approved by professor. 

	glsl verion is 450 
	
	all required questions and "one more feature" works as expected.


environment:
	build on:
	 	windows 10 x64 1909
		visual studio 2019
		with GTX2080 Max-Q
