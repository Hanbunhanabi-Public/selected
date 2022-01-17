import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Style';

import {Text, Button, Input, Form, Item, View, Label} from 'native-base';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {loginUser} from '../actions/loginUser';

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLoginUser(email, password) {
    this.props.loginUser(email, password);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.loginLoading !== this.props.loginLoading &&
      this.props.token.token
    ) {
      this.props.cancelFunc();
      this.props.loginFunc();
    }
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.extraSmallModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Log In</Text>
        </View>
        <Form>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              onChangeText={textEntry => {
                this.email = textEntry;
              }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              onChangeText={textEntry => {
                this.password = textEntry;
              }}
            />
          </Item>
        </Form>
        <View style={styles.modalButtonView}>
          <Button small transparent onPress={this.props.cancelFunc}>
            <Text style={styles.deleteButton}>
              {'  '}BACK{'  '}
            </Text>
          </Button>
          <Button
            small
            onPress={() => {
              this.handleLoginUser(this.email, this.password);
            }}>
            <Text style={styles.buttonWithWhiteText}>
              {'    '}CONFIRM{'    '}
            </Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

Login.propTypes = {
  visible: PropTypes.bool,
  loginFunc: PropTypes.func,
  cancelFunc: PropTypes.func,
  dispatch: PropTypes.func,
  loginUser: PropTypes.func,
  token: PropTypes.object,
  loginLoading: PropTypes.bool,
  loginError: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.user.loginUser.token,
  loginLoading: state.user.loginUser.loginLoading,
  loginError: state.user.loginUser.loginError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
