#include "utli.h"

/****************************************************************************/

// here are some potentially useful utility functions

json find(json& j, const std::string key, const std::string value) {
	json::iterator it;
	for (it = j.begin(); it != j.end(); ++it) {
		if (it->find(key) != it->end()) {
			if ((*it)[key] == value) {
				return *it;
			}
		}
	}
	return json();
}

glm::vec3 vector_to_vec3(const std::vector<float>& v) {
	return glm::vec3(v[0], v[1], v[2]);
}

glm::vec4 vector_to_vec4(const std::vector<float>& v) {
	return glm::vec4(v[0], v[1], v[2],1);
}
/****************************************************************************/
//
//void choose_scene(char const* fn) {
//	if (fn == NULL) {
//		std::cout << "Using default input file " << PATH << "c.json\n";
//		fn = "c";
//	}
//
//	std::cout << "Loading scene " << fn << std::endl;
//
//	std::string fname = PATH + std::string(fn) + ".json";
//	std::fstream in(fname);
//	if (!in.is_open()) {
//		std::cout << "Unable to open scene file " << fname << std::endl;
//		exit(EXIT_FAILURE);
//	}
//
//	in >> scene;
//
//	json camera = scene["camera"];
//	// these are optional parameters (otherwise they default to the values initialized earlier)
//	if (camera.find("field") != camera.end()) {
//		fov = camera["field"];
//		std::cout << "Setting fov to " << fov << " degrees.\n";
//	}
//	if (camera.find("background") != camera.end()) {
//		background_colour = vector_to_vec3(camera["background"]);
//		std::cout << "Setting background colour to " << glm::to_string(background_colour) << std::endl;
//	}
//}