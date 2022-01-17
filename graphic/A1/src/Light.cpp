/*
COMP 4490
Assignment 1
Li Borui

*/
#include "Light.h"

Light::Light(
    glm::vec4 lightPosition,
    glm::vec4 lightAmbient,
    glm::vec4 lightDiffuse,
    glm::vec4 lightSpecular,

    //glm::vec4 material_ambient,
    //glm::vec4 material_diffuse,
    //glm::vec4 material_specular,
    float  material_shininess
) {
    this->lightPosition = lightPosition;
    this->lightAmbient = lightAmbient;
    this->lightDiffuse = lightDiffuse;
    this->lightSpecular = lightSpecular;
    this->material_shininess = material_shininess;
}



Light::~Light() = default;