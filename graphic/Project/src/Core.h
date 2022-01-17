#pragma once
#include "Sphere.h"
#include "Plane.h"
#include "Meshs.h"
#include "Light.h"
#include "ObjectList.h"
class Core
{
public:
	Light light;
	bool isDebug;
	bool printing;
	ObjectList *list;
	Core(ObjectList *list);


	point3 caclObjectLight(const LightSource & lightSource, const IntersectionResult & result, const point3& eye, point3& defaultColor);
	point3 caclObjectRecursiveLight(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, const RecursiveParameter & recursiveParameter, point3& defaultColor);

	point3 lightObjects(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, point3 & defaultColor);
	
	IntersectionResult reflectionHelper(const IntersectionResult & result, const point3 & eye, point3 defaultColor);
	point3 reflectionRecursiveLightObjects(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, const RecursiveParameter & recursiveParameter, point3 & defaultColor);
	point3 reflectionLightObjects(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, point3 & defaultColor);
	
	IntersectionResult transmissionHelper(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, const point3 & currentColor, point3& errorResult, bool& stop, point3 & defaultColor);
	point3 transmissionLightObjects(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, const point3 & currentColor, point3 & defaultColor);
	point3 transmissionRecursiveLightObjects(const LightSource & lightSource, const IntersectionResult & result, const point3 & eye, const RecursiveParameter & recursiveParameter, const point3 & currentColor, point3 & defaultColor);

	IntersectionResult refractionHelper(const point3& d,const IntersectionResult& result, RefractionStack * refractionStack);
	
	float schlick(const IntersectionResult& result, float n1, float n2, const point3 & d );
	
	void printDebug(int indent, std::string title, std::string message);
	~Core();
};

