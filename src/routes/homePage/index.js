import React from 'react';
import { connect } from 'dva';
import "./index.less"

class App extends React.PureComponent {

  render = () => {

    return <div  className="homePage">
      hello word！
    </div>;
  }
}

export default connect(({  system }) => ({
  system: system.toJS(),
}))(App);
