
/*
COMP 4490
Assignment 1
Li Borui

*/
#pragma once
#include "common.h"
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/matrix_inverse.hpp>
#include <glm/gtc/type_ptr.hpp>
class Light
{
private:

public:


    glm::vec4 lightPosition;
    glm::vec4 lightAmbient;
    glm::vec4 lightDiffuse;
    glm::vec4 lightSpecular;
    float  material_shininess;

    Light(
        glm::vec4 lightPosition,
        glm::vec4 lightAmbient,
        glm::vec4 lightDiffuse,
        glm::vec4 lightSpecular,

        //glm::vec4 material_ambient,
        //glm::vec4 material_diffuse,
        //glm::vec4 material_specular,
        float  material_shininess
    );


    ~Light();

};

