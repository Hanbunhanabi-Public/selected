import React, {Component} from 'react';
import styles from '../styles/Style';
import ConnectedTripCollection from '../components/Trip/TripCollection';
import {View, Text, Button} from 'native-base';
import ConnectedLogin from '../components/Login';
import ConnectedSignup from '../components/SignUp';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/fetchUser';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logedIn: false,
      loginModalVisible: false,
      signupModalVisible: false,
    };
  }

  handleFetchUser(token) {
    this.props.fetchUser(token);
  }

  setLoginModalVisible(visible) {
    this.setState({loginModalVisible: visible});
  }
  setSignupModalVisible(visible) {
    this.setState({signupModalVisible: visible});
  }
  setLogedIn(logedIn) {
    this.setState({logedIn: logedIn});
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.loginLoading !== this.props.loginLoading &&
      this.props.token.token
    ) {
      this.handleFetchUser(this.props.token.token);
    }
  }
  render() {
    return this.state.logedIn &&
      this.props.token.token &&
      this.props.user._id ? (
      <View>
        <ConnectedTripCollection
          user={this.props.user}
          logout={() => this.setLogedIn(false)}
        />
      </View>
    ) : (
      <View>
        <Text style={styles.text_style}>Welcome to Tripmate!</Text>

        <View style={styles.placeholder}>
          <View>
            <Button
              onPress={() => {
                this.setLoginModalVisible(true);
              }}>
              <Text>Login</Text>
            </Button>
          </View>

          <View>
            <Button
              onPress={() => {
                this.setSignupModalVisible(true);
              }}>
              <Text>Sign Up</Text>
            </Button>
          </View>
        </View>
        <ConnectedLogin
          visible={this.state.loginModalVisible}
          cancelFunc={() =>
            this.setLoginModalVisible(!this.state.loginModalVisible)
          }
          loginFunc={() => this.setLogedIn(!this.state.logedIn)}
        />
        <ConnectedSignup
          visible={this.state.signupModalVisible}
          cancelFunc={() => this.setSignupModalVisible(false)}
        />
      </View>
    );
  }
}

Home.propTypes = {
  token: PropTypes.object,
  loginLoading: PropTypes.bool,
  loginError: PropTypes.string,
  user: PropTypes.object,
  fetchLoading: PropTypes.bool,
  fetchError: PropTypes.string,
  fetchUser: PropTypes.func,
};

const mapStateToProps = state => ({
  token: state.user.loginUser.token,
  loginLoading: state.user.loginUser.loginLoading,
  loginError: state.user.loginUser.loginError,

  user: state.user.getUser.user,
  fetchLoading: state.user.getUser.loading,
  fetchError: state.user.getUser.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: token => dispatch(fetchUser(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
