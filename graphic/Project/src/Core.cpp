#include "Core.h"
#include "RefractionStack.h"
#include "Windows.h"
Core::Core(ObjectList* list)
{
	this->isDebug = false;
	this->list = list;
}

point3 Core::caclObjectLight(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, point3& defaultColor = point3(0, 0, 0))
{

	RecursiveParameter recursiveParameter;
	recursiveParameter.remainRecursiveDepth = recursiveParameter.maxRecursiveDepth;
	recursiveParameter.refractionStack = new RefractionStack();
	recursiveParameter.isOrigin = true;
	point3 temp = caclObjectRecursiveLight(lightSource, result, eye, recursiveParameter, defaultColor);
	free(recursiveParameter.refractionStack);
	return temp;
}

point3 Core::caclObjectRecursiveLight(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, const RecursiveParameter& recursiveParameter, point3& defaultColor = point3(0, 0, 0))
{
	IntersectionResult processing = result;
	processing.pushStatus = NONE;
	point3 d = glm::normalize(result.intersectionpoint - eye);
	point3 basicLight;
	if (lightSource.type != "ambient") {
		defaultColor = point3(0, 0, 0);

		processing.materialLight.ambient = point3(0, 0, 0);
		basicLight = lightObjects(lightSource, processing, eye, defaultColor);
	}
	else
		basicLight = lightObjects(lightSource, result, eye, defaultColor);

	if (isDebug) {
		std::stringstream fmt;
		fmt << "basic light: " << lightSource.type << " " << basicLight.x << " " << basicLight.y << " " << basicLight.z << std::endl;
		printDebug(recursiveParameter.maxRecursiveDepth - recursiveParameter.remainRecursiveDepth, fmt.str(),
			generateIntersectionTestResult(recursiveParameter.maxRecursiveDepth - recursiveParameter.remainRecursiveDepth, result));
	}
	// first check if this object has refraction, if yes check and calculate refract angle, 
	//and check internal refraction, add all reflect amount together for one shot reflection)

	if (processing.materialLight.transmissive[0] != -1) {
		processing = refractionHelper(d, processing,recursiveParameter.refractionStack);
		processing.materialLight.reflective = glm::clamp(processing.materialLight.reflective, point3(0, 0, 0), point3(1, 1, 1));
		if (!processing.isInternalRefraction)
		{
			processing.materialLight.reflective = glm::clamp(processing.materialLight.reflective, point3(0, 0, 0), point3(1, 1, 1));
			processing.schlickReflection = processing.materialLight.transmissive * processing.schlick;
		}
		else {
			processing.materialLight.reflective = glm::clamp(processing.materialLight.reflective , point3(0, 0, 0), point3(1, 1, 1));
			processing.schlickReflection = processing.materialLight.transmissive;
			processing.materialLight.reflective = processing.materialLight.transmissive;
		}
	}


	if (isDebug) {
		std::stringstream fmt;
		fmt << "reflection section "<< std::endl;
		
		HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
		SetConsoleTextAttribute(handle, FOREGROUND_INTENSITY | FOREGROUND_YELLOW);
		printDebug(recursiveParameter.maxRecursiveDepth - recursiveParameter.remainRecursiveDepth, fmt.str(), "");
		SetConsoleTextAttribute(handle, 0x07);
	}

	if (processing.materialLight.reflective[0] != -1)
	{
		RecursiveParameter reflection = recursiveParameter;
		reflection.remainRecursiveDepth -= 1;
		reflection.isOrigin = false;
		point3 reflectionLight = reflectionRecursiveLightObjects(lightSource, processing, eye, reflection, defaultColor);
		basicLight += reflectionLight * processing.materialLight.reflective;
		processing.schlickReflectionLight = reflectionLight * processing.schlickReflection;
		if (isDebug) {
			std::stringstream fmt;
			fmt << "reflection: " << lightSource.type << " " << reflectionLight.x << " " << reflectionLight.y << " " << reflectionLight.z << std::endl;
			printDebug(recursiveParameter.maxRecursiveDepth - recursiveParameter.remainRecursiveDepth, fmt.str(), "");
		}
	}
	if (processing.pushStatus == PUSH) {
		recursiveParameter.refractionStack->push(processing.materialLight.refraction);
	}
	else if (processing.pushStatus == POP) {
		processing.popedValue = recursiveParameter.refractionStack->pop();
		if (processing.popedValue == -1)
			printing = true;
	
	}


	if (isDebug) {
		std::stringstream fmt;
		fmt << "refraction section " << std::endl;

		HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
		SetConsoleTextAttribute(handle, FOREGROUND_INTENSITY | FOREGROUND_YELLOW);
		printDebug(recursiveParameter.maxRecursiveDepth - recursiveParameter.remainRecursiveDepth, fmt.str(), "");
		SetConsoleTextAttribute(handle, 0x07);
	}

	// if it is interalRefraction, then there is no transmission
	if (processing.materialLight.transmissive[0] != -1 && !processing.isInternalRefraction) {
		RecursiveParameter transmission = recursiveParameter;
		transmission.remainRecursiveDepth -= 1;
		transmission.isOrigin = false;
		basicLight = transmissionRecursiveLightObjects(lightSource, processing, eye, transmission, basicLight, defaultColor);
		if (isDebug) {
			std::stringstream fmt;
			fmt << "transmissive: " << lightSource.type << " " << basicLight.x << " " << basicLight.y << " " << basicLight.z << std::endl;
			printDebug(recursiveParameter.maxRecursiveDepth - recursiveParameter.remainRecursiveDepth, fmt.str(), "");
		}
	}
	
	// finish the remining stack
	if (processing.pushStatus == POP) {
		recursiveParameter.refractionStack->push(processing.popedValue);
		if (processing.popedValue == -1)
			printing = true;
	}
	else if (processing.pushStatus == PUSH) {
		processing.popedValue = recursiveParameter.refractionStack->pop();


	}
	return basicLight;
}




point3 Core::lightObjects(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, point3& defaultColor = point3(0, 0, 0))
{
	point3 d;
	if (!result.isIntersect)
		return defaultColor;
	if (lightSource.type == "ambient")
		return light.processLighting(result, eye, lightSource);
	if (lightSource.type == "point")
		d = -result.intersectionpoint + lightSource.position;
	else if (lightSource.type == "directional")
		d = -lightSource.direction;
	else if (lightSource.type == "spot")
		d = -result.intersectionpoint + lightSource.position;

	//IntersectionResult shadowTest = list->partialTracing(result.intersectionpoint, d, result.ref);
	IntersectionResult shadowTest = list->directionalTracing(result.intersectionpoint+(float)(1e-2)*glm::normalize(d), d);
	if (lightSource.type == "directional" && shadowTest.isIntersect)

		return light.ambientLighting(result.materialLight, lightSource);
	if (lightSource.type == "point" && shadowTest.isIntersect && shadowTest.t < 1)
	{
		return light.ambientLighting(result.materialLight, lightSource);
	}
	if (lightSource.type == "spot" && shadowTest.isIntersect && shadowTest.t < 1 && inConTest(d, lightSource)) {
		return light.ambientLighting(result.materialLight, lightSource);
	}
	return light.processLighting(result, eye, lightSource);

}

IntersectionResult Core::reflectionHelper(const IntersectionResult& result, const point3& eye, point3 defaultColor)
{
	if (!result.isIntersect)
		return IntersectionResult();
	if (result.materialLight.reflective[0] == -1 && (result.isInternalRefraction && !result.isInternalRay))
		return IntersectionResult();
	IntersectionResult temp = result;
	if (temp.isInternalRefraction && !temp.isInternalRay)
		temp.materialLight.reflective = defaultColor;

	point3 v = glm::normalize(eye - temp.intersectionpoint);
	point3 R = 2.0f * glm::dot(getNormalDirection(temp.intersectionNormal, -v), v) * temp.intersectionNormal - v;
	//return list->partialTracing(result.intersectionpoint, glm::normalize(R), result.ref);
	Plane* check = dynamic_cast<Plane*>(temp.ref);
	if (check != NULL) {
		return list->partialTracing(temp.intersectionpoint, glm::normalize(R),temp.ref);
	}
	return list->directionalTracing(temp.intersectionpoint + float(OFFSET) * glm::normalize(R), glm::normalize(R));


}

point3 Core::reflectionRecursiveLightObjects(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, const RecursiveParameter& recursiveParameter, point3& defaultColor = point3(0, 0, 0))
{
	if (recursiveParameter.remainRecursiveDepth <= 0)
		return reflectionLightObjects(lightSource, result, eye, defaultColor);
	else {

		IntersectionResult reflection = reflectionHelper(result, eye, defaultColor);
		if (reflection.isIntersect)
		{
			return caclObjectRecursiveLight(lightSource, reflection, result.intersectionpoint, recursiveParameter, defaultColor);
		}
		return defaultColor;
	}
}

point3 Core::reflectionLightObjects(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, point3& defaultColor = point3(0, 0, 0))
{

	IntersectionResult reflection = reflectionHelper(result, eye, defaultColor);
	if (reflection.isIntersect)
	{
		return lightObjects(lightSource, reflection, result.intersectionpoint, defaultColor);
	}
	return  defaultColor;
}

IntersectionResult Core::transmissionHelper(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, const point3& currentColor, point3& errorResult, bool& stop, point3& defaultColor = point3(0, 0, 0))
{
	//point3 d = glm::normalize(result.intersectionpoint - eye);
	if (!result.isIntersect)
	{
		errorResult = defaultColor;
		stop = true;
		return IntersectionResult();
	}

	if (result.materialLight.transmissive[0] == -1)
	{
		errorResult = defaultColor;
		stop = true;
		return IntersectionResult();
	}


	// push the interesction point along the ray little to avoid shadow ance
	return list->directionalTracing(result.intersectionpoint + float(OFFSET) * glm::normalize(result.refractedDirection), result.refractedDirection);
	;
}

point3 Core::transmissionLightObjects(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, const point3& currentColor, point3& defaultColor = point3(0, 0, 0))
{

	bool stop = false;
	point3 errorOutput;
	IntersectionResult transmission = transmissionHelper(lightSource, result, eye, currentColor, errorOutput, stop, defaultColor);
	if (stop)
		return errorOutput;

	if (transmission.isIntersect)
		return (point3(1, 1, 1) - result.materialLight.transmissive) * currentColor
		+ result.materialLight.transmissive * lightObjects(lightSource, transmission, result.intersectionpoint, defaultColor)*(1 - result.schlick)+result.schlickReflectionLight;
	else return defaultColor + (point3(1, 1, 1) - result.materialLight.transmissive) * currentColor* (1 - result.schlick)+result.schlickReflectionLight;
	
	return currentColor;
}

point3 Core::transmissionRecursiveLightObjects(const LightSource& lightSource, const IntersectionResult& result, const point3& eye, const RecursiveParameter& recursiveParameter, const point3& currentColor, point3& defaultColor = point3(0, 0, 0))
{
	//point3 d = result.intersectionpoint - eye;
	if (recursiveParameter.remainRecursiveDepth <= 0)
		return transmissionLightObjects(lightSource, result, eye, currentColor, defaultColor);
	else {
		bool stop = false;
		point3 errorOutput;
		IntersectionResult transmission = transmissionHelper(lightSource, result, eye, currentColor, errorOutput, stop, defaultColor);
		if (stop)
			return errorOutput;

	
		if (transmission.isIntersect)
		{
			return (point3(1, 1, 1) - result.materialLight.transmissive) * currentColor
				+ result.materialLight.transmissive * caclObjectRecursiveLight(lightSource, transmission, result.intersectionpoint, recursiveParameter, defaultColor)
				*(1 - result.schlick)+ result.schlickReflectionLight;
		}
		else return defaultColor + (point3(1, 1, 1) - result.materialLight.transmissive) * currentColor * (1 - result.schlick)+result.schlickReflectionLight;
	}
	return currentColor;
}

IntersectionResult Core::refractionHelper(const point3& d, const IntersectionResult& result, RefractionStack * refractionStack)
{
	IntersectionResult refraction = result;
	refraction.refractedDirection = d;
	if (result.materialLight.refraction == -1)
		return refraction;

	//first refraction
	if (getNormalDirection(result.intersectionNormal,d) == result.intersectionNormal)
	{
		refraction.schlick = schlick(refraction, refractionStack->peak(), result.materialLight.refraction, d);
		refraction.refractedDirection = caclRefraction(refractionStack->peak(), result.materialLight.refraction,
			glm::normalize(d), getNormalDirection(result.intersectionNormal, d), refraction.isInternalRefraction);
		refraction.pushStatus = PUSH;
		
	}
	else {
		refraction.pushStatus = POP;
		refraction.schlick = schlick(refraction, result.materialLight.refraction, refractionStack->secondary(), d);
		refraction.refractedDirection = caclRefraction( result.materialLight.refraction, refractionStack->secondary(),
			glm::normalize(d), getNormalDirection(result.intersectionNormal, d), refraction.isInternalRefraction);
		if (refraction.isInternalRefraction)
			refraction.pushStatus = PUSH;
		
	}
	
	//check for internal refraction
	if (refraction.isInternalRefraction)
	{
		refraction.isInternalRay = true;
	}
	
	return refraction;
}

/*equation adapt and rewrite and improved from: https://yangwc.com/2019/05/08/RayTracer-Basis/
 *from function float schlick(float cosine, float ref_idx) const
 *change into my own situation : not only air to object, but also object to object, don't have cosine, need to calculate on my own
*/
float Core::schlick(const IntersectionResult& result, float n1, float n2, const point3 & d)
{
	float F0 = (n1 - n2) / (n1 + n2);
	F0 *= F0;
	float hv = glm::dot(glm::normalize(-d), getNormalDirection(result.intersectionNormal, d));
	return F0 + (1 - F0) * pow(1.f - hv, 5);
}



void Core::printDebug(int indent, std::string title, std::string message)
{
	if (isDebug)
	{
		std::cout << "|" << std::string(indent * 4, '-') << '>' << title << std::endl;
		std::cout << message << std::endl;
	}
}

Core::~Core()
{

}

