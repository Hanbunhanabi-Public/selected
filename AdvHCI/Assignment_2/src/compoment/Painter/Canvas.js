import {mat4, vec3, vec4} from 'gl-matrix';
import Buffer from 'buffer';

global.Buffer = require('buffer').Buffer;

import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';

// import jpeg from 'jpeg-js';
class Canvas {
  renderList = [];
  currentPath = []; //format [ [x1,y1,z1],[x2,y2,z2]]
  shapeList = {};
  backBackground = {r: 0, g: 255, b: 255, a: 1};
  world = null;
  shapeIDAssign = 2;
  programInfo = null;
  gl = null;
  pathDefine = null;
  selectBuffer = 0;
  rawPathInstance = null;
  half_width = 0;
  half_height = 0;
  width = 0;
  height = 0;

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

  clearScreen(gl, background) {
    gl.clearColor(background.r, background.g, background.b, background.a);
  }

  createShape(
    shapeType,
    pos,
    angle,
    scale,
    color,
    isFill,
    begin = null,
    end = null,
  ) {
    const uid = this.shapeIDAssign++;

    let newShape = {
      shapeType: shapeType, //shape type name, must match
      uid: uid, //automatic assigned
      pos: pos, //shape center should be vec3
      angle: angle, //shape angle
      scale: scale, //shape scale should be vec3
      mtx: canvas.calculateTransForm(pos, angle, scale), //shape final transform matrix, should be mat4
      color: color, //shape color
      idColor: [
        ((uid >> 0) & 0xff) / 0xff, //eslint-disable-line no-bitwise
        ((uid >> 8) & 0xff) / 0xff, //eslint-disable-line no-bitwise
        ((uid >> 16) & 0xff) / 0xff, //eslint-disable-line no-bitwise
        ((uid >> 24) & 0xff) / 0xff, //eslint-disable-line no-bitwise
      ], // the id color, should be unique
      isFill: isFill, //set to true if fill the shape
      endpoints: null,
    };
    if (begin !== null && end !== null) {
      // console.log(shapeType, begin, end);
      newShape.endpoints = [begin, end].flat();
    }

    // console.log(newShape);

    return newShape;
  }

  onContextCreate(gl, width, height) {
    this.setWorld(width, height);
    this.setShape(gl);
    canvas.setShaders(gl);
    console.info('###create back buffer###');

    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.selectBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.selectBuffer);
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    const level = 0;
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      attachmentPoint,
      gl.TEXTURE_2D,
      targetTexture,
      level,
    );

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      console.error('back buffer initialize incorrect');
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.gl = gl;
  }

  setWorld(width, height) {
    console.log('### initialize canvas ###');
    // console.warn(width.toString(), height.toString());
    this.width = width;
    this.height = height;
    this.half_width = width / 2;
    this.half_height = height / 2;
    this.world = mat4.create();
    mat4.ortho(
      this.world,
      -this.half_width,
      this.half_width,
      -this.half_height,
      this.half_height,
      1,
      100,
    );
  }

  convertCoord(x, y) {
    return [x - this.half_width, this.half_height - y, 0];
  }

  polarToCartesian(r, angle) {
    const pi = Math.PI;
    const rad = angle * (pi / 180);
    return [r * Math.cos(rad), r * Math.sin(rad), 0];
  }

  setShape(gl) {
    let rect = {
      vertex: [
        -1,
        1,
        0, //0
        1,
        1,
        0, //1
        1,
        -1,
        0, //2
        -1,
        -1,
        0, //3
      ],
      index_fill: [0, 1, 2, 0, 2, 3],
      index_counter: [0, 1, 2, 3],
      shapeBuffer: null,
    };
    rect.shapeBuffer = this.createBuffer(rect, gl);
    this.shapeList.rect = rect;

    let tri = {
      vertex: [
        0,
        1,
        0, //0
        1,
        -1,
        0, //1
        -1,
        -1,
        0, //2
      ],
      index_fill: [0, 1, 2],
      index_counter: [0, 1, 2],
      shapeBuffer: null,
    };
    tri.shapeBuffer = this.createBuffer(tri, gl);
    this.shapeList.tri = tri;

    // let testShape = {
    //   vertex: [0.0, 0.0, 0.0],
    //   color: [1.0, 0.0, 0.0, 1.0],
    //   idColor: [0, 0, 1, 1],
    //   index_fill: [0],
    //   index_counter: [0],
    //   shapeBuffer: null,
    // };
    // testShape.shapeBuffer = this.createBuffer(testShape, gl);
    // this.shapeList.testShape = testShape;
    // //TODO circle path

    let line = {
      vertex: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],

      // idColor: [0, 0, 1, 1],
      index_fill: [0, 1],
      index_counter: [0, 1],
      shapeBuffer: null,
    };
    line.shapeBuffer = this.createBuffer(line, gl);
    this.shapeList.line = line;

    let circle = {
      vertex: [[0, 0, 0]],
      index_fill: [],
      index_counter: [],
      shapeBuffer: null,
    };

    const circleVertexNum = 50;
    const offset = 360.0 / (circleVertexNum - 1);
    for (let i = 0; i < 50; i++) {
      circle.vertex.push(this.polarToCartesian(1, i * offset));
      circle.index_counter.push(i + 1);
    }

    for (let i = 1; i < circle.vertex.length - 1; i++) {
      circle.index_fill.push(0);
      circle.index_fill.push(i);
      circle.index_fill.push(i + 1);
    }

    circle.index_fill.push(0);
    circle.index_fill.push(circle.vertex.length - 1);
    circle.index_fill.push(1);
    // console.log(circle.vertex);
    // console.log(circle.index_fill);
    circle.vertex = circle.vertex.flat();
    circle.shapeBuffer = this.createBuffer(circle, gl);
    this.shapeList.circle = circle;

    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 0]),
      gl.DYNAMIC_DRAW,
    );

    this.pathDefine = {
      shapeBuffer: {
        vertexBuffer: vertexBuffer,
      },
    };

    let pos = vec3.create();
    vec3.set(pos, 0, 0, -5);
    let angle = 0;
    let scale = vec3.create();
    vec3.set(scale, 1, 1, 1);
    this.rawPathInstance = this.createShape(
      'raw',
      pos,
      angle,
      scale,
      [0.13, 1, 0.13, 1],
      false,
    );

    // console.log('created shapes');
    // console.log(JSON.stringify(this.shapeList, null, 2));
  }

  createVertexBuffer(shapeDef, gl) {
    // console.log('create vertex buffer');
    // console.log(shapeDef);
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(shapeDef.vertex),
      gl.DYNAMIC_DRAW,
    );
    return vertexBuffer;
  }

  createIndexBuffer(indexes, gl) {
    // console.log('create index buffer');
    // console.log(indexes);
    let index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indexes),
      gl.DYNAMIC_DRAW,
    );
    return index_buffer;
  }

  createBuffer(shapeDef, gl) {
    // console.info('### create shape buffers ###');
    // console.log(shapeDef);
    return {
      vertexBuffer: this.createVertexBuffer(shapeDef, gl),
      indexBuffer_full: this.createIndexBuffer(shapeDef.index_fill, gl),
      indexBuffer_counter: this.createIndexBuffer(shapeDef.index_counter, gl),
    };
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

  setShaders(gl) {
    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      vert,
      `
      attribute vec3 a_position;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(a_position,1);

        
      }
    `,
    );

    gl.compileShader(vert);

    // Create fragment shader (color)
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      frag,
      `
      precision mediump float;
      uniform vec4 uColor;
      
      void main(void) {
        gl_FragColor = uColor;
      }
    `,
    );

    gl.compileShader(frag);

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program');
      console.error('vertex');
      console.error(gl.getShaderInfoLog(vert));
      console.error('fragment');
      console.error(gl.getShaderInfoLog(frag));
    } else {
      console.log('program link correctly');
    }

    this.programInfo = {
      program: program,
      attribLocations: gl.getAttribLocation(program, 'a_position'),
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
        colorVec4: gl.getUniformLocation(program, 'uColor'),
      },
    };
    /*console.info('### set shader ###');
    console.log(this.programInfo);
    console.log('vert');
    console.log(vert);
    console.log('frag');
    console.log(frag);*/
    return this.programInfo;
  }

  setupProgram(gl, program) {
    // console.info('set program');
    // console.log(program);
    gl.useProgram(program);
    // console.info('set program done');
  }

  setUniforms(gl, programInfo, numComponents, shapeInstance, color) {
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0;
    const offset = 0; // how many bytes inside the buffer to start from
    gl.enableVertexAttribArray(programInfo.attribLocations);
    gl.vertexAttribPointer(
      programInfo.attribLocations,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      this.world,
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      shapeInstance.mtx,
    );
    // let currentColor = vec4.create();
    // vec4.set(currentColor, color[0], color[1], color[2], color[3]);

    gl.uniform4fv(programInfo.uniformLocations.colorVec4, color);

    // console.info('### set uniforms ###');
    // console.log('world: ' + this.world.toString());
    // console.log('final transform');
    // console.log(shapeInstance.mtx);
    // console.log('color: ' + color.toString());
  }

  bindBuffers(gl, shapeInstance, shapeBuffers, isFill) {
    // console.info('### bind buffer ###');
    // console.log(shapeBuffers);
    // console.log(shapeInstance);
    this.gl.bindBuffer(gl.ARRAY_BUFFER, shapeBuffers.vertexBuffer);
    this.gl.bindBuffer(
      this.gl.ELEMENT_ARRAY_BUFFER,
      isFill ? shapeBuffers.indexBuffer_full : shapeBuffers.indexBuffer_counter,
    );
  }

  drawShape(gl, renderInstance, programInfo, isFill, color) {
    if (
      !(renderInstance.shapeType in this.shapeList) ||
      !renderInstance.shapeType === 'raw'
    ) {
      /*console.warn(
        'the shape list does not contain following shape define: ' +
          renderInstance.shapeType,
      );*/
      return;
    }

    const renderShape = this.shapeList[renderInstance.shapeType];
    // console.log('===> draw shape:' + renderInstance.shapeType);
    // console.log(renderShape);
    const indexBuffer = isFill
      ? renderShape.index_fill
      : renderShape.index_counter;
    this.bindBuffers(gl, renderInstance, renderShape.shapeBuffer, isFill);
    // console.log('set uniform with isFill:' + isFill.toString());
    this.setUniforms(gl, programInfo, 3, renderInstance, color);

    gl.lineWidth(isFill ? 1 : 10);
    if (renderInstance.shapeType !== 'line') {
      gl.drawElements(
        isFill ? gl.TRIANGLES : gl.LINE_LOOP,
        indexBuffer.length,
        this.gl.UNSIGNED_SHORT,
        0,
      );
    } else {
      // console.log('draw line');
      gl.lineWidth(10);
      gl.drawElements(gl.LINE_STRIP, indexBuffer.length, gl.UNSIGNED_SHORT, 0);
    }
  }

  //if set to a specific buffer this would render to the back end
  //render the current path separately
  //when draw on the back buffer the current path should be clear
  internalDraw(gl, isSelect = false) {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const programInfo = this.programInfo;
    // console.info('### draw shape ###');
    // console.log(this.width.toString(), this.height.toString());
    // console.log('clear color with');
    // console.log(this.backBackground);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // if (!isSelect) {
    gl.clearColor(
      this.backBackground.r,
      this.backBackground.g,
      this.backBackground.b,
      this.backBackground.a,
    );
    // } else {
    //   gl.clearColor(255, 255, 255, 255);
    // }
    // console.log(programInfo);
    this.setupProgram(gl, programInfo.program);
    //render each shape
    // console.log(this.renderList);
    for (let i = 0; i < this.renderList.length; i++) {
      //check the render type: the back buffer is for erease
      // console.log('drawing:', this.renderList[i]);
      let isFill = this.renderList[i].isFill;

      if (this.renderList[i].shapeType === 'line') {
        isFill = false;

        gl.bindBuffer(
          gl.ARRAY_BUFFER,
          this.shapeList[this.renderList[i].shapeType].shapeBuffer.vertexBuffer,
        );
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(this.renderList[i].endpoints),
          gl.DYNAMIC_DRAW,
        );
        // console.log('here');
        // gl.bindBuffer(gl, ArrayBuffer, null);
        // console.log('end');
      }

      const color = !isSelect
        ? this.renderList[i].color
        : this.renderList[i].idColor;

      this.drawShape(gl, this.renderList[i], programInfo, isFill, color);
    }

    if (!isSelect && this.currentPath.length !== 0) {
      // console.log('draw raw path');
      // console.log(this.currentPath);
      // console.log(this.rawPathInstance);
      const flattenedPath = this.currentPath.flat();
      const vertexBuffer = this.pathDefine.shapeBuffer.vertexBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(flattenedPath),
        gl.DYNAMIC_DRAW,
      );
      this.setUniforms(
        gl,
        programInfo,
        3,
        this.rawPathInstance,
        this.rawPathInstance.color,
      );
      gl.lineWidth(10);
      gl.drawArrays(gl.LINE_STRIP, 0, this.currentPath.length);
    }
  }

  draw() {
    const gl = this.gl;
    //normal render
    // console.log('****shape list size****');
    // console.log(this.renderList.length);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.internalDraw(gl);
    // this means we need to draw a new shape, time to update the back buffer
    if (this.currentPath.length === 0) {
      // console.log('===draw on selection===');
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.selectBuffer);
      this.internalDraw(gl, true);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.flush();
    gl.endFrameEXP();
    // console.warn('### end of the frame###');
  }

  selectionTest(path) {
    const data = new Uint8Array(4);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.selectBuffer);
    let id = -1;
    /*console.warn(
      this.gl.drawingBufferWidth.toString(),
      this.gl.drawingBufferHeight.toString(),
    );*/
    const widthRatio = this.gl.drawingBufferWidth / this.width;
    const heightRatio = this.gl.drawingBufferHeight / this.height;
    if (path.length === 1) {
      path.push(path[0]);
    }

    // for (let i = 0; i < path.length; i++) {
    //   const _x = path[i][0] * widthRatio + this.gl.drawingBufferWidth / 2;
    //   const _y = this.gl.drawingBufferHeight / 2 - path[i][1] * heightRatio;
    //   // console.warn(_x.toString(), _y.toString());
    //
    //   this.gl.readPixels(
    //     _x, // x
    //     _y, // y
    //     1, // width
    //     1, // height
    //     this.gl.RGBA, // format
    //     this.gl.UNSIGNED_BYTE, // type
    //     data,
    //   ); // typed array to hold result
    //   // console.log(data);
    //   const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
    //   if (id > 0) {
    //     break;
    //   }
    // }
    let vecBegin = vec3.create();
    let vecEnd = vec3.create();
    let testPoint = vec3.create();
    for (let i = 0; i < path.length - 1; i++) {
      vec3.set(
        vecBegin,
        path[i][0] * widthRatio + this.gl.drawingBufferWidth / 2,
        this.gl.drawingBufferHeight -
          (this.gl.drawingBufferHeight / 2 - path[i][1] * heightRatio),
        0,
      );
      vec3.set(
        vecEnd,
        path[i + 1][0] * widthRatio + this.gl.drawingBufferWidth / 2,
        this.gl.drawingBufferHeight -
          (this.gl.drawingBufferHeight / 2 - path[i + 1][1] * heightRatio),
        0,
      );
      const intervals = 1 / Math.ceil(vec3.distance(vecBegin, vecEnd));
      // console.log(vecBegin, vecEnd, intervals);
      for (let j = 0; j < 1; j += intervals) {
        vec3.lerp(testPoint, vecBegin, vecEnd, j);
        this.gl.readPixels(
          testPoint[0], // x
          testPoint[1], // y
          1, // width
          1, // height
          this.gl.RGBA, // format
          this.gl.UNSIGNED_BYTE, // type
          data,
        ); // typed array to hold result
        // console.log(data);

        id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
        // console.log(j, id, testPoint, data);
        if (id > 0 && id !== this.rawPathInstance.uid) {
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
          return id;
        }
      }
    }

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

    return id > 0 ? id : -1;
  }

  saveImage(url) {}

  async exportImage(url) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External store access',
          message:
            'This application request external write permission to record result.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('external file system granted');
        this.exportResult(url);
      } else {
        console.log('external file system denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  exportResult(url) {
    let tempDate = new Date();
    let path =
      RNFS.DownloadDirectoryPath + '/' + tempDate.toString() + '_output.jpeg';
    path = path.replace(/:/g, '_');
    console.log(path);
    console.log(url);

    // write the file
    const decodedURL = decodeURIComponent(url);
    RNFS.moveFile(decodedURL, path)
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
}

const canvas = new Canvas();
export default canvas;
