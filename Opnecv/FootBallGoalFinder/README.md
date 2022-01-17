
Marker guide
-------------------------------------
Orange Marker: the goal area
Blue Marker: The end point of segments after correction
Red marker: the center of possible region







Added function:
------------------------------------------------------------------------------------

Track Bar:


1.	invert threshold : 0--erode--dilate  1 ---dilate--erode
2.	minimum length: the minimum length for a line segment to be consider for further processing
3.	max Seg dist: this gives the distance between two lines. 
4.	maximum angle : the max angle different between two line to be consider have same orientation 
5.	max_val_dist : the max verital distance between two line segment to be consider as same line
6.	Erode  ---
7.	Dilate----
8.	size------
9.	Min threshold : this factor determine the threshold for canny 
10.	second_min_length : second filter for reduce short line segment after linking ,usually set as 0
11.	max_regular_endpoint : this will move away two intersect line and change the type of the intersection point type 
12.	range :	distance from line to end point ,increase if endpoint does not detected due to to far between two line 
13.	min_angle_range : for angle <90
14.	max-angle_range : for angle >90

Notice : 
1.	minimum length: never set the length too small ( <10 ), or it will eat too much resource and result crash!
2.	Erode  always set to 0 for currently!
3.	max Seg dist : the diagonal line of the frame size is the default value ( link all line )
4.	if min_angle_range or max_angle_range either does not work ,try another one  
5. 	to test program use main.cpp

