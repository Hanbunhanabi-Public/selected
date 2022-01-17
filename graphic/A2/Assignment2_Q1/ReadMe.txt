/*
COMP 4490
Assignment 2 Q1
Li Borui

*/

brief:
	visual stuido solution: Assignment2_Q1.sln 

	The Assignment2_Q1.cpp is the file called by main.cpp

	this program implemented 3 different curve: use left mouse to add point and use right mouse to remove it
	press q will exit the program.

	the bezier curve would be draw every 4 point, i.e. 7 point will only draw 1 curve segment, 8 point will draw 2 curve segments
	the B-Spline and Catmull are draw when point number greater or equal to 2, but when it equal to 2.
	For B-Spine I add a extra start point and endpoint when drawing, so it only require to point and make B-spline looks better
	the interperted line are green, control points are red, the line link control point directly are white

	in case I forgot delete shaderprintf.h 	
	the file shaderprintf.h is a thrid party file for gsgl debug purpose, and has been approved by professor. 

	glsl verion is 450 
	
	all required questions works as expected.


environment:
	build on:
	 	windows 10 x64 1909
		visual studio 2019
		with GTX2080 Max-Q
