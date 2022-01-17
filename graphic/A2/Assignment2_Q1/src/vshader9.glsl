#version 450


in vec4 vPosition;
out vec4 vColor;
uniform vec4 inColor;
uniform mat4 ModelView, Projection;

void main()
{

  gl_Position = Projection * ModelView * vPosition;
  vColor = inColor;
  vec4 temp = vPosition;

}

