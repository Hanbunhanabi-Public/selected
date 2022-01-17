#include "Camera.h"
#include <cmath>


Camera::Camera(json& cameraConfig)
{
	up = point3(0, 1, 0);
	if (cameraConfig.find("origin") != cameraConfig.end()) {
		cameraPos = vector_to_vec3(cameraConfig["origin"]);
		std::cout << "Setting camera origin to " << glm::to_string(cameraPos) << std::endl;
	}
	else
	{
		cameraPos = point3();
		std::cout << "Setting camera origin to default " << glm::to_string(cameraPos) << std::endl;
	}

	if (cameraConfig.find("target") != cameraConfig.end()) {
		cameraTarget = vector_to_vec3(cameraConfig["target"]);
		std::cout << "Setting camera target to " << glm::to_string(cameraPos) << std::endl;
	}
	else
	{
		cameraTarget = point3();
		std::cout << "Setting camera origin to default " << glm::to_string(cameraPos) << std::endl;
	}

	if (cameraConfig.find("field") != cameraConfig.end()) {
		fov = cameraConfig["field"];
		std::cout << "Setting fov to " << fov << " degrees.\n";
	}
	if (cameraConfig.find("background") != cameraConfig.end()) {
		background_colour = vector_to_vec3(cameraConfig["background"]);
		std::cout << "Setting background colour to " << glm::to_string(background_colour) << std::endl;
	}

	if (cameraConfig.find("antialiasing") != cameraConfig.end()) {
		antialisingLevel = cameraConfig["antialiasing"];
		if (antialisingLevel < 1)
			antialisingLevel = 1;
		std::cout << "Setting antialiasing level to " << antialisingLevel << std::endl;
	}
	else {
		antialisingLevel = 1;
		std::cout << "Setting antialiasing level default to 1" << std::endl;
	}

	if (cameraConfig.find("depth") != cameraConfig.end()) {
		depth = cameraConfig["depth"];
		std::cout << "Setting depth to " << depth << std::endl;
	}
	else {
		depth = 1;
		std::cout << "Setting depth default to 1" << std::endl;
	}

	if (cameraConfig.find("aperture") != cameraConfig.end()) {
		aperture = (float)cameraConfig["aperture"] * 1.f / 2;
		std::cout << "Setting aperture to " << aperture << std::endl;
	}
	else {
		aperture = 0;
		std::cout << "Setting aperture default to 0" << std::endl;
	}
	if (cameraConfig.find("depthBlur") != cameraConfig.end()) {
		depthBlur = cameraConfig["depthBlur"];
		if (depthBlur < 1)
			depthBlur = 1;
		std::cout << "Setting depthBlur to " << depthBlur << std::endl;
	}
	else {
		depthBlur = 1;
		std::cout << "Setting depthBlur default to 1" << std::endl;
	}

}

/*rewrite the code from https://www.cnblogs.com/lv-anchoret/p/10223222.html
 * function: const rtvec random_unit_disk()
 */
point3 Camera::getRandomUnitDisk()
{
	point3 result = 2.f * point3(generateRandomNumber(), generateRandomNumber(), 0) - point3(1, 1, 0);
	while (glm::dot(result, result) >= 1.0) {
		result = 2.f * point3(generateRandomNumber(), generateRandomNumber(), 0) - point3(1, 1, 0);
	}

	return result;
}

/*for calculate the depth of field offset:
 *from https://www.cnblogs.com/lv-anchoret/p/10223222.html
 *class camera, function: inline const ray get_ray(const rtvar u,const rtvar v)const
 *first two lines of function.
 *to find this class first search "camera.h", click the "+" button, then search the function
 *adapt the equation for calculate the offset for service different get ray function and on/off of the depth of field.
 */
point3 Camera::caclOffset()
{
	if (aperture == 0)
		return point3();
	point3 randpoint = aperture * getRandomUnitDisk();
	return randpoint * orientationX + randpoint * orientationY;

}

/*for calculate the direction vector, and e:
 *from https://www.cnblogs.com/lv-anchoret/p/10223222.html
 *class camera, function: inline const ray get_ray(const rtvar u,const rtvar v)const
 *the return statement of function
 *to find this class first search "camera.h", click the "+" button, then search the function
 *adapt and rewrite the equation with my own class, and my own situation (need s, not d)
 *also they do the vpHeight division outside the function, not here
 */
Point3Tuple2 Camera::getRay(int x, int y, point3 offset)
{
	return { this->cameraPos + offset ,
		this->leftBottom + this->fullWidth * (x + 0.5f) / (float)this->vpWidth +
		this->fullHeight * (y + 0.5f) / (float)this->vpHeight };
}

/*similar to upper one, but generate random ray for antiliasing 
 * 
 */
Point3Tuple2 Camera::getRandomRay(int x, int y, point3 offset)
{

	return { this->cameraPos + offset,
	this->leftBottom + this->fullWidth * (x + generateRandomNumber()) / (float)this->vpWidth +
	this->fullHeight * (y + generateRandomNumber()) / (float)this->vpHeight };
}

/*
 * the camera orientation equations (line 146 - 156)
 * from https://yangwc.com/2019/05/08/RayTracer-Basis/
 * function: void Camera::update() (line 10 - 20) (first one,at the top of the page), rewrite formula with my own variables and adapt with my class
 * the depth formula is adapted from void Camera::update() (line 18, 31)(second one on search, at the button of the page), adapted to my code
 */
void Camera::update(int width, int height)
{
	this->vpWidth = width;
	this->vpHeight = height;
	this->aspect = (float)vpWidth / vpHeight;
	this->height = (float)tan((M_PI * fov) / 180.0 / 2.0) * depth;
	this->width = this->height * this->aspect;
	this->orientationZ = glm::normalize(cameraPos - cameraTarget);
	this->orientationX = glm::normalize(glm::cross(up, orientationZ));
	this->orientationY = glm::normalize(glm::cross(orientationZ, orientationX));
	point3 halfWidth = this->width * orientationX;
	point3 halfHeight = this->height * orientationY;
	this->fullWidth = 2.f * halfWidth;
	this->fullHeight = 2.f * halfHeight;
	point3 left =  - ((float)this->width * orientationX);
	point3 button =  - ((float)this->height * orientationY);
	point3 tempDepth =  - ((float)depth * orientationZ);
	this->leftBottom = cameraPos +left + button+ tempDepth;
}

Camera::~Camera() = default;

