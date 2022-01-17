#pragma once
#include "utli.h"
#include "AABB.h"
#include "Object.h"
#define THESHOLD 4
#define MIN_GAP 2
class BasicNode;

typedef struct
{
	AABB box;
	BasicNode* next;
} Next;

class BasicNode
{
public:
	static bool isDebug;
	int childID;
	BasicNode* parent;
	point3 point1;
	point3 point2;
	AABB* box;
	std::vector<Object*> shapeList;
	std::vector<Object*> tempShapeList;

	std::vector<Next> childern;
	BasicNode(point3 point1, point3 point2, BasicNode* parent, int childID);
	BasicNode(Point3Tuple2 pointSet, BasicNode* parent, int childID);
	void initial(point3 point1, point3 point2, BasicNode* parent, int childID);
	void add(Object* newShape);

	void burstAdd();
	bool searchHelper(std::vector<IntersectionResult*>& onHold, std::vector<IntersectionResult*>& cache,
	                  const point3& e, const point3& d, Object* target, int depth);
	
	void finialize(int depth, bool stop = false);
	IntersectionResult* search(const point3& e, const point3& d, std::vector<IntersectionResult*>& cache, int depth);
	IntersectionResult* partialSearch(const point3& e, const point3& d, Object* self,
	                                  std::vector<IntersectionResult*>& cache, int depth);
	int findCache(const std::vector<IntersectionResult*>& cache, Object* target);
	
	void printTree(int depth, bool doNext, const std::vector<IntersectionResult*>& cached);
	void printChildBoxHitTestResult(const std::vector<TreeFargement>& childernBoxTesting, int depth, const point3& e,
	                                const point3& d);
	void printSearchResult(IntersectionResult* result, int depth);

	int isVaildChild(BasicNode* child);
	~BasicNode();
};


bool compareObjectDistance(const TreeFargement& a, const TreeFargement& b);
