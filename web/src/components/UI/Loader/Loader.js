import React, { Component, Fragment } from 'react';
import LoadingAnimation from './LoadingAnimation';

class Loader extends Component {
  state = { showError: false };

  render() {
    const { showError } = this.state;
    return (
      <Fragment>
        <LoadingAnimation />
        {showError && (
          <p>If loading takes too long, please refresh the page...</p>
        )}
      </Fragment>
    );
  }

  componentDidMount() {
    // Start timeout to show the error message
    this.errorTimeout = setTimeout(() => this.setState({ showError: true }), 5000);
  }

  componentWillUnmount() {
    // Remove the timeout when component will be unmounted
    // Otherwise it will still be working in background
    clearTimeout(this.errorTimeout);
  }
}

export { Loader };