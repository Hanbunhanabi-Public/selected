#include "BasicNode.h"

BasicNode::BasicNode(point3 point1, point3 point2, BasicNode* parent, int childID)
{
	initial(point1, point2, parent, childID);
}

BasicNode::BasicNode(Point3Tuple2 pointSet, BasicNode* parent, int childID)
{
	/*BasicNode(pointSet.a, pointSet.b, parent);*/
	initial(pointSet.a, pointSet.b, parent, childID);
}

bool BasicNode::isDebug = false;

void BasicNode::initial(point3 point1, point3 point2, BasicNode* parent, int childID)
{
	this->childID = childID;
	this->box = new AABB(point1, point2);
	this->point1 = point1;
	this->point2 = point2;
	float halfX = (point1.x + point2.x) / 2;
	float halfY = (point1.y + point2.y) / 2;
	float halfZ = (point1.z + point2.z) / 2;

	point3 p0 = point1;
	point3 p1 = point3(halfX, point1.y, point1.z);
	point3 p2 = point3(halfX, point1.y, halfZ);
	point3 p3 = point3(point1.x, point1.y, halfZ);
	point3 p4 = point3(point1.x, halfY, point1.z);
	point3 p5 = point3(halfX, halfY, point1.z);
	point3 p6 = point3(halfX, halfY, halfZ);
	point3 p7 = point3(point1.x, halfY, halfZ);
	point3 p8 = point3(point2.x, halfY, halfZ);
	point3 p9 = point3(point2.x, halfY, point2.z);
	point3 p10 = point3(halfX, halfY, point2.z);
	point3 p11 = point3(halfX, point2.y, halfZ);
	point3 p12 = point3(point2.x, point2.y, halfZ);
	point3 p13 = point2;
	point3 p14 = point3(halfX, point2.y, point2.z);

	childern.push_back({AABB(p0, p6), nullptr});
	childern.push_back({AABB(p1, p8), nullptr});
	childern.push_back({AABB(p4, p11), nullptr});
	childern.push_back({AABB(p5, p12), nullptr});
	childern.push_back({AABB(p3, p10), nullptr});
	childern.push_back({AABB(p2, p9), nullptr});
	childern.push_back({AABB(p7, p14), nullptr});
	childern.push_back({AABB(p6, p13), nullptr});
	this->parent = parent;
}

void BasicNode::add(Object* newShape)
{
	tempShapeList.push_back(newShape);
}


void BasicNode::burstAdd()
{
	for (size_t i = 0; i < tempShapeList.size(); i++)
	{
		for (int j = 0; j < childern.size(); j++)
		{
			if (childern[j].box.isHalfContain(tempShapeList[i]->box->getBox()))
			{
				if (childern[j].next == nullptr)
				{
					childern[j].next = new BasicNode(childern[j].box.getBox(), this, j);
				}
				childern[j].next->add(tempShapeList[i]);
			}
		}
	}
}


bool BasicNode::searchHelper(std::vector<IntersectionResult*>& onHold, std::vector<IntersectionResult*>& cache,
                             const point3& e, const point3& d, Object* target, int depth)
{
	int cacheResult = findCache(cache, target);
	if (cacheResult != -1)
	{
		if (cache[cacheResult]->isIntersect)
		{
			if (box->pointBoxTest(cache[cacheResult]->intersectionpoint))
			{
				onHold.push_back(cache[cacheResult]);
				if (isDebug)
					printSearchResult(cache[cacheResult], depth);
				return true;
			}
			return false;
		}
		return false;
	}


	IntersectionResult testResult = target->directionIntersectionTest(e, d);
	IntersectionResult* result = new IntersectionResult(testResult);
	if (result->isIntersect)
	{
		result->ref = target;
		result->refPoint = e;
		result->materialLight = target->materialLight;
		if (box->pointBoxTest(result->intersectionpoint))
		{
			cache.push_back(result);
			onHold.push_back(result);
			if (isDebug)
				printSearchResult(result, depth);

			return true;
		}
		cache.push_back(result);

		return false;
	}
	cache.push_back(result);


	return false;
}


void BasicNode::finialize(int depth, bool stop)
{
	point3 boxGap = box->max - box->min;

	//if (depth < THESHOLD && (abs(boxGap.x)> MIN_GAP && abs(boxGap.y) > MIN_GAP && abs(boxGap.z) > MIN_GAP))
	if (!stop && depth < THESHOLD && length(boxGap))
		burstAdd();
	else
	{
		shapeList.insert(shapeList.end(), tempShapeList.begin(), tempShapeList.end());
		//tempShapeList.clear();
	}
	//burstAdd();
	for (size_t i = 0; i < childern.size(); i++)
	{
		int testResult = isVaildChild(childern[i].next);
		if (testResult < 0)
		{
			childern.erase(childern.begin() + i);
			i--;
		}
		else(childern[i].next->finialize(depth + 1, testResult == 0));
	}
	tempShapeList.clear();
}


IntersectionResult* BasicNode::search(const point3& e, const point3& d, std::vector<IntersectionResult*>& cache,
                                      int depth)
{
	std::vector<IntersectionResult*> onHold;


	if (isDebug)
		printTree(depth, false, cache);


	for each (Object* object in shapeList)
	{
		searchHelper(onHold, cache, e, d, object, depth);
	}


	for (int i = 0; i < childern.size(); i++)
	{
		if (childern[i].box.quickTest(e, d) == true &&
			childern[i].next != nullptr)
		{
			IntersectionResult* temp = (childern[i].next)->search(e, d, cache, depth + 1);
			if (temp != nullptr && temp->isIntersect)
			{
				onHold.push_back(temp);
				//break;
			}
		}
	}
	if (onHold.empty())
		return nullptr;
	else
	{
		IntersectionResult* result = nullptr;
		for (size_t i = 0; i < onHold.size(); i++)
		{
			if (result == nullptr && onHold[i]->t > 0)
				result = onHold[i];
			else if (onHold[i]->t > 0 && onHold[i]->t < result->t)
				result = onHold[i];
		}
		return result;
	}
}

IntersectionResult* BasicNode::partialSearch(const point3& e, const point3& d, Object* ref,
                                             std::vector<IntersectionResult*>& cache, int depth)
{
	std::vector<IntersectionResult*> onHold;
	if (isDebug)
		printTree(depth, false, cache);

	for each (Object* object in shapeList)
	{
		if (object != ref)
			searchHelper(onHold, cache, e, d, object, depth);
	}


	for (int i = 0; i < childern.size(); i++)
	{
		if (childern[i].box.quickTest(e, d) == true &&
			childern[i].next != nullptr)
		{
			IntersectionResult* temp = (childern[i].next)->partialSearch(e, d, ref, cache, depth + 1);
			if (temp != nullptr && temp->isIntersect)
			{
				onHold.push_back(temp);
				
			}
		}
	}
	if (onHold.empty())
		return nullptr;
	else
	{
		IntersectionResult* result = nullptr;
		for (size_t i = 0; i < onHold.size(); i++)
		{
			if (result == nullptr && onHold[i]->t > 0)
				result = onHold[i];
			else if (onHold[i]->t > 0 && onHold[i]->t < result->t)
				result = onHold[i];
		}
		return result;
	}
}

int BasicNode::findCache(const std::vector<IntersectionResult*>& cache, Object* target)
{
	for (size_t i = 0; i < cache.size(); i++)
	{
		if (cache[i]->ref == target)
			return i;
	}
	return -1;
}


void BasicNode::printTree(int depth, bool doNext, const std::vector<IntersectionResult*>& cached)
{
	std::stringstream fmt;
	std::stringstream fmt1;

	point3 boxMin = box->max;
	point3 boxMax = box->min;
	boxMin.z = -boxMin.z;
	boxMax.z = -boxMax.z;
	fmt1 << "|" << std::string(depth * 4, '-') << '>';
	fmt << fmt1.str() << "child ID: " << childID << std::endl;
	colorPrint(fmt.str(), BACKGROUND_INTENSITY | BACKGROUND_GREEN);
	fmt.str("");

	fmt << fmt1.str() << "cached:" << cached.size() << std::endl;
	colorPrint(fmt.str(), 0x7);
	fmt.str("");

	fmt << fmt1.str() << "Box: near:" << to_string(boxMin) << " far : " << to_string(boxMax) << std::endl;
	colorPrint(fmt.str(), FOREGROUND_INTENSITY | FOREGROUND_YELLOW);
	fmt.str("");
	fmt << fmt1.str() << "shape List:" << std::endl;
	for (auto& i : shapeList)
	{
		boxMin = i->box->max;
		boxMax = i->box->min;
		boxMin.z = -boxMin.z;
		boxMax.z = -boxMax.z;
		fmt << fmt1.str() << "ID: " << i->index << " second Index:" << i->secondIndex << " box: near:" <<
			to_string(boxMin) << " far : " << to_string(boxMax);
		std::cout << fmt.str();
		fmt.str("");
		int cacheCheck = findCache(cached, i);
		//int newCacheCheck = findNewCache(newCache, shapeList[i]);
		if (cacheCheck != -1)
		{
			if (cacheCheck != -1)
				colorPrint(" CACHED£¬ HIT", FOREGROUND_GREEN | FOREGROUND_INTENSITY);
			else
			{
				colorPrint(" CACHED£¬ MISS", FOREGROUND_RED | FOREGROUND_INTENSITY);
			}
		}

		std::cout << "" << std::endl;
	}

	fmt << fmt1.str() << "temp shape List:" << std::endl;
	for (auto& i : tempShapeList)
	{
		boxMin = i->box->max;
		boxMax = i->box->min;
		boxMin.z = -boxMin.z;
		boxMax.z = -boxMax.z;
		fmt << fmt1.str() << "ID: " << i->index << " second Index:" << i->secondIndex << "Box: near:" <<
			to_string(boxMin) << " far : " << to_string(boxMax) << std::endl;
	}
	std::cout << fmt.str() << std::endl;


	if (doNext)
		for (size_t i = 0; i < childern.size(); i++)
		{
			if (childern[i].next != nullptr)
			{
				childern[i].next->printTree(depth + 1, doNext, cached);
			}
		}
	if (depth == 0)
		std::cout << "\n****************************" << std::endl;
}

void BasicNode::printChildBoxHitTestResult(const std::vector<TreeFargement>& childernBoxTesting, const int depth,
                                           const point3& e, const point3& d)
{
	for (auto i : childernBoxTesting)
	{
		if (i.isIntersect)
		{
			point3 intersect = e + i.t * d;
			std::stringstream fmt;
			std::stringstream fmt1;
			fmt << "|" << std::string(depth * 4, '-') << '>' << "child: " << static_cast<BasicNode*>(i.ref)->childID <<
				" intersect at: " << to_string(intersect) << std::endl;
			colorPrint(fmt.str(), FOREGROUND_GREEN | FOREGROUND_INTENSITY);
		}
	}
}

void BasicNode::printSearchResult(IntersectionResult* result, int depth)
{
	std::stringstream fmt;
	fmt << "|" << std::string(depth * 4, '-') << '>' << "shape: " << result->ref->index << " second index " << result
	                                                                                                           ->ref->
	                                                                                                           secondIndex
		<< " intersect at: " << to_string(result->intersectionpoint) << std::endl;
	colorPrint(fmt.str(), FOREGROUND_YELLOW | FOREGROUND_INTENSITY | BACKGROUND_RED | BACKGROUND_INTENSITY);
}

int BasicNode::isVaildChild(BasicNode* child)
{
	if (child == nullptr)
		return -1;
	if (child->tempShapeList.size() != 0 && child->tempShapeList.size() != tempShapeList.size())
		return 1;
	return 0;
}

bool compareNextDistance(Next& a, Next& b)
{
	if (!a.box.hitTestResult.isIntersect && b.box.hitTestResult.isIntersect) //only one hit
		return false;
	if (a.box.hitTestResult.isIntersect && !b.box.hitTestResult.isIntersect)
		return true;
	if (a.box.hitTestResult.isIntersect && b.box.hitTestResult.isIntersect) //two hit
		return a.box.hitTestResult.t < b.box.hitTestResult.t;
	return false;
	//no hitno metter who come first t always be -1;
}

bool compareObjectDistance(const TreeFargement& a, const TreeFargement& b)
{
	if (!a.isIntersect && b.isIntersect) //only one hit
		return false;
	if (a.isIntersect && !b.isIntersect)
		return true;
	if (a.isIntersect && b.isIntersect) //two hit
		return a.t < b.t;
	return false;
	//no hitno metter who come first t always be -1;
}


BasicNode::~BasicNode()
{
	for (int i = 0; i < childern.size(); i++)
		if (childern[i].next != nullptr)
			free(childern[i].next);
	free(box);
};
