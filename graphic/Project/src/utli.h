/*
COMP 4490
Assignment 3
Li Borui

*/
#pragma once
#include <glm/glm.hpp>
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include "json.hpp"
#include <glm/gtx/string_cast.hpp>
#include "quartic.h"
#include "Windows.h"
#include <random>
#define M_PI 3.14159265358979323846264338327950288
#define OFFSET 1e-3
/*
 * for control terminal output color
 * https://docs.microsoft.com/en-us/windows/console/console-screen-buffers?redirectedfrom=MSDN#_win32_character_attributes
 */
#define FOREGROUND_BLUE      0x0001 // text color contains blue.
#define FOREGROUND_GREEN     0x0002 // text color contains green.
#define FOREGROUND_RED       0x0004 // text color contains red.
#define FOREGROUND_YELLOW    0x0006 // text color contains yellow.
#define FOREGROUND_INTENSITY 0x0008 // text color is intensified.
#define BACKGROUND_BLUE      0x0010 // background color contains blue.
#define BACKGROUND_GREEN     0x0020 // background color contains green.
#define BACKGROUND_RED       0x0040 // background color contains red.
#define BACKGROUND_YELLOW    0x0060 // background color contains yellow.
#define BACKGROUND_INTENSITY 0x0080 // background color is intensified.

typedef glm::vec3 point3;
typedef glm::vec3 colour3;
using json = nlohmann::json;

#define Max(a,b)            (((a) > (b)) ? (a) : (b))
class Object;
class RefractionStack;

typedef enum {AMBIENT, DIRECTIONAL, POINTLIGHT, SPOT} LightType;
typedef enum {NONE,PUSH,POP} PushStatus;
typedef struct {
	point3 ambient = point3(0,0,0);
	point3 diffuse = point3(0,0,0);
	point3 specular = point3(0,0,0);
	float shininess;
	point3 reflective = point3(-1, -1, -1);
	point3 transmissive = point3(-1, -1, -1);
	float refraction = -1.0f;

} MaterialLight;

typedef struct  IntersectionResult {
	Object* ref;
	Object* secondaryRef;
	bool isIntersect;
	point3 intersectionpoint;
	MaterialLight materialLight;
	point3 intersectionNormal;
	float t;
	point3 refPoint;
	point3 refractedDirection = point3(-1, -1, -1);
	bool isInternalRefraction = false;
	bool isInternalRay = false;
	float schlick = 0;
	PushStatus pushStatus;
	float popedValue;
	point3 schlickReflection;
	point3 schlickReflectionLight = point3(0,0,0);
} IntersectionResult;

typedef struct {
	std::string type;
	point3 color;
	point3 direction = point3(-1,-1,-1);
	point3 position = point3(-1,-1,-1);
	int cutoff = -1;
	LightType lightType;
} LightSource;

typedef struct {
	int remainRecursiveDepth = 0;
	int maxRecursiveDepth = 8;
	bool isOrigin = false;
	RefractionStack* refractionStack;

} RecursiveParameter;

typedef struct {
	float t = -1;
	bool isIntersect = false;
} AABBtestResult;

typedef struct {
	point3 a;
	point3 b;

} Point3Tuple2;

typedef struct {
	float a;
	float b;
} FloatTuple2;

typedef struct {
	float t;
	bool isIntersect = false;
	void* ref;
} TreeFargement;

//HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);


void choose_scene(char const* fn);
json find(json& j, const std::string key, const std::string value);
//void choose_scene(char const* fn);
glm::vec3 vector_to_vec3(const std::vector<float>& v);
glm::vec4 vector_to_vec4(const std::vector<float>& v);
MaterialLight generateNewMaterialLight(json& object);
LightSource generateNewLightSource(json& object);
void printTestResult(IntersectionResult result);
std::string generateIntersectionTestResult(int indent, IntersectionResult result);
bool compareIntersectionResultByDistance(IntersectionResult a, IntersectionResult b);
point3 caclRefraction(float tor1, float tor2, point3 v1, point3 n, bool& hasSolution);
point3 getNormalDirection(const point3& normalVector, const point3& ray);
bool inConTest(point3 L, LightSource lightSource);

Point3Tuple2 swap(Point3Tuple2 points);
FloatTuple2 swap(FloatTuple2 nums);
Point3Tuple2 findMinMax(Point3Tuple2 points);
FloatTuple2 solve2ndQuadEql(float A, float B, float C,float& rootCount);
std::vector<float> solve4thQuadEqul(float A, float B, float C, float D,float E);
float generateRandomNumber();
void colorPrint(std::string data, unsigned int colorFormat);
bool tooClose(IntersectionResult* result, point3 e, point3 d);
float getCloestT(std::vector<float>& result);
