#version 450

in vec4 vNormal;
in vec4 vPosition;
uniform int rowSize, patternSize, useLight, shaderIndex;
uniform mat4 ModelView, Projection, ModelViewInverseTranspose, worldSetup;
uniform vec4 color1, color2, topLightPosition, frontLightPosition;
flat out vec4 f_colour;
out vec3 N, LF, LT, E;
flat out int id;
void main()
{
	int row = gl_VertexID / (rowSize);
	int col = gl_VertexID % (rowSize);
	int quadColNo = col /(patternSize);
	int quadRowNo = row /(patternSize);
	if ((quadRowNo%2 ==0 && quadColNo%2 ==0) || (quadRowNo%2 ==1 && quadColNo%2 ==1) ){
		f_colour = color1;
	}
	else
		f_colour = color2;

	if (useLight == 1){
		vec3 pos = (ModelView *vPosition).xyz;
		LF = normalize((worldSetup*frontLightPosition).xyz - pos);
		LT = normalize((worldSetup*topLightPosition).xyz - pos);

		E = normalize(-pos);

		N = normalize((ModelViewInverseTranspose*vNormal).xyz);

		}
	gl_Position = Projection*ModelView*vPosition;
	id = gl_VertexID;
	

}