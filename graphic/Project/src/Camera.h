#pragma once
#include "utli.h"
class Camera
{
public:
	point3 cameraPos;
	point3 cameraTarget;
	point3 leftBottom;

	int vpWidth;
	int vpHeight;
	int antialisingLevel;
	int depthBlur;
	float width;
	float height;
	float fov;
	float aspect;
	float depth;
	float aperture;

	point3 orientationX;
	point3 orientationY;
	point3 orientationZ;
	point3 fullWidth;
	point3 fullHeight;
	point3 background_colour;
	point3 up;

	Camera(json& cameraConfig);
	point3 getRandomUnitDisk();
point3 caclOffset();
	Point3Tuple2 getRay(int x, int y, point3 offset);
	Point3Tuple2 getRandomRay(int x, int y,point3 offset);
	void update(int width, int height);
	~Camera();

};

