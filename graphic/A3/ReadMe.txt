/*
COMP 4490
Assignment 1
Li Borui

*/

brief:
	visual stuido solution: Assignment1.sln 

	The Assignment1.cpp is the file called by main.cpp

	this program implemented 3 different views: the 0 - front (default as required), 45 - left front and 90 - left (two more views), press space key to switch between them
	press q will exit the program.
	
	The VAO, IBO, VBO initialize is under Shape.cpp and each shape subclasses (Ball, Circle, Grid)

	this program implemented "one more feature": illumination and shadow, with one light at front, another at the top. 
	to make th illumination effect little bit more visible, I have to make the ball color darker, so the white block are looks like gray but actually white, you could observe the light and shadow from left side more clearly.

	glsl verion is 450 

	the wall and floor are being filled with red and white cubic with illumination and shadow
	
	all required questions and "one more feature" works as expected.


environment:
	build on:
	 	windows 10 x64 1909
		visual studio 2019
		with GTX2080 Max-Q
