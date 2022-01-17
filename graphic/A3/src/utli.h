#pragma once
#include <glm/glm.hpp>
#include <iostream>
#include <fstream>
#include <string>
#include "json.hpp"
#include <glm/gtx/string_cast.hpp>
typedef glm::vec3 point3;
typedef glm::vec3 colour3;
using json = nlohmann::json;
//const char* PATH = "scenes/";
//json scene;

void choose_scene(char const* fn);
json find(json& j, const std::string key, const std::string value);
//void choose_scene(char const* fn);
glm::vec3 vector_to_vec3(const std::vector<float>& v);
glm::vec4 vector_to_vec4(const std::vector<float>& v);