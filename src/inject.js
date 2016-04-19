/*
 * mill - inject.js
 * Copyright(c) 2016 xeodou <xeodou@gmail.com>
 * MIT Licensed
 */

'use strict';

// Inject the components with themes
import React, {
  Component
}
from 'react';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
export default function injectIntl(WrappedComponent, theme) {

  class Inject extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
         <WrappedComponent {...this.props} theme={theme}/>
      );
    }
  }

  Inject.displayName = `Inject(${getDisplayName(WrappedComponent)})`;

  Inject.WrappedComponent = WrappedComponent;

  return Inject;
}
