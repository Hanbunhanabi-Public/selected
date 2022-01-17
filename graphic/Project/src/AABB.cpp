#include "AABB.h"


//TODO be aware of Z!!!
AABB::AABB()
{
}

AABB::AABB(point3 min, point3 max)
{
	initialize(min, max);
}

AABB::AABB(Point3Tuple2 pointSets)
{
	initialize(pointSets.a, pointSets.b);
}

point3 AABB::eyePos = point3(0, 0, 0);

Point3Tuple2 AABB::findNearFar(point3 e)
{
	Point3Tuple2 result;
	result.a.x = -(e.x - min.x) < -(e.x - max.x) ? min.x : max.x;
	result.a.y = -(e.y - min.y) < -(e.y - max.y) ? min.y : max.y;
	result.a.z = -(e.z - min.z) < -(e.z - max.z) ? min.z : max.z;

	result.b.x = -(e.x - min.x) > -(e.x - max.x) ? min.x : max.x;
	result.b.y = -(e.y - min.y) > -(e.y - max.y) ? min.y : max.y;
	result.b.z = -(e.z - min.z) > -(e.z - max.z) ? min.z : max.z;
	return result;
}

Point3Tuple2 AABB::getBox()
{
	return { min, max };
}

void AABB::initialize(point3 min, point3 max)
{

	Point3Tuple2 result = findMinMax({ min,max });
	this->min = result.a;
	this->max = result.b;
	center = (min + max) / 2.f;
}

void AABB::setBox(Point3Tuple2 targetBox)
{
	initialize(targetBox.a, targetBox.b);
}

bool AABB::pointBoxTest(point3 target)
{
	return min.x<= target.x && target.x <= max.x &&
		min.y <= target.y && target.y <= max.y &&
		min.z <= target.z && target.z <= max.z;
}

bool AABB::isContain(Point3Tuple2 targetBox)
{
	return pointBoxTest(targetBox.a) && pointBoxTest(targetBox.b);
}

bool AABB::isHalfContain(Point3Tuple2 targetBox)
{
	/*equation adapt and rewrite from: https://blog.csdn.net/u012419410/article/details/41911025
	 * function: bool AABB::intersects(const AABB& aabb) const (line 200)
	 * original license:
	 * 
	****************************************************************************
	 Copyright (c) 2014 Chukong Technologies Inc.
	 
	 http://www.cocos2d-x.org
	 
	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:
	 
	 The above copyright notice and this permission notice shall be included in
	 all copies or substantial portions of the Software.
	 
	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 THE SOFTWARE.
	 ****************************************************************************
	 */
	if (!((targetBox.a.x >= min.x && targetBox.a.x <= max.x) || (min.x >= targetBox.a.x && min.x <= targetBox.b.x))) return false;
	if (!((targetBox.a.y >= min.y && targetBox.a.y <= max.y) || (min.y >= targetBox.a.y && min.y <= targetBox.b.y))) return false;
	if (!((targetBox.b.z >= min.z && targetBox.a.z <= max.z) || (min.z >= targetBox.a.z && min.z <= targetBox.b.z))) return false;
	return true;
	
}

AABBtestResult AABB::isHit(point3 e, point3 d)
{

	float tNear = -INFINITY;
	float tFar = INFINITY;
	//Point3Tuple2 caps = findNearFar(e);
	Point3Tuple2 caps = {this->min, this->max};
	AABBtestResult result;
	result.isIntersect = false;
	for (int i = 0; i < 3; i++) {
		float di = d[i];
		float ai = caps.a[i];
		float bi = caps.b[i];
		float ei = e[i];
		if (di == 0) {
			if (ei < ai || ei> bi)
				return result;
		}
		else {
			FloatTuple2 ts;
			ts.a = (ai - ei) / di;
			ts.b = (bi - ei) / di;
			if (ts.a > ts.b)	ts = swap(ts);
			if (ts.a > tNear)	tNear = ts.a;
			if (ts.b < tFar)	tFar = ts.b;
			if (tNear > tFar)	return result;
			if (tFar < 0)		return result;

		}
	}
	result.isIntersect = true;
	result.t = tNear;
	return result;
}

bool AABB::quickTest(point3 e, point3 d)
{
	float tNear = -INFINITY;
	float tFar = INFINITY;

	for (int i = 0; i < 3; i++) {
		float di = d[i];
		float ai = this->min[i];
		float bi = this->max[i];
		float ei = e[i];
		if (di == 0) {
			if (ei < ai || ei> bi)
				return false;
		}
		else {
			FloatTuple2 ts;
			ts.a = (ai - ei) / di;
			ts.b = (bi - ei) / di;
			if (ts.a > ts.b)	ts = swap(ts);
			if (ts.a > tNear)	tNear = ts.a;
			if (ts.b < tFar)	tFar = ts.b;
			if (tNear > tFar)	return false;
			if (tFar < 0)		return false;

		}
	}
	return true;
}

void AABB::isHitTest(point3 e, point3 d)
{
	this->hitTestResult = isHit(e, d);
}

TreeFargement AABB::isHitTest(point3 e, point3 d, void* ref)
{
	AABBtestResult temp = isHit(e, d);
	return {temp.t, temp.isIntersect, ref};
}

AABB::~AABB() = default;
