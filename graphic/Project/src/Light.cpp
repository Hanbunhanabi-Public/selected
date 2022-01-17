/*
COMP 4490
Assignment 3
Li Borui

*/
#include "Light.h"
#include "Object.h"
#include <iostream>
Light::Light()
{
}

point3 Light::ambient(const point3 & Ia, const point3 & Ka)
{
	return Ia*Ka;
}

point3 Light::diffuse(const point3 & N, const point3 & L, const point3 & Id, const point3 & Kd)
{	
	point3 LL = glm::normalize(L);
	float kdd = Max(glm::dot(N, LL), 0.0);

	return  Id*Kd * kdd;
}

point3 Light::specular (const point3 & Is, const point3 & Ks, const point3 & N, const point3 & L, const point3 & V, const float & shiness)
{
	if (glm::dot(L, N) < 0)
		return point3(0, 0, 0);

	point3 R = glm::normalize(2.0f * glm::dot(N, L)* N - L);
	float kff = Max(glm::dot(R, V), 0.0);
	point3 result = Is * Ks * glm::pow( kff, Max(shiness,0));
	
	return result;
}

point3 Light::ambientLighting(const MaterialLight & materialLight, const LightSource & lightSource)
{
	return ambient(lightSource.color, materialLight.ambient);
}

point3 Light::directionalLighting(const IntersectionResult & intersectionResult, const MaterialLight & materialLight, const LightSource & lightSource, const point3 & eye)
{
	point3 V = glm::normalize(intersectionResult.intersectionpoint - eye);
	point3 ambinetLight = ambient(lightSource.color, materialLight.ambient);
	point3 diffuseLight = diffuse(intersectionResult.intersectionNormal, -lightSource.direction, lightSource.color, materialLight.diffuse);
	point3 specularLight = specular(lightSource.color, materialLight.specular, intersectionResult.intersectionNormal, glm::normalize( -lightSource.direction), -V, materialLight.shininess);
	//return ambinetLight + diffuseLight+ specularLight;
	if (lightSource.lightType == AMBIENT)
		return ambinetLight;
	else return diffuseLight + specularLight;;
}

point3 Light::pointLighting(const IntersectionResult & intersectionResult, const point3 & eye, const MaterialLight & materialLight, const LightSource & lightSource)
{
	point3 L = glm::normalize( lightSource.position - intersectionResult.intersectionpoint);
	point3 V = glm::normalize(intersectionResult.intersectionpoint - eye);
	point3 ambinetLight = ambient(lightSource.color, materialLight.ambient);
	point3 diffuseLight = diffuse(intersectionResult.intersectionNormal, L, lightSource.color, materialLight.diffuse);
	point3 specularLight = specular(lightSource.color, materialLight.specular, intersectionResult.intersectionNormal, L, -V, materialLight.shininess);
	//return ambinetLight + diffuseLight+ specularLight;
	if (lightSource.lightType == AMBIENT)
		return ambinetLight;
	else return diffuseLight + specularLight;;
}

point3 Light::spotLighting(const IntersectionResult & intersectionResult, const point3 & eye, const MaterialLight & materialLight, const LightSource & lightSource)
{
	point3 L = glm::normalize(lightSource.position - intersectionResult.intersectionpoint);
	point3 V = glm::normalize(intersectionResult.intersectionpoint - eye);
	point3 ambinetLight = ambient(lightSource.color, materialLight.ambient);
	if (!inConTest(L, lightSource))
		if (lightSource.lightType == AMBIENT)
			return ambinetLight;
		else return point3(0, 0, 0);

	point3 diffuseLight = diffuse(intersectionResult.intersectionNormal, L, lightSource.color, materialLight.diffuse);
	point3 specularLight = specular(lightSource.color, materialLight.specular, intersectionResult.intersectionNormal, L, -V, materialLight.shininess);
	if (lightSource.lightType == AMBIENT)
		return ambinetLight;
	else return diffuseLight + specularLight;;
	//return ambinetLight + diffuseLight + specularLight;
}

point3 Light::processLighting(const IntersectionResult & intersectionResult, const point3 & eye, const LightSource & lightSource)
{

	if (lightSource.type  == "ambient") return ambientLighting(intersectionResult.materialLight, lightSource);
	if (lightSource.type == "directional") return directionalLighting(intersectionResult, intersectionResult.materialLight, lightSource, eye);
	if (lightSource.type == "point") return pointLighting(intersectionResult, eye, intersectionResult.materialLight,lightSource);
	if (lightSource.type == "spot") return spotLighting(intersectionResult, eye, intersectionResult.materialLight,lightSource);


}


Light::~Light() = default;
