import React          from 'react';
import { withRouter } from 'react-router-dom';
import { connect }    from 'react-redux';

import BaseRoutes     from '../routing/BaseRoutes.js';

import './Base.css';

class Base extends React.Component {
  render() {
    return (
      <div className="container">
        <BaseRoutes location={this.props.location} />
      </div>
    );
  }
}

export default withRouter(connect()(Base));
