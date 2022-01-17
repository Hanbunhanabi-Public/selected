import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {
  View,
  Button,
  Dimensions,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Draggable from 'react-native-draggable';
import testConfig from './testSetting.json';
import RNFS from 'react-native-fs';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

export default class FittTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trial: 0,
      isTestStart: false,
      currentTest: null,
      loading: true,
      currentFinger: 'Thumb',
      isTestBegin: false,
      isTestFinish: false,
    };
    this.testRecord = {tests: [], finger: 'N/A'};
    this.rawTests = [];
    this.innerTime = 0;
  }

  // rawTests = [];

  componentDidMount() {
    this.generateTests();
    // this.advanceToNextTest();
    this.setState({
      ...this.state,
      loading: false,
    });
  }

  componentDidUpdate(prevProps, prevStates) {
    if (
      prevStates.isTestStart &&
      !this.state.isTestStart &&
      this.state.isTestBegin
    ) {
      this.advanceToNextTest();
    }
  }

  generateTests() {
    console.log(height + ' ' + width);
    let counter = 0;
    let trialCounter = testConfig.numTrials;

    while (trialCounter > 0) {
      trialCounter = trialCounter - 1;

      for (let A in testConfig.A) {
        for (let W in testConfig.W) {
          // test that the amplitude + the radii is greater than the height, this will NEVER be valid
          if (
            testConfig.A[A] +
              testConfig.W[W] / 2 +
              testConfig.start.radius / 2 >=
            height - StatusBar.currentHeight
          ) {
            console.log(
              'A of (' +
                testConfig.A[A] +
                ') will not work on screen size (' +
                height +
                ') and target widths (' +
                testConfig.W[W] +
                ')',
            );
            // Else if the radii are greater than the amplitude, they will overlap, also invalid
          } else if (
            testConfig.A[A] + 1 <
            testConfig.W[W] / 2 + testConfig.start.radius / 2
          ) {
            console.log(
              'A of (' +
                testConfig.A[A] +
                ') will overlap with targets of size (' +
                testConfig.W[W] +
                ')',
            );
          } else {
            // otherwise we assume that the trial will be valid
            counter = counter + 1;
            let start = {
              x: 0,
              y: 0,
              r: testConfig.start.radius,
              A: testConfig.A[A],
            };
            let end = {x: 0, y: 0, r: testConfig.W[W]};
            start = this.generateStart(start, end);
            end = this.generateEnd(start, end);

            console.log(
              ' A: ' +
                testConfig.A[A] +
                ' dist: ' +
                Math.sqrt(
                  Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
                ),
            );

            this.rawTests.push({start, end, a: testConfig.A[A]});
          }
        }
      }
    }

    //shuffle test
    console.log('# Tirals created: ' + counter);
    this.rawTests.sort(() => Math.random() - 0.5);
  }

  generateEnd(start, end) {
    let validEnd = false;

    while (!validEnd) {
      let randAngle = Math.random() * (Math.PI * 2);
      end.x = start.x + start.A * Math.cos(randAngle);
      end.y = start.y + start.A * Math.sin(randAngle);

      // test that it is on the screen
      if (
        end.x + end.r < width &&
        end.x - end.r > 0 &&
        end.y - end.r > 0 &&
        end.y + end.r < height - StatusBar.currentHeight
      ) {
        validEnd = true;
        console.log('Valid end found');
      }
    }
    return end;
  }

  generateStart(start, end) {
    let validStart = false;
    while (!validStart) {
      start.x = Math.random() * (width - start.r);
      start.y = Math.random() * (height - StatusBar.currentHeight - start.r);

      // subtract the diameter of start to add a margin or error
      if (
        Math.max(height - start.y, start.y) >
        start.A + start.r / 2 + end.r / 2
      ) {
        // first check that this is a valid starting point given the amplitude
        console.log('Valid start found');
        validStart = true; // the starting point is valid since it is within the min dist
      }
    }
    return start;
  }

  advanceToNextTest() {
    if (this.rawTests.length > 0) {
      this.setState({
        ...this.state,
        currentTest: this.rawTests[0],
        isTestBegin: true,
        isTestFinish: false,
        trial: this.state.trial + 1,
      });
      this.rawTests.splice(0, 1);
    } else {
      this.setState({
        ...this.state,
        currentTest: null,
        isTestFinish: true,
      });
    }
  }

  onPickerChange(itemValue, itemIndex) {
    if (this.state.currentFinger !== itemValue) {
      this.setState({
        ...this.state,
        currentFinger: itemValue,
      });
    }
  }

  onTestStart() {
    // this.advanceToNextTest();
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: width,
            height: 50,
          }}
        />
        <View
          style={{
            height: 50,
            width: width,
            alignItems: 'center',
            backgroundColor: 'skyblue',
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
            }}>
            {'Fitt Law Test'}
          </Text>
        </View>
        <View style={{width: 50, height: 50}} />
        <View
          style={{
            width: '90%',
            height: 50,
            backgroundColor: 'steelblue',
          }}>
          <Picker
            selectedValue={this.state.currentFinger}
            style={{height: 50, width: '90%', alignItems: 'center'}}
            onValueChange={(itemValue, itemIndex) =>
              this.onPickerChange(itemValue, itemIndex)
            }>
            <Picker.Item label="Thumb" value="Thumb" />
            <Picker.Item label="Index Finger" value="Index Finger" />
          </Picker>
        </View>
        <View style={{width: 50, height: 50}} />

        <View style={{width: '90%', height: 100}}>
          <Button
            onPress={() => {
              this.onEnterEvent();
            }}
            title="START"
            color="#841584"
            accessibilityLabel="START"
          />
        </View>
      </View>
    );
  }

  onTestEnd() {
    return (
      // <View contentInsetAdjustmentBehavior="automatic">
      //   <Text>{'test ended'}</Text>
      // </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: width,
            height: 50,
          }}
        />
        <View
          style={{
            height: 50,
            width: width,
            alignItems: 'center',
            backgroundColor: 'skyblue',
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
            }}>
            {'test ended'}
          </Text>
        </View>
        <View style={{width: 50, height: 50}} />

        <View style={{width: '90%', height: 100}}>
          <Button
            onPress={() => {
              this.onExitEvent();
            }}
            title="SAVE and EXIT"
            color="#841584"
            accessibilityLabel="SAVE and EXIT"
          />
        </View>
      </View>
    );
  }

  async externalStorePermission() {
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
        this.exportResult();
      } else {
        console.log('external file system denied');
      }
    } catch (err) {
      console.warn(err);
    }
    this.setState({
      trial: 0,
      isTestStart: false,
      currentTest: null,
      loading: false,
      currentFinger: 'Thumb',
      isTestBegin: false,
      isTestFinish: false,
    });
    this.testRecord = {tests: [], finger: 'N/A'};
    this.rawTests = [];
    this.innerTime = 0;
    this.generateTests();
  }

  exportResult() {
    let tempDate = new Date();
    let path =
      RNFS.DownloadDirectoryPath + '/' + tempDate.toString() + '_output.json';
    path = path.replace(/:/g, '_');
    console.log(path);
    // write the file
    this.testRecord.finger = this.state.currentFinger;
    RNFS.writeFile(path, JSON.stringify(this.testRecord), 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
        Toast.show({
          text1: 'Export successful!',
          text2: 'Write to: ' + path,
        });
      })
      .catch((err) => {
        console.log(err.message);
        Toast.show({
          type: 'error',
          text1: 'Export fail! ',
          text2: err.message,
        });
      });
  }

  onEnterEvent() {
    this.advanceToNextTest();
    // this.setState({
    //   ...this.state,
    //   isTestBegin: true,
    // });
  }

  onExitEvent() {
    this.externalStorePermission();
  }

  onStartPress() {
    if (!this.state.isTestStart) {
      console.log('test start, trial:' + this.state.trial.toString());
      this.innerTime = Date.now();

      this.setState({
        ...this.state,
        isTestStart: true,
      });
    } else {
      console.log('test already start');
    }
  }

  onEndPress() {
    if (this.state.isTestStart) {
      let targetTest = Object.assign({}, this.state.currentTest);
      let endTime = Date.now() - this.innerTime;
      targetTest.timeInterval = endTime;
      targetTest.succss = true;
      this.testRecord.tests.push(targetTest);
      console.log('test end with time' + endTime.toString());
      this.innerTime = 0;
      this.setState({
        ...this.state,
        isTestStart: false,
      });
    } else {
      console.log('test is not start');
    }
  }

  onErrorEndPress() {
    if (this.state.isTestStart) {
      let targetTest = Object.assign({}, this.state.currentTest);
      let endTime = Date.now() - this.innerTime;
      targetTest.timeInterval = endTime;
      targetTest.succss = false;
      this.testRecord.tests.push(targetTest);

      let currTest = this.state.currentTest;
      currTest.start = this.generateStart(
        this.state.currentTest.start,
        this.state.currentTest.end,
      );
      currTest.end = this.generateEnd(
        this.state.currentTest.start,
        this.state.currentTest.end,
      );

      this.setState({
        ...this.state,
        currentTest: currTest,
      });
      this.rawTests.push(this.state.currentTest);
      console.log('test fail end with time' + endTime.toString());
      this.innerTime = 0;
      this.setState({
        ...this.state,
        isTestStart: false,
      });
    } else {
      console.log('test is not start');
    }
  }

  renderLogic() {
    // return this.onTestEnd();
    // return this.onTestStart();
    if (!this.state.isTestBegin) {
      return this.onTestStart();
    } else if (this.state.isTestFinish) {
      return this.onTestEnd();
    } else {
      // return this.renderCircles();
      return this.renderTest();
    }
  }

  renderTest() {
    return (
      <View>
        <TouchableOpacity
          style={{width: width, height: height, backgroundColor: 'darkorange'}}
          onPress={() => this.onErrorEndPress()}>
          {this.renderCircles()}
        </TouchableOpacity>
      </View>
    );
  }

  renderCircles() {
    return this.state.currentTest !== null ? (
      <View>
        <Draggable
          isCircle
          renderColor={this.state.isTestStart ? 'gray' : 'green'}
          renderSize={this.state.currentTest.start.r}
          x={this.state.currentTest.start.x}
          y={this.state.currentTest.start.y}
          minX={this.state.currentTest.start.x}
          maxX={this.state.currentTest.start.x}
          minY={this.state.currentTest.start.y}
          maxY={this.state.currentTest.start.y}
          onPressIn={() => {
            this.onStartPress();
          }}
          renderText="START"
        />
        <Draggable
          isCircle
          renderColor="red"
          renderSize={this.state.currentTest.end.r}
          x={this.state.currentTest.end.x}
          y={this.state.currentTest.end.y}
          minX={this.state.currentTest.end.x}
          maxX={this.state.currentTest.end.x}
          minY={this.state.currentTest.end.y}
          maxY={this.state.currentTest.end.y}
          onPressIn={() => {
            this.onEndPress();
          }}
          renderText="END"
        />
      </View>
    ) : null;
  }

  render() {
    return !this.state.loading ? <View>{this.renderLogic()}</View> : null;
  }
}
