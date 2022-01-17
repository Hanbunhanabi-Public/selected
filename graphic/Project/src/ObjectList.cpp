/*
COMP 4490
Assignment 3
Li Borui

*/
#include "ObjectList.h"

ObjectList::ObjectList(json& senses)
{
	
	isDebug = false;
	json& objects = senses["objects"];
	for (json::iterator it = objects.begin(); it != objects.end(); ++it) {
		json& object = *it;
		if (object["type"] == "sphere") list.push_back(new Sphere(object));

		else if (object["type"] == "mesh") list.push_back(new Meshs(object));
		else if (object["type"] == "cylinder") list.push_back(new Cylinder(object));
		else if (object["type"] == "cone") list.push_back(new Cones(object));
		else if (object["type"] == "plane") walls.push_back(new Plane(object));
		else if (object["type"] == "toroid")
		{
			//for toroids we need to add the offset at beginning
			Toroids* temp = new Toroids(object);
			json& camera = senses["camera"];
			point3 zeroTest = vector_to_vec3(camera["origin"]) - temp->center;
			int zeros = 0;
			for (int i = 0; i < 3; i++) {
				if (zeroTest[i] == 0)
					zeros++;
				if (zeros > 1)
				{
					point3 newCenter = temp->center;
					newCenter[i] = (float)1e-1;
					temp->changeCenter(newCenter);
					break;

				}
			}
			list.push_back(temp);
		}

	}
	//json& worldSize = senses["worldSize"];	
	std::cout << "generating tree" << std::endl;
	Point3Tuple2 worldSize = findTreeMinMax(list);
	worldSize.a = worldSize.a - point3(0.5);
	worldSize.b = worldSize.b + point3(0.5);
	std::cout << "world Size: near: " << glm::to_string(worldSize.b) << " far: " << glm::to_string(worldSize.a);
	root = new BasicNode(worldSize.a, worldSize.b, nullptr, 0);
	std::cout << " center: " << glm::to_string(root->box->center) << std::endl;
	for (size_t i = 0; i < list.size(); i++)
	{
		Meshs* meshCheck = dynamic_cast<Meshs*>(list.at(i));
		Plane* check = dynamic_cast<Plane*>(list.at(i));
		if (check == NULL && meshCheck ==NULL)
		{
			root->add(list.at(i));
		}
		else if (meshCheck != NULL) {
			for (size_t i = 0; i < meshCheck->triangles.size(); i++)
			{
				root->add(meshCheck->triangles[i]);
			}
		}
		//root->printTree(0);
		//std::cout << "*****************************" << std::endl;
	}
	//root->printTree(0);
	root->finialize(0, false);
//	std::cout << "*****************************" << std::endl;
//	std::vector<IntersectionResult*> dummy;
//	root->printTree(0,true,  dummy);
	std::cout << "generating tree done" << std::endl;
}

ObjectList::ObjectList()
{
	isDebug = false;
}

IntersectionResult ObjectList::tracing(const point3& e, const point3& s)
{
	return directionalTracing(e, s - e);
}

IntersectionResult ObjectList::directionalTracing(const point3& e, const point3& d)
{
	std::vector<IntersectionResult*> onHold;
	std::vector<IntersectionResult*> cache;
	for (size_t i = 0; i < walls.size(); i++)
	{
		
		IntersectionResult testResult = walls.at(i)->directionIntersectionTest(e,d);
		IntersectionResult* result = new IntersectionResult(testResult);
		if (result->isIntersect) {
			result->materialLight = walls.at(i)->materialLight;
			result->ref = walls.at(i);
			result->refPoint = e;
			onHold.push_back(result);
		}
		cache.push_back(result);
		
	}

	IntersectionResult* second = root->search(e, d, cache, 0);
	if (second != nullptr && second->isIntersect)
		onHold.push_back(second);
	


	if (onHold.empty()) {
		for (size_t i = 0; i < cache.size(); i++)
		{
			if (cache[i] != NULL)
				free(cache[i]);
		}


		return IntersectionResult();
	}
	else {
		IntersectionResult* result = onHold[0];
		for (size_t i = 1; i < onHold.size(); i++)
		{
			if (onHold[i]->t > 0 && onHold[i]->t < result->t)
				result = onHold[i];

		}

		IntersectionResult finalResult = *result;
		
		for (size_t i = 0; i < cache.size(); i++)
		{
			if (cache[i] != NULL)
				free(cache[i]);
		}

		return finalResult;
	}


}


IntersectionResult ObjectList::partialTracing(const point3& e, const point3& d, Object* ref)
{
	std::vector<IntersectionResult*> onHold;
	std::vector<IntersectionResult*> cache;

	for (size_t i = 0; i < walls.size(); i++)
	{
		if (walls[i] != ref) {

			IntersectionResult testResult = walls.at(i)->directionIntersectionTest(e, d);
			IntersectionResult* result = new IntersectionResult(testResult);
			if (result->isIntersect) {
				result->ref = walls.at(i);
				result->materialLight = walls.at(i)->materialLight;
				result->refPoint = e;
				onHold.push_back(result);

			}
			cache.push_back(result);
		}
	}
	IntersectionResult *second = root->partialSearch(e, d, ref, cache,0 );
	if (second!= nullptr &&& second->isIntersect)
		onHold.push_back(second);

	if (onHold.empty()) {
		for (size_t i = 0; i < cache.size(); i++)
		{
			if (cache[i] != NULL)
				free(cache[i]);
		}

		return IntersectionResult();
	}
	else {
		IntersectionResult* result = onHold[0];
		for (size_t i = 1; i < onHold.size(); i++)
		{
			if (onHold[i]->t > 0 && onHold[i]->t < result->t)
				result = onHold[i];

		}
		IntersectionResult finalResult = *result;
		for (size_t i = 0; i < cache.size(); i++)
		{
			if (cache[i] != NULL)
				free(cache[i]);
		}

		return finalResult;
	}
	return IntersectionResult();
}


Point3Tuple2 ObjectList::findTreeMinMax(std::vector<Object*>list)
{
	if (list.size() == 0)
		return Point3Tuple2();
	if (list.size() == 1)
		return { list[0]->box->min, list[0]->box->max };

	Point3Tuple2 firstCompare = findMinMax({ list[0]->box->min, list[1]->box->min });
	Point3Tuple2 secondCompare = findMinMax({ list[0]->box->max,list[1]->box->max });
	Point3Tuple2 result = { firstCompare.a, secondCompare.b };

	for (size_t i = 2; i < list.size(); i++)
	{
		firstCompare = findMinMax({ result.a, list[i]->box->min });
		secondCompare = findMinMax({ result.b,list[i]->box->max });
		result = { firstCompare.a, secondCompare.b };

	}

	return result;
}

ObjectList::~ObjectList()
{
;
}
