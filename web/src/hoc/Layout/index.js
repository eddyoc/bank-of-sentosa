import React, { Component } from 'react';

class Layout extends Component {
   render() {
      // return <main className="app container">{this.props.children}</main>;
      return <main className="app">{this.props.children}</main>;
   }
}

export default Layout;
