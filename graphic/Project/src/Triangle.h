#pragma once
#include "Object.h"
class Triangle :
	public Object
{
public:
	point3 min;
	point3 max;
	point3 normal;
	std::vector<point3> triangle;
	Triangle(std::vector<std::vector<float>>& triangle, MaterialLight& materialLight);
	Triangle(std::vector<std::vector<float>>& triangle, MaterialLight& materialLight, int id);
	//virtual IntersectionResult intersectionTest(const point3& e, const point3& s);
	IntersectionResult directionIntersectionTest(const point3& e, const point3& d, Object* ref = nullptr) override;
	int triTestHelper(point3 first, point3 second, point3 third, point3 x, point3 N);
	void resetNormal(point3 center);
	~Triangle();
};


