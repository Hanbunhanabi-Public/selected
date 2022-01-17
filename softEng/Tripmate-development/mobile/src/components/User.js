import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {fetchUser} from '../../src/actions/fetchUser';
import {connect} from 'react-redux';

export class User extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return !this.props.loading
      ? this.props.user.map(user => <Text key={user._id}>{user.username}</Text>)
      : null;
  }
}

User.propTypes = {
  fetchUser: PropTypes.func,
  user: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
