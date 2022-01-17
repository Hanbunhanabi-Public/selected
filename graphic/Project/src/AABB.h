#pragma once
#include "utli.h"
#include <wincrypt.h>
class AABB
{
public:
	point3 min;
	point3 max;
	point3 center;
	AABBtestResult hitTestResult;
	AABB();
	AABB(point3 min, point3 max);
	AABB(Point3Tuple2 pointSets);
	Point3Tuple2 findNearFar(point3 e);
	Point3Tuple2 getBox();
	void initialize(point3 min, point3 max);
	void setBox(Point3Tuple2 targetBox);
	bool pointBoxTest(point3 target);
	bool isContain(Point3Tuple2 targetBox);
	bool isHalfContain(Point3Tuple2 targetBox);
	AABBtestResult isHit(point3 e, point3 d);
	bool quickTest(point3 e, point3 d);
	void isHitTest(point3 e, point3 d);
	TreeFargement isHitTest(point3 e, point3 d, void* ref);
	
	static point3 eyePos;
	~AABB();
};

