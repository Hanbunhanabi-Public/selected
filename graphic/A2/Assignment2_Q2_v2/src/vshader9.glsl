#version 450


in vec4 vPosition;
uniform mat4 ModelView, Projection;
out vec4 vColor;
uniform int displayLimit;
uniform float opacity;
void main()
{
  gl_Position = Projection * ModelView * vPosition;
  if (gl_VertexID< displayLimit || displayLimit == -1)
  {  vColor = vec4(1.0,1.0,1.0,1.0);
  }
  else{
     vColor = vec4(opacity,opacity,opacity,opacity);
  }
}

