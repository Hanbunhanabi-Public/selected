/*
COMP 4490
Assignment 3
Li Borui

*/
#include "utli.h"
#include "Object.h"
/****************************************************************************/

// here are some potentially useful utility functions

static std::random_device randomDevice;  
static std::mt19937_64 randomGenerator(randomDevice()); 

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
	return glm::vec4(v[0], v[1], v[2], 1);
}


MaterialLight generateNewMaterialLight(json& object)
{
	MaterialLight material;
	json light = object["material"];
	if (light.find("ambient") != light.end())
		material.ambient = vector_to_vec3(light["ambient"]);

	if (light.find("diffuse") != light.end())
		material.diffuse = vector_to_vec3(light["diffuse"]);

	if (light.find("specular") != light.end())
	{
		material.specular = vector_to_vec3(light["specular"]);
		material.shininess = float(light["shininess"]);
	}
	if (light.find("reflective") != light.end()) material.reflective = vector_to_vec3(light["reflective"]);
	if (light.find("transmissive") != light.end()) material.transmissive = vector_to_vec3(light["transmissive"]);
	if (light.find("refraction") != light.end()) material.refraction = light["refraction"];
	return material;
}

LightSource generateNewLightSource(json& object) {
	LightSource lightSource;
	std::string temp = object["type"];
	if (temp == "ambient")
		lightSource.lightType = AMBIENT;
	else if (temp == "directional")
		lightSource.lightType = DIRECTIONAL;
	else if (temp == "point")
		lightSource.lightType = POINTLIGHT;
	else if (temp == "spot")
		lightSource.lightType = SPOT;

	lightSource.type = temp;
	lightSource.color = vector_to_vec3( object["color"]);

	if(object.find("direction") != object.end()) lightSource.direction = vector_to_vec3( object["direction"]);
	
	if (object.find("position") != object.end()) lightSource.position = vector_to_vec3(object["position"]);
	if (object.find("cutoff") != object.end()) lightSource.cutoff = object["cutoff"];
	return lightSource;
}

void printTestResult(IntersectionResult result)
{
	std::cout << "intersect at" << result.intersectionpoint.x << ", " << result.intersectionpoint.y << ", " << result.intersectionpoint.z << std::endl;
	std::cout << "normal at" << result.intersectionNormal.x << ", " << result.intersectionNormal.y << ", " << result.intersectionNormal.z << std::endl;

}

std::string generateIntersectionTestResult(int indent,IntersectionResult result)
{

	std::stringstream fmt1;
	fmt1 << "|" << std::string(indent*4, '-') << '>';
	std::stringstream fmt;
	fmt << fmt1.str() << "Object ID:" << result.ref->index << std::endl;
	fmt << fmt1.str() << "t:" << result.t << "is intersect:"<<result.isIntersect<<std::endl;
	fmt << fmt1.str() << "intersect at" << result.intersectionpoint.x << ", " << result.intersectionpoint.y << ", " << result.intersectionpoint.z << std::endl;
	fmt << fmt1.str() << "normal at" << result.intersectionNormal.x << ", " << result.intersectionNormal.y << ", " << result.intersectionNormal.z << std::endl;
	fmt << fmt1.str() << "refract Info: isInternal:" << result.isInternalRefraction << " is Internal ray" << result.isInternalRay << std::endl;
	return fmt.str();
}

bool compareIntersectionResultByDistance(IntersectionResult a, IntersectionResult b)
{
	return glm::distance(a.intersectionpoint, a.refPoint) < glm::distance(b.intersectionpoint, b.refPoint );
}

point3 caclRefraction(float tor1, float tor2, point3 v1, point3 N, bool& isInternalRefraction)
{
	v1 = glm::normalize(v1);
	N = glm::normalize(N);
	float n = tor1 / tor2;
	float thera = glm::dot(v1, N);
	float second = 1 - (1 - thera * thera) * (n * n);
	if (second >= 0)
	{
		isInternalRefraction = false;
		return glm::normalize( n * (v1 - N * thera) - N* sqrt(second));
	}
	isInternalRefraction = true;
	return v1;

}

point3 getNormalDirection(const point3& normalVector, const point3& ray)
{
	return glm::dot(normalVector, ray) > 0 ? -normalVector : normalVector;
}

bool inConTest(point3 L, LightSource lightSource)
{
	return abs(glm::degrees(glm::acos(glm::dot(-L, lightSource.direction) / (glm::length(L) * glm::length(lightSource.direction))))) < lightSource.cutoff;
}

Point3Tuple2 swap(Point3Tuple2 points)
{
	point3 templ = points.b;
	points.b = points.a;
	points.a = templ;
	return points;
}

FloatTuple2 swap(FloatTuple2 nums)
{
	float templ = nums.b;
	nums.b = nums.a;
	nums.a = templ;
	return nums;
}

Point3Tuple2 findMinMax(Point3Tuple2 points)
{
	point3 newMin;
	point3 newMax;
	point3 minA = points.a;
	point3 maxA = points.b;
	newMin.x = (std::min)(minA.x, maxA.x);
	newMin.y = (std::min)(minA.y, maxA.y);
	newMin.z = (std::min)(minA.z, maxA.z);

	newMax.x = (std::max)(minA.x, maxA.x);
	newMax.y = (std::max)(minA.y, maxA.y);
	newMax.z = (std::max)(minA.z, maxA.z);
	return {newMin, newMax};
}

FloatTuple2 solve2ndQuadEql(float A, float B, float C, float& rootCount)
{
	if (A == 0) {
		rootCount = 0;
		return FloatTuple2();
	}
	
	float part2 = B * B - 4 * A * C;
	if (part2 < 0) {
		rootCount = 0;
		return FloatTuple2();
	}
	rootCount = part2 == 0 ? 1 : 2;
	float root1 = (-B - glm::sqrt(part2)) / (2 * A);
	float root2 = (-B + glm::sqrt(part2)) / (2 * A);
	return FloatTuple2({root1, root2 });
}

//adpter for quadtic solver
std::vector<float> solve4thQuadEqul(float A, float B, float C, float D, float E)
{	//remove the complex result.
	std::vector<float> result;
	if (A == 0)
		return result;
	DComplex* temp = solve_quartic(B / A, C / A, D / A, E / A);
	for (int i = 0; i < 4; i++) {
		if (temp[i].imag() != 0.0 ||isnan( temp->real()))
			continue;
		else {
			result.push_back( temp[i].real() );
		}
	}

	free(temp);
	return result;
}

float generateRandomNumber()
{
	std::uniform_real_distribution<float> randNum(0, 1);
	return randNum(randomGenerator);
}

void colorPrint(std::string data, unsigned int colorFormat)
{
	HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(handle, colorFormat);
	std::cout << data;

	SetConsoleTextAttribute(handle, 0x07);
}

float getCloestT(std::vector<float>& result)
{
	for (int i = 0; i < result.size(); i++)
	{
		if (result[i] > 0)
		{
			return result[i];
		
		}
	}
	return -1;
}


