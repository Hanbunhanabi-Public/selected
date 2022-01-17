/*
COMP 4490
Ray Tracing Project
Li Borui

*/

brief:
	visual stuido solution: ray_tracer_project.sln 
	the ouput pictures are under ./output folder
	thrid party licence is under "thrid party licence"
	the report is called "report.pdf"
	To run the file please use command line argument, if argument not provided, it will default to the c.json

	Alert: The scenes folder is under src folder, 
		please either use sln to load the program into visual studio and add command line arguments to the debug configuration (recommand), the current argument in there is set to c, 
		or move the generated executable file (the default name is project_v2.exe) to src folder, then use command like: .\project_v2.exe a,
		or the program will not work.

	This program uses given skeleton 

	
	
	Implemented features:
		• octree
		• camera position and orientation 
		• Schilck approximation
		• nested refraction
		• generic surfaces of revolution (cylinders, cones, toroids)
		• antialiasing
		• depth of field
	All required features works as expected, for detail please look at the report.
	
Extra:
	add right mouse button for debug, unlike the left mouse button will give you the light trace, the right button will also give you the tree search path

environment:
	build on:
	 	windows 10 x64 1909
		visual studio 2019
		with GTX2080 Max-Q
