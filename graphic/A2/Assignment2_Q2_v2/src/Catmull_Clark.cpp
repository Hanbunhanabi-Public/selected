/*
COMP 4490
Assignment 2 Q2
Li Borui

*/
#include "Catmull_Clark.h"

Catmull_Clark::Catmull_Clark() {}



point4 Catmull_Clark::sum(std::vector<point4>* vetries, std::vector<GLuint>* inices) {
	point4 result;
#pragma parallel for reduction(+:result)
	for (size_t i = 0; i < inices->size(); i++)
	{
		result += vetries->at(inices->at(i));
	}
	return  result;
}

point4 Catmull_Clark::cacl_VF(std::vector<point4>* vetries, std::vector<GLuint>* inices) {
	return  (1.0f / inices->size()) * sum(vetries, inices);
}

point4 Catmull_Clark::cacl_E(point4 d1, point4 d2, point4 v1, point4 v1_1) {
	return 0.25f * (d1 + d2 + v1 + v1_1);
}
point4 Catmull_Clark::cacl_d_(point4 d1, point4 r, point4 s, int n) {
	return (n - 3.0f) / n * d1 + 2.0f / n * r + 1.0f / n * s;
}
point4 Catmull_Clark::cacl_R(std::vector<point4>* vetries, std::vector<GLuint>* inices) {
	return  (1.0f / inices->size()) * sum(vetries, inices);
}
point4 Catmull_Clark::cacl_S(std::vector<point4>* vetries, std::vector<GLuint>* inices, int m) {
	return  (1.0f / m) * sum(vetries, inices);
}
Catmull_Clark::~Catmull_Clark() = default;

Objects Catmull_Clark::process(Objects * target) {



	Objects processObject = Objects(*target);
	std::vector<std::vector<GLuint>> mIndexs = processObject.findPointMIndex();
	std::vector<std::vector<GLuint>> vIndexs = processObject.findPointVIndex();
	std::vector<point4> rPoints;
	std::vector<point4> sPoints;
	rPoints.resize(mIndexs.size());
	sPoints.resize(vIndexs.size());


	//R
#pragma omp parallel 
	{
#pragma omp for
		for (int i = 0; i < mIndexs.size(); i++)
		{
			rPoints[i] = cacl_R(&processObject.verties, &mIndexs[i]);
		}
		//S
#pragma omp for
		for (int i = 0; i < vIndexs.size(); i++)
		{
			sPoints[i] = cacl_S(&processObject.verties, &vIndexs[i], mIndexs[i].size());
		}
	}
	//E

	for (std::map<GLuint, std::vector<int>>::iterator iter = processObject.verties_midEdgeIndex.begin(); iter != processObject.verties_midEdgeIndex.end(); iter++)
	{
		std::vector<GLuint> ev = processObject.findPointEVIndex(iter->first);
		std::vector<GLuint> ed = processObject.findPointEDIndex(iter->first);
		processObject.verties[iter->first] =
			cacl_E(processObject.verties[ev[0]], processObject.verties[ev[1]], processObject.verties[ed[0]], processObject.verties[ed[1]]);
	}

	//d
#pragma omp parallel for
	for (int i = 0; i < processObject.endVertiesIndex; i++)
	{
		processObject.verties[i] = cacl_d_(processObject.verties[i], rPoints[i], sPoints[i], mIndexs[i].size());
	}
	return processObject;
}