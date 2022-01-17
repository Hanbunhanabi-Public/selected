/*
COMP 4490
Assignment 3
Li Borui

*/
#pragma once
#include"Object.h"
#include"Triangle.h"
#include"BasicNode.h"
class Meshs :
	public Object
{
public:
	std::vector<std::vector<std::vector<float>>>vertexes;
	std::vector<Triangle*>triangles;
	BasicNode* root;
	Meshs();
	Meshs(json& object);
	void initial(json& object) override;
	//IntersectionResult TriIntersectionTest(std::vector<point3>& vertexes, const point3& e, const point3& s);
	IntersectionResult TriDirectionIntersectionTest(std::vector<point3>& vertexes, const point3& e, const point3& s);
	//IntersectionResult intersectionTest(const point3& e, const point3& s) override;
	IntersectionResult directionIntersectionTest(const point3& e, const point3& d, Object* ref = nullptr) override;
	int triTestHelper(point3 first, point3 second, point3 third, point3 x, point3 N);
	Point3Tuple2 findMeshMinMax();

	~Meshs();
	

};

