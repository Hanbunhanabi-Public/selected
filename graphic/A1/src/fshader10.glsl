#version 450
uniform int useLight, shaderIndex;
in vec3 N, LF, LT, E;
flat in int  id;
flat in vec4 f_colour;
uniform vec4 topAmbient, topDiffuse, topSpecular;
uniform vec4 frontAmbient, frontDiffuse, frontSpecular;
uniform float topShininess,frontShininess;  
out vec4 color;

void main()
{
	if (useLight != 1)
		color = f_colour;
	else
	{
		vec3 HF = normalize(LF + E);
		vec3 HT = normalize(LT + E);
		vec4 ambient = (frontAmbient * f_colour);
		ambient +=  (topAmbient * f_colour);
		
		float KdF = max( dot( LF,N ),0.0 );
		float KdT = max( dot( N , LT),0.0 );
		vec4 diffuse = KdF * (frontDiffuse*f_colour);
		diffuse += KdT*(topDiffuse*f_colour);
		
		float KsF = pow( max( dot( N, HF), 0.0), frontShininess);
		float KsT = pow( max( dot( N, HT), 0.0), topShininess);
		vec4 newFrontSpecular = KsF* (frontSpecular* f_colour); 
		vec4 newTopSpecular = KsT* (topSpecular* f_colour);

		if ( dot(LF, N) < 0.0 ) 
		{
			newFrontSpecular = vec4(0.0, 0.0, 0.0, 1.0);
		}

		if ( dot(LT, N) < 0.0 ) 
		{
			newTopSpecular = vec4(0.0, 0.0, 0.0, 1.0);
		}
		vec4 specular = newFrontSpecular;
		specular += newTopSpecular;

		color = ambient + diffuse + specular;
		color.a = 1.0;
		
		if ( shaderIndex == 0 && id == 98){

		}

	}
}