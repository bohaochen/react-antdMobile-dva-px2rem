import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';





class CommonLayout extends React.PureComponent {
  state = {

  };
  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }


  render() {
    const { routes } = this.props.system;

    return (
      <div id="common-page" className="">
          <div id="common-header" >
            header
          </div>
          <div id="content">
          {this.props.children}
          </div>
            <div style={{ textAlign: 'center' }}>
              footer
            </div>
      </div>
    );
  }
}

export default connect(({ system }) => ({
  system: system.toJS(),
}))(withRouter(CommonLayout));
