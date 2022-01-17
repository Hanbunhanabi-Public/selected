/*
COMP 4490
Assignment 3
Li Borui

*/
#include <glm/glm.hpp>
#include "Camera.h"
#include "utli.h"
#include "Light.h"
#include "ObjectList.h"
#include "Core.h"
typedef glm::vec3 point3;
typedef glm::vec3 colour3;

class RayTracer {
public:

	json scene;
	Light light;
	std::vector<LightSource>lightSources;
	ObjectList* objectList;
	Core* core;
	Camera* camera;
	RayTracer();
	void choose_scene(char const* fn);
	bool trace(const point3& e, const point3& s, colour3& colour, bool pick, bool pickTree);
	~RayTracer();
};


//extern double fov;
//extern colour3 background_colour;


//void choose_scene(char const *fn);
//bool trace(const point3 &e, const point3 &s, colour3 &colour, bool pick);
