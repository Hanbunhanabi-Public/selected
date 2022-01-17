import React, {Component, useCallback, useRef} from 'react';
import {Overlay} from 'react-native-elements';
// import {StyleSheet, View, Text, Button} from 'react-native';
// import {Overlay} from'react-native-elements'
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {
  View,
  PanResponder,
  Dimensions,
  StatusBar,
  Animated,
  StyleSheet,
  Text,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {GLView} from 'expo-gl';
import canvas from './Canvas';
import {mat4, vec3} from 'gl-matrix';
import circleManager from './CircleManager';

import log from 'gl-react/lib/helpers/log';
import TouchableOpacity from '@gorhom/bottom-sheet';

const {width, height} = Dimensions.get('window');
const window_size = Dimensions.get('window');
const screen_size = Dimensions.get('screen');
const status_bar_size = StatusBar.statusBarHeight || 24;
const navi_size =
  screen_size.height !== window_size.height
    ? screen_size.height - window_size.height - status_bar_size
    : 0;

const DEBUG = false;

const drawFlex = 12;
const buttonFlex = 1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  drawContainer: {
    flex: drawFlex,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: buttonFlex,
    padding: 0,
    justifyContent: 'space-around',
    // backgroundColor: '#669966',
  },

  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.lastRendered = 0;
    this.startTime = 0;
    // console.warn('start');
    // this.current_test_result = 0;
    // this.is_experiment_start = false;
    circleManager.initialize(
      width,
      (height * drawFlex) / (drawFlex + buttonFlex) -
        navi_size -
        status_bar_size,
    );
    //
    // circleManager.new_start();
    //
    // circleManager.set_up_circle_frame();

    //
    // for (let i = 0; i < canvas.renderList.length; i++) {
    //   console.log('renderList', JSON.stringify(canvas.renderList[i]));
    // }

    this.state = {
      is_experiment_start: false,
      is_test_set_start: false,
      active_circles: [],
      current_experiment_mode: 'Normal',
      current_input_method: 'click',
      ring_radius: 0,
      experiment_stage: 0,
      current_test_result: 0,
      hand_X: 0,
      hand_Y: 0,
      dx: 0,
      dy: 0,
      is_full_screen: true,

      isHandUp: true,
    };
    this.renderQuered = false;
    // this.sheetRef = useRef < BottomSheet > null;
    // this.snapPoints = null;
    // this.pan = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderStart: (evt, gestureState) => {
        const new_input_coord = canvas.convertCoord(
          evt.nativeEvent.locationX,
          evt.nativeEvent.locationY,
        );

        canvas.currentPath.push(
          // canvas.convertCoord(
          //   evt.nativeEvent.locationX,
          //   evt.nativeEvent.locationY,
          // ),
          new_input_coord,
        );
        this.setState({
          ...this.state,
          dx: gestureState.dx,
          dy: gestureState.dy,
          hand_X: new_input_coord[0],
          hand_Y: new_input_coord[1],
          isHandUp: false,
        });

        // console.log(
        //   'currentPath click',
        //   canvas.currentPath[canvas.currentPath.length - 1],
        // );
      },

      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const new_input_coord = canvas.convertCoord(
          evt.nativeEvent.locationX,
          evt.nativeEvent.locationY,
        );

        canvas.currentPath.push(new_input_coord);

        this.handleRing(
          new_input_coord[0],
          new_input_coord[1],
          gestureState.dx,
          gestureState.dy,
        );

        const active_circles_index = this.generateSearchList();
        circleManager.update_circles(
          this.state.active_circles,
          active_circles_index,
        );

        this.setState({
          ...this.state,
          dx: gestureState.dx,
          dy: gestureState.dy,
          hand_X: new_input_coord[0],
          hand_Y: new_input_coord[1],
          isHandUp: false,
          active_circles: active_circles_index,
        });
        console.log('update frame, ', 'onPanResponderMove');
        // this.updateFrame(false);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        //TODO add if current action is delete shape, add detect shape here, and remove the shape from renderList
        // for other cases add convert path to shape path method here and push to renderList and clear currentPath
        const _thisPath = [...canvas.currentPath];
        // console.log('click');
        canvas.currentPath = [];
        console.log(
          canvas.singleSelectTest(
            _thisPath[_thisPath.length - 1][0],
            _thisPath[_thisPath.length - 1][1],
          ),
        );

        this.handleRelease(
          this.state.hand_X,
          this.state.hand_Y,
          this.state.dx,
          this.state.dy,
        );
        console.log('update frame, ', 'onPanResponderRelease');
        this.updateFrame(true);
        // TODO put his back in
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        // TODO this would share the same probably methods as previous one
        // console.log('click');
        this.setState({isHandUp: true});
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  calcDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  componentDidMount() {}

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    if (prevState.is_experiment_start && !this.state.is_experiment_start) {
      this.onPressSave();
    }
    if (this.state.experiment_stage !== 1) {
      this.updateFrame(true);
    }
    // if (
    //   prevState.hand_X !== this.state.hand_X ||
    //   prevState.hand_Y !== this.state.hand_Y || //hand moved
    //   (!prevState.isHandUp && this.state.isHandUp) //end of the action
    // ) {
    // }
  }

  is_touch(dx, dy) {
    return this.calculate_distance(dx, dy) < 5;
  }

  calculate_distance(dx, dy) {
    return Math.sqrt(dy * dy + dx * dx);
  }

  handleRing(x, y, dx, dy) {
    if (
      this.state.current_experiment_mode === 'Testing' &&
      this.state.is_test_set_start
    ) {
      if (this.state.experiment_stage === 0 && !this.is_touch(dx, dy)) {
        if (circleManager.selection_ring === null) {
          circleManager.set_selection_ring(x, y);
        } else {
          const radius =
            this.calculate_distance(
              canvas.currentPath[0][0] - x,
              canvas.currentPath[0][1] - y,
            ) * 3;
          circleManager.update_selection_ring(radius);
        }
      }
    }
  }

  handleRelease(x, y, dx, dy) {
    if (this.state.is_experiment_start) {
      if (this.state.is_test_set_start) {
        if (this.state.current_experiment_mode === 'Normal') {
          const result = this.record_test_result(x, y);
          // console.warn('in normal: ', result);
          this.setState({
            ...this.state,
            is_experiment_start: circleManager.set_up_circle_frame(),
            current_test_result: result ? 1 : -1,
            is_test_set_start: false,
            active_circles: [],
          });
          // this.updateFrame();
        } else {
          if (this.state.experiment_stage === 0) {
            //direct touch
            if (this.is_touch(dx, dy)) {
              const result = this.record_test_result(x, y);
              this.setState({
                ...this.state,
                is_experiment_start: circleManager.set_up_circle_frame(),
                current_test_result: result ? 1 : -1,
                is_test_set_start: false,
                active_circles: [],
              });
              // this.updateFrame(true);
            } else {
              // console.warn('second stage');
              //move to next frame
              this.setState({
                ...this.state,
                experiment_stage: 1,
                is_test_set_start: false,
              });
              // this.updateFrame();
            }
          }
        }
      } else {
        if (circleManager.test_start_circle(x, y)) {
          this.startTime = Date.now();
          this.setState({...this.state, is_test_set_start: true});
        }
      }
    }
  }

  // saveImage() {
  //   const _option = {
  //     rect: {
  //       x: 0,
  //       y: 0,
  //       width: canvas.gl.drawingBufferWidth,
  //       height: canvas.gl.drawingBufferHeight,
  //     },
  //   };
  //   GLView.takeSnapshotAsync(canvas.gl, _option).then((result) =>
  //     canvas.exportImage(result.uri),
  //   );
  // }

  onPressColor(newColor, name) {
    this.setState({...this.state, currentColor: newColor, colorName: name});
    canvas.rawPathInstance.color = newColor;
  }

  onPressStartNewTest() {
    circleManager.new_start();
    circleManager.set_up_circle_frame();
    canvas.shapeIDAssign = 0;
    // canvas.renderList = [];
    this.setState({
      ...this.state,
      is_experiment_start: true,
      experiment_stage: 0,
      current_test_result: 0,
      active_circles: [],
      is_test_set_start: false,
    });
    console.log('update frame, ', 'onPressStartNewTest');
    this.updateFrame(true);
  }

  onPressAbort() {
    if (this.state.is_experiment_start) {
      circleManager.record_result({
        success: false,
        time: 0,
        isAbort: true,
      });
      this.setState({
        ...this.state,
        experiment_stage: 0,
        current_test_result: -1,
        is_experiment_start: circleManager.set_up_circle_frame(),
        is_test_set_start: false,
        active_circles: [],
      });
      this.updateFrame(true);
    } else {
      console.warn('you must start a test first');
    }
  }

  showCurrentStatus() {
    return (
      circleManager.current_test_index + '/' + circleManager.test_sets.length
    );
  }

  record_test_result(x, y) {
    // console.log('test result: ', canvas.singleSelectTest(x, y));
    if (canvas.singleSelectTest(x, y) === 0) {
      circleManager.record_result({
        success: true,
        time: Date.now() - this.startTime,
        isAbort: false,
      });
      return true;
    } else {
      circleManager.record_result({
        success: false,
        time: Date.now() - this.startTime,
        isAbort: false,
      });
      return false;
    }
  }

  onPressAction(current_action) {
    if (this.state.current_experiment_mode !== current_action) {
      canvas.renderList = [];

      this.setState({
        ...this.state,
        current_experiment_mode: current_action,
        is_experiment_start: false,
        is_test_set_start: false,
      });
      this.updateFrame(true);
    }
  }

  generateSearchList() {
    if (
      this.state.current_experiment_mode === 'Testing' &&
      this.state.experiment_stage === 0 &&
      circleManager.selection_ring !== null
    ) {
      return circleManager.search_circles(
        circleManager.selection_ring.pos,
        circleManager.selection_ring.scale[0],
      );
    } else {
      return [];
    }
  }

  generateSecondStageList() {
    let index_list = circleManager.search_circles(
      circleManager.selection_ring.pos,
      circleManager.selection_ring.scale[0],
    );
    index_list.sort((a, b) => {
      if (canvas.renderList[a].pos[1] < canvas.renderList[b].pos[1]) {
        return 1;
      } else if (canvas.renderList[a].pos[1] > canvas.renderList[b].pos[1]) {
        return -1;
      } else {
        if (canvas.renderList[a].pos[0] < canvas.renderList[b].pos[0]) {
          return -1;
        } else if (canvas.renderList[a].pos[0] > canvas.renderList[b].pos[0]) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    console.log('sorted index:', index_list);
    return index_list;
  }

  onPressSave() {
    for (let i = 0; i < circleManager.test_result.length; i++) {
      console.log(circleManager.test_result[i]);
    }
    this.saveResult(circleManager.test_result);
  }

  render_selection_ring() {
    if (circleManager.selection_ring !== null) {
      canvas.drawRing(circleManager.selection_ring);
    }
  }

  updateFrame(update_back_buffer) {
    const now = Date.now();
    const diff = now - this.lastRendered;
    this.lastRendered = now;
    const timeout = diff >= 16 ? 0 : 16 - diff;
    // if (!this.renderQuered) {
    //   this.renderQuered = true;
    //   setTimeout(() => {
    //     canvas.draw(true, update_back_buffer);
    //     canvas.draw(false, false);
    //     this.render_selection_ring();
    //
    //     // gl.flush();
    //     // gl.endFrameEXP();
    //     console.log('call from update');
    //     canvas.endFrame();
    //     this.renderQuered = false;
    //   }, timeout);
    canvas.draw(true, update_back_buffer);
    canvas.draw(false, false);
    this.render_selection_ring();
    console.log(
      'current status',
      this.state.is_experiment_start,
      this.state.is_test_set_start,
    );
    if (this.state.is_experiment_start && !this.state.is_test_set_start) {
      canvas.drawRing(circleManager.start_circle, true);
    }
    // gl.flush();
    // gl.endFrameEXP();
    console.log('call from update');
    canvas.endFrame();
    // }
  }

  onContextCreate(gl) {
    console.log('init');
    console.log(width);

    console.log('height', (height * drawFlex) / (drawFlex + buttonFlex));

    canvas.onContextCreate(
      gl,
      width,
      (height * drawFlex) / (drawFlex + buttonFlex) -
        navi_size -
        status_bar_size,
    );

    gl.clearColor(0.2, 0.2, 0.2, 1);
    //Example for add a shape

    canvas.draw(true, true);
    canvas.draw(false, false);
    if (circleManager.start_circle !== null && canvas.renderList.length !== 0) {
      canvas.drawRing(circleManager.start_circle, true);
    }
    console.log('call from on create');
    canvas.endFrame();

    // console.warn('### end of the frame###');
  }

  setActivityActionColor(name) {
    // console.log(name);
    if (this.state.current_experiment_mode === name) {
      return '#c83dd2';
    }
    return '#601365';
  }

  setScreenModeColor() {
    // console.log(name);
    if (this.state.is_full_screen) {
      return '#deac33';
    }
    return '#5a4a0e';
  }

  onScreenModeChange() {
    this.setState({...this.state, is_full_screen: !this.state.is_full_screen});
  }

  setPreviousTestColor() {
    if (!this.state.is_test_set_start) {
      if (this.state.current_test_result === 1) {
        return '#669966';
      } else if (this.state.current_test_result === 0) {
        return '#787777';
      } else {
        return '#ba6f6f';
      }
    } else {
      return '#668d99';
    }
    // '#ba6f6f'
  }

  selectionMiss() {
    circleManager.record_result({
      success: false,
      time: Date.now() - this.startTime,
      isAbort: false,
    });

    // circleManager.record_result({success: false});
    this.setState({
      ...this.state,
      experiment_stage: 0,
      current_test_result: -1,
      is_experiment_start: circleManager.set_up_circle_frame(),
      is_test_set_start: false,
    });
    this.updateFrame(true);
  }

  selectButton(id, uid) {
    circleManager.record_result({
      success: uid === 0,
      time: Date.now() - this.startTime,
      isAbort: false,
    });

    // circleManager.record_result({success: false});
    this.setState({
      ...this.state,
      experiment_stage: 0,
      current_test_result: uid === 0 ? 1 : -1,
      is_experiment_start: circleManager.set_up_circle_frame(),
      is_test_set_start: false,
      active_circles: [],
    });
    this.updateFrame(true);

    console.log('button', id, uid, uid === 0, ' selected');
  }

  prepareItem(index_list) {
    console.log('prepare item');
    const item_list = [];
    for (let i = 0; i < index_list.length; i++) {
      item_list.push({
        background:
          canvas.renderList[index_list[i]].color[0] === 1
            ? '#ff0000'
            : '#444444',
        id: i,
        uid: index_list[i],
        sid: i.toString(),
      });
    }
    // console.warn('items', item_list);
    return item_list;
  }

  renderItem(item) {
    console.log('selection item', item);
    return (
      <View style={styles.itemContainer}>
        <Button
          onPress={() => this.selectButton(item.id, item.uid)}
          title={item.sid}
          color={item.background}
          accessibilityLabel={'selected_' + item.id.toString()}
        />
      </View>
    );
  }

  renderSelectedList(data) {
    // hooks
    console.log('render selection list', data);

    return (
      <View style={styles.drawContainer}>
        <BottomSheet
          ref={this.props.sheetRef}
          snapPoints={this.props.snapPoints}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={(i) => i.sid}
            renderItem={({item}) => this.renderItem(item)}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheet>
      </View>
    );
  }

  renderCanvas() {
    return (
      <View style={[styles.drawContainer, {}]}>
        <GLView
          style={{
            width: width,
            height:
              (height * drawFlex) / (drawFlex + buttonFlex) -
              navi_size -
              status_bar_size,
          }}
          onContextCreate={this.onContextCreate}
          {...this.panResponder.panHandlers}
        />
      </View>
    );
  }

  renderSwitch() {
    // console.log(
    //   'switch to canvas',
    //   this.state.current_experiment_mode,
    //   this.state.experiment_stage,
    // );
    if (
      this.state.current_experiment_mode !== 'Testing' ||
      (this.state.current_experiment_mode === 'Testing' &&
        this.state.experiment_stage !== 1)
    ) {
      // console.log('switch to canvas');
      return this.renderCanvas();
    } else {
      // console.log('switch to selection list');
      const selected_list = this.generateSecondStageList();
      if (selected_list.length !== 0) {
        const _selected_list = this.prepareItem(selected_list);
        // console.log('after selection list ')
        const __selected_list = this.renderSelectedList(_selected_list);
        console.log('after selection list ');
        return __selected_list;
      } else {
        this.selectionMiss();
        return this.renderCanvas();
      }
    }
  }

  renderMenu() {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            flexDirection: 'row',
            // backgroundColor: '#669966',
            backgroundColor: this.setPreviousTestColor(),
          },
        ]}>
        <Button
          onPress={() => this.onPressAbort()}
          title="Abort"
          color={'#a12323'}
          accessibilityLabel="Abort"
        />

        <Button
          onPress={() => this.onPressStartNewTest()}
          title="New"
          color={'#058235'}
          accessibilityLabel="New"
        />

        <Button
          onPress={() => this.onScreenModeChange()}
          title="full"
          color={this.setScreenModeColor()}
          accessibilityLabel="full"
        />

        <Text>{this.showCurrentStatus()}</Text>

        <Button
          onPress={() => this.onPressAction('Normal')}
          title="Normal"
          color={this.setActivityActionColor('Normal')}
          accessibilityLabel="Normal"
        />

        <Button
          onPress={() => this.onPressAction('Testing')}
          title="Testing"
          color={this.setActivityActionColor('Testing')}
          accessibilityLabel="Normal"
        />

        <Button
          onPress={() => this.onPressSave()}
          title="save"
          color={'#3c5ea5'}
          accessibilityLabel="save"
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: 'column',
            backgroundColor: '#333333',
          },
        ]}>
        <View
          style={[
            styles.buttonContainer,
            {
              flexDirection: 'column-reverse',
              flex: 1,
            },
          ]}>
          {this.renderMenu()}
          {/*{this.renderPattle()}*/}
        </View>

        {/*{this.renderCanvas()}*/}
        {this.renderSwitch()}
        {/*{this.renderSelectedList([{id: 0, background: '#FF0000'}])}*/}
      </View>
    );
  }

  // // toggle it
  // onPressFill() {
  //   this.setState({...this.state, fill: !this.state.fill});
  // }
  async saveResult(result) {
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
        this.exportResult(result);
      } else {
        console.log('external file system denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  exportResult(result) {
    let tempDate = new Date();
    let path =
      RNFS.DownloadDirectoryPath + '/' + tempDate.toString() + '_output.json';
    path = path.replace(/:/g, '_');
    console.log(path);
    // write the file
    const saveFile = {
      result: result,
      mode: this.state.current_experiment_mode,
      is_full_screen: this.state.is_full_screen,
    };
    console.log('saved file', JSON.stringify(saveFile, null, 2));

    RNFS.writeFile(path, JSON.stringify(saveFile), 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
        console.log({
          text1: 'Export successful!',
          text2: 'Write to: ' + path,
        });
        Toast.show({
          text1: 'Export successful!',
          text2: 'Write to: ' + path,
        });
      })
      .catch((err) => {
        console.log(err.message);
        console.log({
          type: 'error',
          text1: 'Export fail! ',
          text2: err.message,
        });
        Toast.show({
          type: 'error',
          text1: 'Export fail! ',
          text2: err.message,
        });
      });
  }
}
