import React, {Component} from 'react';
import {
  View,
  PanResponder,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import {GLView} from 'expo-gl';
import canvas from './Canvas';
import {mat4, vec3} from 'gl-matrix';
import {forEach} from 'gl-matrix/cjs/vec2';
import {renderWithStrictMode} from 'react-native/Libraries/Utilities/ReactNativeTestTools';
import log from 'gl-react/lib/helpers/log';

const {width, height} = Dimensions.get('window');
const DEBUG = false;

const drawFlex = 8;
const buttonFlex = 1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawContainer: {
    flex: drawFlex,
  },
  buttonContainer: {
    flex: buttonFlex,
    padding: 5,
    justifyContent: 'space-around',
    backgroundColor: '#669966',
  },
});

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.lastRendered = 0;
    this.width = 300;
    this.height = 500;
    // this.selected_color = [0, 0, 0, 0];
    // this.currentID = -1;
    /*let pos = vec3.create();
    vec3.set(pos, 0, 0, -5);
    let angle = 0;
    let scale = vec3.create();
    vec3.set(scale, 80, 80, 1); // for line set this to [1,1,1]

    let testShapeInstance = canvas.createShape(
      'circle', //shape type name, must match with defined name //TODO possible name 'rect', 'tri','circle'
      pos, //shape center should be vec3
      angle, //shape angle
      scale, //shape scale should be vec3
      [1, 0, 0, 1], //shape color r, g, b, a with range in 0 - 1
      true, //set to true if fill the shape,
      [0.0, 0.0, 0.0], //only work for line actual point pos otherwise just ommit those two
      [200.0, -200.0, 0.0], //only work for line actual point pos
    );

    canvas.renderList.push(testShapeInstance);*/
    // //Example for add path
    // canvas.currentPath.push([10, 0, 0]);
    // canvas.currentPath.push([10, 10, 0]);
    // canvas.currentPath.push([50, 10, 0]);
    // canvas.currentPath.push([50, 100, 0]);

    this.state = {
      hand_X: 0,
      hand_Y: 0,
      currentColor: [0.13, 1, 0.13, 1], //r, g, b, a
      currentAction: 'rect', // rect, line, tri, circle, del, clr
      isHandUp: true,
      fill: true,
      colorName: 'green',
    };

    // this.pan = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },

      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        canvas.currentPath.push(
          canvas.convertCoord(
            evt.nativeEvent.locationX,
            evt.nativeEvent.locationY,
          ),
        );
        this.setState({
          hand_X: evt.nativeEvent.locationX,
          hand_Y: evt.nativeEvent.locationY,
          isHandUp: false,
        });
        /* console.log(
          'mouse moved: [' +
            evt.nativeEvent.locationX.toString() +
            ', ' +
            evt.nativeEvent.locationY.toString() +
            ']',
        );*/
        // canvas.draw();
        // if (this.state.currentAction === 'del') {
        //   let selected = canvas.selectionTest([
        //     canvas.convertCoord(
        //       evt.nativeEvent.locationX,
        //       evt.nativeEvent.locationY,
        //     ),
        //   ]);
        //   console.log(
        //     evt.nativeEvent.locationX,
        //     evt.nativeEvent.locationY,
        //     selected,
        //   );
        //
        //   if (selected !== -1) {
        //     for (let i = 0; i < canvas.renderList.length; i++) {
        //       if (canvas.renderList[i].uid === selected) {
        //         if (this.currentID !== i) {
        //           if (this.currentID !== -1) {
        //             canvas.renderList[
        //               this.currentID
        //             ].color = this.selected_color;
        //           } //restore color
        //         }
        //         this.currentID = i;
        //         this.selected_color = canvas.renderList[i].color;
        //         canvas.renderList[i].color = [255, 0, 0, 1];
        //         break;
        //       }
        //     }
        //   } else {
        //     if (this.currentID !== -1) {
        //       canvas.renderList[this.currentID].color = this.selected_color;
        //       this.currentID = -1;
        //       this.selected_color = [0, 0, 0, 0];
        //     } //restore color
        //   }
        // }

        this.updateFrame();
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        //TODO add if current action is delete shape, add detect shape here, and remove the shape from renderList
        // for other cases add convert path to shape path method here and push to renderList and clear currentPath
        const _thisPath = [...canvas.currentPath];

        canvas.currentPath = [];
        this.updateFrame();
        // TODO put his back in
        // this.saveImage();
        console.log('mouse released');
        if (this.state.currentAction === 'circle') {
          let nFurthest = this.findAccurateCenter(_thisPath);
          let pos = nFurthest[1];
          nFurthest = nFurthest[0];
          let angle = 0;
          let avgDist = this.avgDistFromCenter(_thisPath, pos);
          let scale = vec3.fromValues(avgDist, avgDist, 1);

          this.createShape(
            'circle',
            pos,
            angle,
            scale,
            this.state.currentColor,
          );

          if (DEBUG) {
            this.debugDrawPoints([pos], angle, [1, 1, 0, 1]);
            this.debugDrawPoints(nFurthest, angle, [0, 0, 0, 1]);
            this.debugDrawPath(_thisPath, [1, 1, 1, 1]);
          }
        } else if (this.state.currentAction === 'line') {
          let angle = 0;
          let scale = vec3.fromValues(1, 1, 1);

          let lastInd = _thisPath.length - 1;
          this.createShape(
            'line',
            [_thisPath[0], _thisPath[lastInd]],
            angle,
            scale,
            this.state.currentColor,
          );

          if (DEBUG) {
            this.debugDrawPath(_thisPath, [1, 1, 1, 1]);
          }
        } else if (this.state.currentAction === 'tri') {
          let pos = this.findAccurateCenter(_thisPath)[1];
          let coords = this.boundingCoords(_thisPath);
          pos = this.centerOfMass(coords);
          coords = this.mergeTwo(coords);

          let bottomCoords;
          let topCoord;
          let angles = [
            vec3.angle(
              this.sub(coords[1], coords[0]),
              this.sub(coords[2], coords[0]),
            ),
            vec3.angle(
              this.sub(coords[0], coords[1]),
              this.sub(coords[2], coords[1]),
            ),
            vec3.angle(
              this.sub(coords[1], coords[2]),
              this.sub(coords[0], coords[2]),
            ),
          ];

          let middleInd = 0;
          for (let i = 1; i < angles.length; i++) {
            if (
              (angles[i] >= angles[(i + 1) % angles.length] &&
                angles[i] < angles[(i - 1) % angles.length]) ||
              (angles[i] <= angles[(i + 1) % angles.length] &&
                angles[i] > angles[(i - 1) % angles.length])
            ) {
              middleInd = i;
            }
          }

          let leftInd = (middleInd - 1 + angles.length) % angles.length;
          let rightInd = (middleInd + 1) % angles.length;
          let diff1 = Math.abs(angles[leftInd] - angles[middleInd]);
          let diff2 = Math.abs(angles[rightInd] - angles[middleInd]);

          if (diff1 > diff2) {
            bottomCoords = [coords[middleInd], coords[rightInd]];
            topCoord = coords[leftInd];
          } else {
            bottomCoords = [coords[middleInd], coords[leftInd]];
            topCoord = coords[rightInd];
          }

          // Whichever is the largest is the direction it is going.
          let dirs = this.getDir(pos, topCoord);
          let largestInd = 0;
          for (let i = 1; i < dirs.length; i++) {
            if (dirs[largestInd] < dirs[i]) {
              largestInd = i;
            }
          }

          switch (largestInd) {
            case 0: // right
              if (bottomCoords[0][1] < bottomCoords[1][1]) {
                bottomCoords = [bottomCoords[1], bottomCoords[0]];
              }
              break;
            case 1: // left
              if (bottomCoords[0][1] > bottomCoords[1][1]) {
                bottomCoords = [bottomCoords[1], bottomCoords[0]];
              }
              break;
            case 2: // up
              if (bottomCoords[0][0] > bottomCoords[1][0]) {
                bottomCoords = [bottomCoords[1], bottomCoords[0]];
              }
            case 3: // down
              if (bottomCoords[0][0] > bottomCoords[1][0]) {
                bottomCoords = [bottomCoords[1], bottomCoords[0]];
              }
              break;
          }

          this.generateTriAndRect(
            bottomCoords[0],
            bottomCoords[1],
            topCoord,
            true,
            this.centerOfMass(coords),
          );

          if (DEBUG) {
            // this.debugDrawPoints([bottomCenter], 0, [1, 1, 0, 1]);
            this.debugDrawPoints([pos], 0, [1, 1, 1, 1]);
            this.debugDrawPoints(bottomCoords, 0, [0, 0, 0, 1]);
            this.debugDrawPoints([topCoord], 0, [1, 1, 1, 1]);
            this.debugDrawPath(_thisPath, [1, 1, 1, 1]);
          }
        } else if (
          this.state.currentAction === 'rect' &&
          _thisPath.length >= 3
        ) {
          console.log(_thisPath.length);
          let nFurthest = this.findAccurateCenter(_thisPath);
          let pos = nFurthest[1];
          nFurthest = nFurthest[0];

          while (nFurthest.length > 3) {
            nFurthest = this.mergeTwo(nFurthest);

            if (nFurthest.length == 4 && this.validPoints(pos, nFurthest)) {
              break;
            }
          }

          let diagonal = [nFurthest[0], nFurthest[1]],
            diagonalInd = [0, 1],
            diagonalAngle = 0;
          let tempAngle = 0;
          let dir1 = 0,
            dir2 = 0;
          for (let i = 0; i < nFurthest.length; i++) {
            for (let j = 0; j < nFurthest.length; j++) {
              dir1 = this.sub(pos, nFurthest[j]);
              dir2 = this.sub(pos, nFurthest[i]);
              tempAngle = vec3.angle(dir1, dir2);
              if (
                i != j &&
                tempAngle > (5.0 * Math.PI) / 6.0 &&
                tempAngle < (5.0 * Math.PI) / 4.0 &&
                diagonalAngle < tempAngle
              ) {
                diagonal = [nFurthest[i], nFurthest[j]];
                diagonalInd = [i, j];
                diagonalAngle = tempAngle;
                break;
              }
            }
          }

          let anotherCoord = 0;
          for (let i = 0; i < nFurthest.length; i++) {
            if (i != diagonalInd[0] && i != diagonalInd[1]) {
              anotherCoord = nFurthest[i];
            }
          }

          this.generateTriAndRect(
            diagonal[0],
            diagonal[1],
            anotherCoord,
            false,
            this.centerOfMass([diagonal[0], diagonal[1]]),
          );

          if (DEBUG) {
            this.debugDrawPoints(diagonal, 0, [0, 0, 0, 1]);
            this.debugDrawPoints([pos], 0, [1, 1, 1, 1]);
            this.debugDrawPath(_thisPath, [1, 1, 1, 1]);
          }
        } else if (this.state.currentAction === 'del') {
          // this.saveImage();

          let selected = canvas.selectionTest(_thisPath);
          console.log('***selection test: ' + selected);
          let selectedInd = -1;

          if (selected !== -1) {
            for (let i = 0; i < canvas.renderList.length; i++) {
              if (canvas.renderList[i].uid === selected) {
                selectedInd = i;
                break;
              }
            }

            let list1 = canvas.renderList.slice(0, selectedInd);
            let list2 = canvas.renderList.slice(
              selectedInd + 1,
              canvas.renderList.length,
            );
            canvas.renderList = list1.concat(list2);
            // this.updateFrame();
          }
        } else if (this.state.currentAction === 'fre') {
          this.debugDrawPath(_thisPath, this.state.currentColor);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        // TODO this would share the same probably methods as previous one
        this.setState({isHandUp: true});
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  getDir(from, to) {
    let dir = this.sub(to, from);

    // if dir.x > 0 -> right
    // if dir.x < 0 -> left
    // if dir.y > 0 -> up
    // if dir.y < 0 -> down
    let left = -1,
      right = -1,
      up = -1,
      down = -1;
    if (dir[0] > 0) {
      right = Math.abs(dir[0]);
    } else {
      left = Math.abs(dir[0]);
    }

    if (dir[1] > 0) {
      up = Math.abs(dir[1]);
    } else {
      down = Math.abs(dir[1]);
    }
    return [left, right, up, down];
  }

  extremeFromCenter(path, com) {
    // relative to the center
    let bottomRight = [...com],
      bottomLeft = [...com],
      topLeft = [...com],
      topRight = [...com];

    for (let i = 0; i < path.length; i++) {
      // top left
      if (path[i][0] < com[0] && path[i][1] > com[1]) {
        if (path[i][0] < topLeft[0] && path[i][1] > topLeft[1]) {
          topLeft = path[i];
        }
      }
      // top right
      if (path[i][0] > com[0] && path[i][1] > com[1]) {
        if (path[i][0] > topRight[0] && path[i][1] > topRight[1]) {
          topRight = path[i];
        }
      }
      // bottom left
      if (path[i][0] < com[0] && path[i][1] < com[1]) {
        if (path[i][0] < bottomLeft[0] && path[i][1] < bottomLeft[0]) {
          bottomLeft = path[i];
        }
      }
      // bottom right
      if (path[i][0] > com[0] && path[i][1] < com[1]) {
        if (path[i][0] > bottomRight[0] && path[i][1] < bottomRight[0]) {
          bottomRight = path[i];
        }
      }
    }

    return [topLeft, topRight, bottomLeft, bottomRight];
  }

  // merge the two closest coordinates
  mergeTwo(coords) {
    let minDist = 100000;
    let minPoints = [];

    for (let i = 0; i < coords.length; i++) {
      for (let j = 0; j < coords.length; j++) {
        if (i != j && this.calcDist(coords[i], coords[j]) < minDist) {
          minPoints = [i, j];
          minDist = this.calcDist(coords[i], coords[j]);
        }
      }
    }

    let newPoint = [
      (coords[minPoints[0]][0] + coords[minPoints[1]][0]) / 2.0,
      (coords[minPoints[0]][1] + coords[minPoints[1]][1]) / 2.0,
      coords[minPoints[0]][2],
    ];

    let newCoords = [];
    newCoords.push(newPoint);
    for (let i = 0; i < coords.length; i++) {
      if (i != minPoints[0] && i != minPoints[1]) {
        newCoords.push(coords[i]);
      }
    }
    return newCoords;
  }

  sub(p1, p2) {
    return [p1[0] - p2[0], p1[1] - p2[1], p1[2]];
  }

  validPoints(com, coords) {
    let topRight = false,
      topLeft = false,
      bottomLeft = false,
      bottomRight = false;

    for (let i = 0; i < coords.length; i++) {
      if (coords[i][0] >= com[0] && coords[i][1] >= com[1]) {
        topRight = true;
      }
      if (coords[i][0] <= com[0] && coords[i][1] >= com[1]) {
        topLeft = true;
      }

      if (coords[i][0] >= com[0] && coords[i][1] <= com[1]) {
        bottomRight = true;
      }
      if (coords[i][0] <= com[0] && coords[i][1] <= com[1]) {
        bottomLeft = true;
      }
    }

    return topRight && topLeft && bottomRight && bottomLeft;
  }

  findAccurateCenter(path) {
    let pos = this.centerOfMass(path); // center of all points
    let nFurthest = this.nFurthestFromCenter(path, pos, path.length / 2); // the furthest half of the points
    // Assume that about half the points are bias since there may be overlap in drawing
    let pos2 = this.centerOfMass(nFurthest); // get the center of mass of the bias
    pos = [
      (pos[0] + pos2[0]) / 2.0,
      (pos[1] + pos2[1]) / 2.0,
      (pos[2] + pos2[2]) / 2.0,
    ];

    return [nFurthest, pos];
  }

  debugDrawPath(path, color) {
    for (let i = 1; i < path.length; i++) {
      this.createShape(
        'line',
        [path[i - 1], path[i]],
        0,
        vec3.fromValues(1, 1, 1),
        color,
      );
    }
  }

  debugDrawPoints(points, angle, color) {
    for (let i = 0; i < points.length; i++) {
      this.createShape(
        'circle',
        vec3.fromValues(points[i][0], points[i][1], -5),
        angle,
        vec3.fromValues(5, 5, 1),
        color,
      );
    }
  }

  createShape(shape, pos, angle, scale, color) {
    if (shape !== 'line') {
      canvas.renderList.push(
        canvas.createShape(
          shape, //shape type name, must match with defined name //TODO possible name 'rect', 'tri','circle'
          pos, //shape center should be vec3
          angle, //shape angle
          scale, //shape scale should be vec3
          color, //shape color r, g, b, a with range in 0 - 1
          this.state.fill, //set to true if fill the shape,
          [0.0, 0.0, 0.0], //only work for line actual point pos otherwise just ommit those two
          [200.0, -200.0, 0.0], //only work for line actual point pos
        ),
      );
    } else {
      canvas.renderList.push(
        canvas.createShape(
          'line', //shape type name, must match with defined name //TODO possible name 'rect', 'tri','circle'
          vec3.fromValues(0, 0, -5), //shape center should be vec3
          angle, //shape angle
          scale, //shape scale should be vec3
          color, //shape color r, g, b, a with range in 0 - 1
          true, //set to true if fill the shape,
          pos[0], //only work for line actual point pos otherwise just ommit those two
          pos[1], //only work for line actual point pos
        ),
      );
    }
  }

  // The coordinates of the path that hit the bounding box.
  boundingCoords(path) {
    let maxX = [-1000000, 0, -5],
      maxY = [0, -1000000, -5],
      minX = [1000000, 0, -5],
      minY = [0, 1000000, -5];

    for (let i = 0; i < path.length; i++) {
      if (path[i][0] > maxX[0]) {
        maxX = path[i];
      }
      if (path[i][0] < minX[0]) {
        minX = path[i];
      }

      if (path[i][1] >= maxY[1]) {
        maxY = path[i];
      }
      if (path[i][1] < minY[1]) {
        minY = path[i];
      }
    }

    return [minX, minY, maxX, maxY];
  }

  regression(path) {}

  nFurthestFromCenter(path, com, n) {
    let nPoints = []; // Format [[x1, y1, z1, dist1], [x2, y2, z2, dist2], ... ]

    for (let i = 0; i < path.length; i++) {
      if (nPoints.length < n) {
        nPoints.push([
          path[i][0],
          path[i][1],
          path[i][2],
          this.calcDist(path[i], com),
        ]);
      } else {
        // First, get the smallest value
        let tempDist = this.calcDist(path[i], com);
        let smallestInd = this.findIndSmallest(nPoints);

        if (nPoints[smallestInd][3] < tempDist) {
          nPoints[smallestInd] = [path[i][0], path[i][1], path[i][2], tempDist];
        }
      }
    }

    return nPoints;
  }

  // excepts data like [ [x1, y1, z1, dist]... ]
  findIndSmallest(list) {
    let ind = 0;

    for (let i = 0; i < list.length; i++) {
      if (list[i][3] < list[ind][3] && i !== ind) {
        ind = i;
      }
    }

    return ind;
  }

  calcDist(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  }

  avgDistFromCenter(path, com) {
    let avgDist = 0.0;

    for (let i = 0; i < path.length; i++) {
      avgDist += this.calcDist(path[i], com);
    }

    return avgDist / path.length;
  }

  centerOfMass(path) {
    let x = 0.0,
      y = 0.0;

    for (let i = 0; i < path.length; i++) {
      x += path[i][0];
      y += path[i][1];
    }

    x /= path.length;
    y /= path.length;
    let com = vec3.fromValues(x, y, -5);
    return com;
  }

  componentDidMount() {}

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    if (
      prevState.hand_X !== this.state.hand_X ||
      prevState.hand_Y !== this.state.hand_Y || //hand moved
      (!prevState.isHandUp && this.state.isHandUp) //end of the action
    ) {
      // this.forceUpdate();
      // console.log('updating');
      // const now = Date.now();
      // const diff = now - this.lastRendered;
      // this.lastRendered = now;
      // const timeout = diff >= 16 ? 0 : 16 - diff;
      // setTimeout(() => {
      //   this.forceUpdate();
      //   console.log('updating');
      // }, timeout);
    }
    // console.log('hello');
    // const now = Date.now();
    // const diff = now - this.lastRendered;
    // this.lastRendered = now;
    // const timeout = diff >= 16 ? 0 : 16 - diff;
    // setTimeout(() => {
    //   this.forceUpdate();
    //   console.log('updating');
    // }, timeout);
  }

  checkPointIsLeft(start, end, target) {
    // (x1-x3)*(y2-y3)-(y1-y3)*(x2-x3)
    return (
      (start[0] - target[0]) * (end[1] - target[1]) -
      (start[1] - target[1]) * (end[0] - target[0])
    );
  }

  calcuateTan(start, end) {
    const diff = vec3.create();
    vec3.subtract(diff, end, start);
    return Math.atan2(diff[1], diff[0]);
  }

  //TODO
  // ext_1 [x, y, z]
  // ext_2 [x, y, z]
  // ext_3 [x, y, z]---used to determine angle
  // isTri bool
  // center [x, y, z]
  // return shapeConfig
  generateTriAndRect(left, right, top, isTri, center) {
    let start = null;
    let end = null;
    let topPoint = vec3.fromValues(top[0], top[1], 0);
    let angle = 0;
    let scale = [1, 1, 1];
    if (left[0] === right[0]) {
      start =
        left[1] > right[1]
          ? vec3.fromValues(right[0], right[1], 0)
          : vec3.fromValues(left[0], left[1], 0);
      end =
        left[1] > right[1]
          ? vec3.fromValues(left[0], left[1], 0)
          : vec3.fromValues(right[0], right[1], 0);
    } else {
      if (left[0] < right[0]) {
        start = vec3.fromValues(left[0], left[1], 0);
        end = vec3.fromValues(right[0], right[1], 0);
      } else {
        start = vec3.fromValues(right[0], right[1], 0);
        end = vec3.fromValues(left[0], left[1], 0);
      }
    }

    const centerPoint = vec3.fromValues(center[0], center[1], 0);
    const middlePoint = vec3.create();
    vec3.add(middlePoint, end, start);
    vec3.set(middlePoint, middlePoint[0] / 2, middlePoint[1] / 2, 0);
    if (isTri) {
      angle =
        this.calcuateTan(start, end) +
        (this.checkPointIsLeft(start, end, topPoint) < 0 ? Math.PI : 0);
      scale[0] = vec3.distance(start, end) / 2;
      scale[1] = vec3.distance(middlePoint, topPoint) / 2;
    }
    if (!isTri) {
      const edgeA = vec3.distance(top, start);
      const edgeB = vec3.distance(top, end);
      const length = edgeA >= edgeB ? edgeA : edgeB;
      const new_width = edgeA >= edgeB ? edgeB : edgeA;
      const rawAngle = Math.atan(new_width / length);
      const directionTest = this.checkPointIsLeft(start, end, topPoint) > 0;

      if (directionTest && new_width === edgeA) {
        angle = rawAngle;
      } else if (!directionTest && new_width === edgeB) {
        angle = rawAngle;
      } else if (directionTest && new_width === edgeB) {
        angle = -rawAngle;
      } else {
        angle = -rawAngle;
      }

      //   if (new_width === edgeA) {
      //     angle = this.calcuateTan(start, top) > 0 ? rawAngle : -rawAngle;
      //   } else {
      //     angle = this.calcuateTan(end, top) < 0 ? rawAngle : -rawAngle;
      //   }
      angle = this.calcuateTan(start, end) - angle;
      scale[0] = length / 2;
      scale[1] = new_width / 2;
    }
    this.createShape(
      isTri ? 'tri' : 'rect',
      center,
      angle,
      scale,
      this.state.currentColor,
    );

    //correct the left right
  }

  saveImage() {
    const _option = {
      rect: {
        x: 0,
        y: 0,
        width: canvas.gl.drawingBufferWidth,
        height: canvas.gl.drawingBufferHeight,
      },
    };
    GLView.takeSnapshotAsync(canvas.gl, _option).then((result) =>
      canvas.exportImage(result.uri),
    );
  }

  updateFrame() {
    const now = Date.now();
    const diff = now - this.lastRendered;
    this.lastRendered = now;
    const timeout = diff >= 16 ? 0 : 16 - diff;
    setTimeout(() => {
      canvas.draw();
    }, timeout);
  }

  onContextCreate(gl) {
    console.log('init');
    console.log(width);
    canvas.onContextCreate(
      gl,
      width,
      (height * drawFlex) / (drawFlex + buttonFlex),
    );
    // gl.enable(gl.SCISSOR_TEST);
    // gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 1, 1, 1);
    //Example for add a shape

    canvas.draw();

    // gl.flush();
    // gl.endFrameEXP();

    // console.warn('### end of the frame###');
  }

  setActivityActionColor(name) {
    console.log(name);
    if (this.state.currentAction === name) {
      return '#999999';
    }
    return '#555555';
  }

  setColorBorderColor(name, activeColor, disableColor) {
    return name === this.state.colorName ? activeColor : disableColor;
  }

  render() {
    return (
      // <View style={{flex: 1}}>
      //   <Animated.View
      //
      //   <GLView
      //     style={{width: 300, height: 500}}
      //     onContextCreate={this.onContextCreate}
      //   />
      //   {...this.panResponder.panHandlers}
      //
      // </View>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'column',
          },
        ]}>
        <View style={[styles.drawContainer, {}]}>
          <GLView
            style={{
              width: width,
              height: (height * drawFlex) / (drawFlex + buttonFlex),
            }}
            onContextCreate={this.onContextCreate}
            {...this.panResponder.panHandlers}
          />
          <Text>
            {canvas
              .convertCoord(this.state.hand_X, this.state.hand_Y)
              .toString()}
          </Text>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              flexDirection: 'column-reverse',
              flex: 1,
            },
          ]}>
          <View
            style={[
              styles.buttonContainer,
              {
                flexDirection: 'row',
              },
            ]}>
            <Button
              onPress={() => this.onPressShape('fre')}
              title="Freehand"
              color={this.setActivityActionColor('fre')}
              accessibilityLabel="freehand"
            />
            <Button
              onPress={() => this.onPressShape('tri')}
              title="Triangle"
              color={this.setActivityActionColor('tri')}
              accessibilityLabel="tri"
            />
            <Button
              onPress={() => this.onPressShape('line')}
              title="Line"
              color={this.setActivityActionColor('line')}
              accessibilityLabel="line"
            />
            <Button
              onPress={() => this.onPressShape('rect')}
              title="Rectangle"
              color={this.setActivityActionColor('rect')}
              accessibilityLabel="rect"
            />
            <Button
              onPress={() => this.onPressShape('circle')}
              title="Circle"
              color={this.setActivityActionColor('circle')}
              accessibilityLabel="circle"
            />
            <Button
              onPress={() => this.onPressShape('clr')}
              title="Clear"
              color={this.setActivityActionColor('clr')}
              accessibilityLabel="clr"
            />
            <Button
              onPress={() => this.onPressShape('del')}
              title="Delete"
              color={this.setActivityActionColor('del')}
              accessibilityLabel="del"
            />
            <Button
              onPress={() => this.onPressFill()}
              title="Fill"
              color={this.state.fill ? '#999999' : '#555555'}
              accessibilityLabel="fill"
            />
            <Button
              onPress={() => this.saveImage()}
              title="SAVE"
              color="#555555"
              accessibilityLabel="fill"
            />
          </View>
          <View
            style={[
              styles.buttonContainer,
              {
                flexDirection: 'row',
              },
            ]}>
            <Button
              onPress={() => this.onPressColor([0.13, 1, 0.13, 1], 'green')}
              title="Green"
              color={this.setColorBorderColor('green', '#8ee088', '#22FF22')}
              accessibilityLabel="green"
            />
            <Button
              onPress={() => this.onPressColor([0.13, 0.13, 1, 1], 'blue')}
              title="Blue"
              color={this.setColorBorderColor('blue', '#b7c0f6', '#2222FF')}
              accessibilityLabel="blue"
            />
            <Button
              onPress={() => this.onPressColor([1, 0.13, 0.13, 1], 'red')}
              title="Red"
              color={this.setColorBorderColor('red', '#eca3a3', '#FF2222')}
              accessibilityLabel="red"
            />
            <Button
              onPress={() => this.onPressColor([0.98, 0.95, 0.63, 1], 'yellow')}
              title="Yellow"
              color={this.setColorBorderColor('yellow', '#FCF4A3', '#D8B863')}
              accessibilityLabel="yellow"
            />
            <Button
              onPress={() => this.onPressColor([1, 1, 1, 1], 'white')}
              title="White"
              color={this.setColorBorderColor('white', '#EEEEEE', '#DDDDDD')}
              accessibilityLabel="white"
              borderColor={this.setColorBorderColor('white')}
            />
            <Button
              onPress={() => this.onPressColor([0, 0, 0, 1], 'black')}
              title="Black"
              color={this.setColorBorderColor('black', '#444444', '#000')}
              accessibilityLabel="black"
            />
            <Button
              onPress={() => this.onPressColor([0.46, 0.46, 0.46, 1], 'gray')}
              title="Gray"
              color={this.setColorBorderColor('gray', '#777', '#555')}
              accessibilityLabel="gray"
            />
            <Button
              onPress={() => this.onPressColor([0.53, 0.06, 0.53, 1], 'purple')}
              title="Purple"
              color={this.setColorBorderColor('purple', '#9f75db', '#881188')}
              accessibilityLabel="purple"
            />
          </View>
        </View>
      </View>
    );
  }

  onPressColor(newColor, name) {
    this.setState({...this.state, currentColor: newColor, colorName: name});
    canvas.rawPathInstance.color = newColor;
  }

  onPressShape(shape) {
    if (shape === 'clr') {
      canvas.renderList = [];
      this.updateFrame();
    } else {
      this.setState({...this.state, currentAction: shape});
    }
  }

  // toggle it
  onPressFill() {
    this.setState({...this.state, fill: !this.state.fill});
  }
}
