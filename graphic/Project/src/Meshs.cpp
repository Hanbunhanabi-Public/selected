/*
COMP 4490
Assignment 3
Li Borui

*/
#include "Meshs.h"

Meshs::Meshs()
{
}

Meshs::Meshs(json& object):Object(object)
{
	this->initial(object);
}

void Meshs::initial(json& object)
{
	
	Object::initial(object);
	std::vector<std::vector<std::vector<float>>> temp = object["triangles"];


	for (size_t i = 0; i < temp.size(); i++)
	{
		triangles.push_back(new Triangle(temp[i], materialLight,this->index));

	}

	Point3Tuple2 tempPoint = findMeshMinMax();
	box = new AABB(tempPoint.a, tempPoint.b);
	if (object.find("shape") != object.end() && object["shape"] == "cube") {
		for (Triangle* element : triangles)
		{
			element->resetNormal(box->center);
		}
	}

}

IntersectionResult Meshs::TriDirectionIntersectionTest(std::vector<point3>& vertexes, const point3& e, const point3& d)
{
	point3 a = vertexes[0];
	point3 b = vertexes[1];
	point3 c = vertexes[2];
	point3 normal = glm::normalize(glm::cross((a - b), (a - c)));
	IntersectionResult result = planeDirectionIntersectionTest(a, normal, e, d);
	if (!result.isIntersect)
		return result;
	int count = 0;
	count += triTestHelper(b, a, a, result.intersectionpoint, normal);
	count += triTestHelper(c, b, b, result.intersectionpoint, normal);
	count += triTestHelper(a, c, c, result.intersectionpoint, normal);

	if (3 != abs(count))
		result.isIntersect = false;

	return result;
}

IntersectionResult Meshs::directionIntersectionTest(const point3& e, const point3& d, Object* ref)
{

	std::vector<IntersectionResult> onHold;
	for (size_t i = 0; i < triangles.size(); i++)
	{
		IntersectionResult result = triangles[i]->directionIntersectionTest( e, d);
		if (result.isIntersect) {

			result.refPoint = e;
			onHold.push_back(result);
		}
	}
	if (onHold.size() == 0) {

		return IntersectionResult();
	}
	else {
		std::sort(onHold.begin(), onHold.end(), compareIntersectionResultByDistance);
		return onHold[0];
	}
}

int Meshs::triTestHelper(point3 first, point3 second, point3 third, point3 x, point3 N)
{
	float result = glm::dot(glm::cross((first - second), (x - third)), N);
	if (result > 0)
		return 1;
	if (result == 0)
		return 0;
	else return -1;
}

Point3Tuple2 Meshs::findMeshMinMax()
{
	if (triangles.size() == 0)
		return Point3Tuple2();
	if (triangles.size() == 1)
		return { triangles[0]->min, triangles[0]->max};

	Point3Tuple2 firstCompare = findMinMax({triangles[0]->min, triangles[1]->min});
	Point3Tuple2 secondCompare = findMinMax({ triangles[0]->max,triangles[1]->max });
	Point3Tuple2 result = {firstCompare.a, secondCompare.b};
	
	for (size_t i = 2; i < triangles.size(); i++)
	{
		firstCompare = findMinMax({ result.a, triangles[i]->min });
		secondCompare = findMinMax({ result.b,triangles[i]->max });
		result = { firstCompare.a, secondCompare.b };
		
	}

	return result;
}

Meshs::~Meshs() {
	free(box);
};

