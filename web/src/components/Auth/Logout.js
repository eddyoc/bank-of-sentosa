import { Component } from 'react';
import { removeAuthToken } from 'tools';

class Logout extends Component {
  componentDidMount() {
    const { history } = this.props;
    removeAuthToken();
    history.push('/');
  }

  render() {
    return null;
  }
}

export { Logout };
