import React, {Component} from 'react';
import {View} from 'react-native';
import {GLView} from 'expo-gl';
// import mat4 from 'gl-mat4';
import {vec3, mat4, vec4} from 'gl-matrix';
// require('gl-matrix');
class Canvas {
  renderList = [];
  shapeList = {
    path: {},
    rect: {},
    circle: {},
    tri: {},
  };
  gl = null;
  backgroundColor = {};
  backBackground = {r: 0, g: 0, b: 0, a: 0};
  width = 0;
  height = 0;
  world = null;
  vertexShader_fill = null;
  vertexShader_counter = null;
  frag = null;
  programInfo_fill = null;
  programInfo_counter = null;

  pushRenderList(config) {
    this.renderList.push(config);
  }

  getRenderList() {
    return this.renderList;
  }

  popRenderList() {
    this.renderList.splice(this.renderList.length - 1, 1);
  }

  removeShape(index) {
    this.renderList.splice(index, 1);
  }

  clearScreen(background) {
    this.gl.clearColor(background.r, background.g, background.b, background.a);
  }

  initializeScreen(width, height, backgroundColor) {
    console.log('###initialize canvas###');
    console.log(width.toString() + ' ' + height.toString());
    this.width = width;
    this.height = height;
    this.backBackground = backgroundColor;
    let half_width = width / 2;
    let half_height = height / 2;
    this.world = mat4.create();
    mat4.ortho(
      this.world,
      -half_width,
      half_width,
      -half_height,
      half_height,
      1,
      100,
    );
    let temp = {
      type: 'tri',
      top: vec3.create(),
      leftButton: vec3.create(),
      rightButton: vec3.create(),
      color: vec4.create(),
      isFull: true,
    };
    vec3.set(temp.top, 0, 50, 0);
    vec3.set(temp.leftButton, -50, 0, 0);
    vec3.set(temp.rightButton, 50, 0, 0);

    this.setShape();
  }

  setShape() {
    this.shapeList.rect.vertex = [
      -1,
      1,
      0, //0
      1,
      1,
      0, //1
      -1,
      -1,
      0, //2
      1,
      -1,
      0, //3
    ];
    this.shapeList.rect.index_fill = [0, 1, 2, 0, 2, 3];
    this.shapeList.rect.index_counter = [0, 1, 2, 3];
    this.shapeList.rect.vertex_stride = 3;
    this.shapeList.rect.vertexBuffer = null;
    this.shapeList.rect.indexBuffer_full = null;
    this.shapeList.rect.indexBuffer_counter = null;

    this.shapeList.tri.vertex = [
      0,
      1,
      0, //0
      1,
      -1,
      0, //1
      -1,
      -1,
      0, //2
    ];

    this.shapeList.tri.index_fill = [0, 1, 2];
    this.shapeList.tri.index_counter = [0, 1, 2, 3];
    this.shapeList.tri.vertex_stride = 3;
    this.shapeList.tri.vertexBuffer = null;
    this.shapeList.tri.indexBuffer_full = null;
    this.shapeList.tri.indexBuffer_counter = null;
    //TODO circle path
  }

  createVertexBuffer(shapeDef, gl) {
    shapeDef.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeDef.vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.shapeList.tri.vertex),
      gl.STATIC_DRAW,
    );
  }

  createIndexBuffer(indexes, gl) {
    let index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indexes),
      gl.STATIC_DRAW,
    );
    return index_buffer;
  }

  createBuffer(shapeDef, gl) {
    // shapeDef.vertexBuffer = gl.createBuffer();
    // shapeDef.indexBuffer_fill = gl.createBuffer();
    // // gl.bindBuffer(gl.ARRAY_BUFFER, shapeDef.vertexBuffer);
    // //
    // // gl.bufferData(
    // //   gl.ARRAY_BUFFER,
    // //   new Float32Array(this.shapeList.tri.vertex),
    // //   gl.STATIC_DRAW,
    // // );
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeDef.indexBuffer);
    // gl.bufferData(
    //   gl.ELEMENT_ARRAY_BUFFER,
    //   new Uint16Array(shapeDef.index_fill),
    //   gl.STATIC_DRAW,
    // );
    this.createVertexBuffer(shapeDef, gl);
    shapeDef.indexBuffer_full = this.createIndexBuffer(
      shapeDef.indexBuffer_full,
      gl,
    );
    shapeDef.indexBuffer_counter = this.createIndexBuffer(
      shapeDef.indexBuffer_counter,
      gl,
    );
  }

  //CCW give positive, CW give negative

  onContextCreate(gl) {
    this.gl = gl;
    this.initializeScreen(gl.drawingBufferWidth, gl.drawingBufferHeight, [
      0,
      1,
      1,
      1,
    ]);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferWidth);
    this.clearScreen(this.backBackground);

    this.vertexShader_fill = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      this.vertexShader_fill,
      `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform int isCounterLine;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * (aVertexPosition,0,1);
      if (isCounterLine == 1)
        gl_PointSize = 150.0;
    }
  `,
    );
    gl.compileShader(this.vertexShader_fill);

    // Create vertex shader (shape & position)
    this.vertexShader_counter = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      this.vertexShader_counter,
      `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * (aVertexPosition,0,1);
      gl_PointSize = 150.0;
    }
  `,
    );
    gl.compileShader(this.vertexShader_counter);

    // Create fragment shader (color)
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      frag,
      `
    uniform vec4 uColor;
    void main(void) {
      gl_FragColor = uColor;
    }
  `,
    );
    gl.compileShader(frag);

    this.programInfo_fill = {
      program: this.programInfo_fill,
      attribLocations: gl.getAttribLocation(
        this.programInfo_fill,
        'aVertexPosition',
      ),
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          this.programInfo_fill,
          'uProjectionMatrix',
        ),
        modelViewMatrix: gl.getUniformLocation(
          this.programInfo_fill,
          'uModelViewMatrix',
        ),
        colorVec4: gl.getUniformLocation(this.programInfo_fill, 'uColor'),
      },
    };

    this.programInfo_counter = {
      program: this.programInfo_counter,
      attribLocations: gl.getAttribLocation(
        this.programInfo_counter,
        'aVertexPosition',
      ),
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          this.programInfo_counter,
          'uProjectionMatrix',
        ),
        modelViewMatrix: gl.getUniformLocation(
          this.programInfo_counter,
          'uModelViewMatrix',
        ),
        colorVec4: gl.getUniformLocation(this.programInfo_counter, 'uColor'),
      },
    };

    this.createBuffer(this.shapeList.tri, gl);
    this.createBuffer(this.shapeList.rect, gl);

    // this.shapeList.tri.vertexBuffer = gl.createBuffer();
    // this.shapeList.tri.indexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.shapeList.tri.vertexBuffer);
    //
    // gl.bufferData(
    //   gl.ARRAY_BUFFER,
    //   new Float32Array(this.shapeList.tri.vertex),
    //   gl.STATIC_DRAW,
    // );
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.shapeList.tri.indexBuffer);
    // gl.bufferData(
    //   gl.ELEMENT_ARRAY_BUFFER,
    //   new Uint16Array(this.shapeList.tri.index),
    //   gl.STATIC_DRAW,
    // );
    //
    // this.shapeList.rect.vertexBuffer = gl.createBuffer();
    // this.shapeList.rect.indexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, this.shapeList.rect.vertexBuffer);
    // gl.bufferData(
    //   gl.ARRAY_BUFFER,
    //   new Float32Array(this.shapeList.rect.vertex),
    //   gl.STATIC_DRAW,
    // );
    //
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.shapeList.rect.indexBuffer);
    // gl.bufferData(
    //   gl.ELEMENT_ARRAY_BUFFER,
    //   new Float32Array(this.shapeList.rect.index),
    //   gl.STATIC_DRAW,
    // );

    //TODO path, circle
  }

  distance(a, b) {
    let point_square = [
      (a[0] - b[0]) * (a[0] - b[0]),
      (a[1] - b[1]) * (a[1] - b[1]),
    ];

    return Math.sqrt(point_square[0] + point_square[1]);
  }

  calculateTransForm(pos, rot, scale) {
    let mtx = mat4.create();
    // let mtxOut = mat4.create();
    mat4.identity(mtx);
    mat4.translate(mtx, mtx, pos);
    mat4.rotateZ(mtx, mtx, rot);
    mat4.scale(mtx, mtx, scale);
    return mtx;
  }

  generateTri(config) {
    let button = vec3.create();
    let whole = vec3.create();
    let center = vec3.create();
    let divide_factor = vec3.create();
    let diff = vec3.create();
    let scale = vec3.create();
    vec3.set(divide_factor, 3, 3, 3);
    vec3.add(button, config.rightButton, config.leftButton);
    vec3.add(whole, config.top, button);
    vec3.divide(center, whole, divide_factor);
    vec3.subtract(diff, button.rightButton, button.leftButton);
    let width = vec3.distance(button.leftButton, button.rightButton);
    let height = vec3.distance(button, config.top);
    let angle = Math.atan2(diff[1], diff[0]);
    vec3.set(scale, width, height, 1);
    return {
      width: width,
      height: height,
      angle: angle,
      mtx: this.calculateTransForm(center, angle, scale),
    };
  }

  prepareRendering(
    world,
    shapeDef,
    shapeInstance,
    programInfo,
    color,
    numComponents,
  ) {
    // pull out 3 values per iteration
    const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0;
    const offset = 0; // how many bytes inside the buffer to start from
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shapeInstance.vertexBuffer);
    this.gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );

    this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    this.gl.useProgram(programInfo.program);

    this.gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      this.world,
    );
    this.gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      shapeInstance.mtx,
    );
    this.gl.uniform4fv(programInfo.uniformLocations.colorVec4, color);
  }

  drawTriangle(config, isFill, color) {
    this.prepareRendering(
      this.world,
      this.shapeList.tri,
      config,
      isFill ? this.programInfo_fill : this.programInfo_counter,
      color,
      3,
    );
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeList.tri.vertexBuffer);
    this.gl.bindBuffer(
      this.gl.ELEMENT_ARRAY_BUFFER,
      isFill
        ? this.shapeList.tri.indexBuffer_full
        : this.shapeList.tri.indexBuffer_counter,
    );
    this.gl.drawElements(this.gl.TRIANGLES, 1, this.gl.UNSIGNED_BYTE, 0);
  }

  drawCircle(config, isFill, color) {}

  drawRect(config, isFill, color) {}

  drawLine(config, color) {}

  drawPath(config) {}

  draw() {}
}
const canvas = new Canvas();
export default canvas;
