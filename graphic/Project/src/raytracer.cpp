/*
COMP 4490
Assignment 3
Li Borui

*/
// The JSON library allows you to reference JSON arrays like C++ vectors and JSON objects like C++ maps.

#include "raytracer.h"
#include "RefractionStack.h"

//#include "Shape.h"


const char* PATH = "scenes/";


RayTracer::RayTracer()
{
}

void RayTracer::choose_scene(char const* fn)
{
	if (fn == nullptr)
	{
		std::cout << "Using default input file " << PATH << "c.json\n";
		fn = "c";
	}

	std::cout << "Loading scene " << fn << std::endl;

	std::string fname = PATH + std::string(fn) + ".json";
	std::fstream in(fname);
	if (!in.is_open())
	{
		std::cout << "Unable to open scene file " << fname << std::endl;
		exit(EXIT_FAILURE);
	}

	in >> scene;



	this->camera = new Camera(scene["camera"]);

	objectList = new ObjectList(scene);

	json& lights = scene["lights"];
	for (json::iterator it = lights.begin(); it != lights.end(); ++it)
	{
		json& light = *it;
		lightSources.push_back(generateNewLightSource(light));
	}

	core = new Core(objectList);
}

bool RayTracer::trace(const point3& e, const point3& s, colour3& colour, bool pick, bool pickTree)
{
	// NOTE 1: This is a demo, not ray tracing code! You will need to replace all of this with your own code...
	// NOTE 2: You can work with JSON objects directly (like this sample code), read the JSON objects into your own data structures once and render from those (probably in choose_scene), or hard-code the objects in your own data structures and choose them by name in choose_scene; e.g. choose_scene('e') would pick the same scene as the one in "e.json". Your choice.
	// If you want to use this JSON library, https://github.com/nlohmann/json for more information. The code below gives examples of everything you should need: getting named values, iterating over arrays, and converting types.


	core->isDebug = pick;
	core->list->isDebug = pick;
	core->list->root->isDebug = pick && pickTree;
	//do trace again to show the tracing
	IntersectionResult result = objectList->tracing(e, s);
	RefractionStack::isDebug = pick;
	if (result.isIntersect)
	{
		point3 temp = point3(0, 0, 0);


		for (int i = 0; i < lightSources.size(); i++)
		{
			if (pick)
			{
				colorPrint("Tracing: " + lightSources[i].type + "\n",
				           FOREGROUND_INTENSITY | BACKGROUND_INTENSITY | BACKGROUND_YELLOW | FOREGROUND_BLUE);
				std::cout << std::endl;
			}

			point3 defaultColor = camera->background_colour;
			temp += core->caclObjectLight(lightSources[i], result, e, defaultColor);

		}

		colour = temp;


		return true;
	}

	return false;
}

RayTracer::~RayTracer()
{
	free(camera);
	free(objectList);
	free(core);
}
