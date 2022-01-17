import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Style';

import {Item, Text, Button, Form, Input, View, Label} from 'native-base';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {createUser} from '../actions/createUser';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreateUser(name, email, password) {
    this.props.createUser(name, email, password);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.createLoading !== this.props.createLoading &&
      this.props.token.token
    ) {
      this.props.cancelFunc();
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
          <Text style={styles.modalHeader}>Sign Up</Text>
        </View>
        <Form>
          <Item stackedLabel>
            <Label>User Name</Label>
            <Input
              onChangeText={nameEntry => {
                this.name = nameEntry;
              }}
            />
          </Item>
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
              this.handleCreateUser(this.name, this.email, this.password);
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

SignUp.propTypes = {
  visible: PropTypes.bool,
  cancelFunc: PropTypes.func,
  dispatch: PropTypes.func,
  token: PropTypes.object,
  createLoading: PropTypes.bool,
  createError: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.user.createUser.token,
  createLoading: state.user.createUser.createLoading,
  createError: state.user.createUser.createError,
});

const mapDispatchToProps = dispatch => ({
  createUser: (name, email, password) =>
    dispatch(createUser(name, email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
