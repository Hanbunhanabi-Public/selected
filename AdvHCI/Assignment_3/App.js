/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Bugsnag from '@bugsnag/react-native';
import React, {useRef, useMemo} from 'react';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';
import Test from './src/compoment/Painter/test';

const App: () => React$Node = () => {
  const snapPoints = useMemo(() => ['50%'], []);
  const sheetRef = useRef<BottomSheet>(null);
  const ErrorBoundary = Bugsnag.getPlugin('react');
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorView}>
        <StatusBar barStyle="dark-content" />
        {/*<SafeAreaProvider>*/}
        {/*<SafeAreaView>*/}
        <Test snapPoints={snapPoints} sheetRef={sheetRef} />
        {/*<Example_2 />*/}
        {/*</SafeAreaView>*/}
        {/*</SafeAreaProvider>*/}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ErrorBoundary>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

// const ErrorBoundary = Bugsnag.getPlugin('react');

// export default () => (
//   <ErrorBoundary FallbackComponent={ErrorView}>
//     <App />
//   </ErrorBoundary>
// );

class ErrorView extends React.Component {
  // This component will be displayed when an error boundary catches an error
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
