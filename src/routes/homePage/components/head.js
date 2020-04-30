import React from 'react';
import { withRouter } from 'dva/router';
// import PropTypes from 'prop-types';
// import { encode } from 'base64-utf8';
import { Menu, Icon } from 'antd';
import systemsConfig from 'config/systems.config';
import { convertJsonToKeys } from 'utils/permissionTree';
// import logo from 'assets/images/logo-blue.png';
// import avatar from 'assets/images/avatar.jpg';
import { IEVersion } from 'utils/tools';
import {
  getUserSession,
  saveUserSession,
} from 'utils/session';

import styleIE from './headIE.less';
import styleOther from './head.less';

let style = {};

if (IEVersion() === 9) {
  console.log(IEVersion());
  style = styleIE;
} else {
  style = styleOther;
}

const formatUrl = (url) => {
  return /^http/.test(url) ? url : `http://${url}`;
};


class App extends React.Component {
  state = {
    showModal: false,
  }
  setSystemKey = (key) => {
    const { changeSystemKey } = this.props;
    changeSystemKey(key);
  }
  componentDidMount() {
    const arrSection = this.section.querySelectorAll('section');
    for (let i = 0; i < arrSection.length; i += 1) {
      arrSection[i].addEventListener('mouseenter', () => {
        for (let n = 0; n < arrSection.length; n += 1) {
          if (i === n) {
            arrSection[n].setAttribute('style', 'opacity:1;transition: opacity 0.5s;box-shadow:0px 5px 10px rgba(136,136,136,0.8)');
          } else {
            arrSection[n].setAttribute('style', 'opacity:0.6;transition: opacity 0.5s;box-shadow:0px 2px 2px 0px rgba(10,23,42,0.16);');
          }
        }
      });
      arrSection[i].addEventListener('mouseleave', () => {
        for (let n = 0; n < arrSection.length; n += 1) {
          arrSection[n].setAttribute('style', 'opacity:1;transition: opacity 1s;box-shadow:0px 2px 2px 0px rgba(10,23,42,0.16);');
        }
      });
    }
    arrSection.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        arrSection.forEach((it, j) => {
          if (index === j) {
            it.setAttribute('style', 'opacity:1;transition: opacity 0.5s;box-shadow:0px 5px 10px rgba(136,136,136,0.8)');
          } else {
            it.setAttribute('style', 'opacity:0.6;transition: opacity 0.5s;box-shadow:0px 2px 2px 0px rgba(10,23,42,0.16);');
          }
        });
      });
      item.addEventListener('mouseleave', () => {
        arrSection.forEach((it) => {
          it.setAttribute('style', 'opacity:1;transition: opacity 1s;box-shadow:0px 2px 2px 0px rgba(10,23,42,0.16);');
        });
      });
    });
  }
  static propTypes = {
    // always: PropTypes.bool,
    // bell: PropTypes.oneOfType([
    //   PropTypes.bool,
    //   PropTypes.shape({
    //     count: PropTypes.number.isRequired,
    //     onClick: PropTypes.func,
    //   }),
    // ]),
    // message: PropTypes.oneOfType([
    //   PropTypes.bool,
    //   PropTypes.shape({
    //     count: PropTypes.number.isRequired,
    //     onClick: PropTypes.func,
    //   }),
    // ]),
  };

  static defaultProps = {
    // always: false,
    // bell: false,
    // message: false,
  };

  state = {
    auth: getUserSession(),
  }

  showModal = (e) => {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  hiddenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showModal: false,
    });
  }

  handleEnterSystem = (e, id) => {
    const session = getUserSession();
    if (id) {
      const it = session.project.filter(item => item.id === id);
      const permissions = convertJsonToKeys(it[0].auth_menu);
      const newSession = {
        ...session,
        permissions,
        projectId: id,
      };
      saveUserSession(newSession);
      window.location.href = window.location.origin;
    } else {
      this.props.history.push('/home');
    }
  }

  handleClickUserMenu = () => {
    // logout();
  }

  userPlan = (
    <Menu className={style.dropDownMenu} onClick={(e) => { this.handleClickUserMenu(e); }}>
      <Menu.Item key="name">
        <p className={style.userName}>{this.state.auth.user.username}</p>
        <p className={style.userIphone}>{this.state.auth.user.mobile}</p>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="set">
        <span className="icon-set" /><span style={{ paddingLeft: 20 }}>设置</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <span className="icon-loginout" /><span style={{ paddingLeft: 20 }}>退出</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    const { auth } = this.state;
    // const proiectObj = auth.systems.filter(item => item.project_name === projectName)[0] || {};
    // const {
    //   always,
    //   // bell, message
    // } = this.props;
    // const systemsListHide = always ? false : this.state.systemsListHide;
    return (<section className={style.managament}>
      <section className={style.showheader}>
        <section className={style.headLeft} >
          <div className={style.showlogo} />
          <div className={style.showDropDown}>
            <p>
              <span className={style.showmenus}>请选择</span>
              <Icon type="appstore" />
            </p>
            {/* <Dropdown overlay={this.menu} trigger="click" >
            <span className={style.menus}>{switchName(this.state.systemKey)}</span>
          </Dropdown> */}
          </div>
        </section>
        {/* <section className={style.headRight} onClick={this.handleClickUserMenu}>
        退出<Icon type="logout" />
        </section> */}
      </section>
      <section className={style.managamentContainer} >
        <div ref={section => this.section = section} className={style.hoverSection}>
          {auth.project.map((it, index) => {
            const system = systemsConfig.ERP;
            if (systemsConfig.ERP && index === 0) {
              return (<section key={index} >
                <a href={formatUrl(it.project_host)} onClick={(e) => { this.showModal(e, system.title); }}>
                  <img alt={system.title || ''} src={system.icon} />
                  <span>{system.title || ''}</span>
                </a>
              </section>);
            }
            return null;
          })}
        </div>
      </section>
      <section className={style.coverModal} style={{ display: this.state.showModal ? 'block' : 'none' }}>
        <section className={style.coverModalBg} onClick={this.hiddenModal} />
        <section className={style.coverModalContent}>
          <div className={style.deleteItem} onClick={this.hiddenModal}><Icon type="close" /></div>
          {auth.project && auth.project.map((item) => {
            return <div className={style.listItem} onClick={e => this.handleEnterSystem(e, item.id)}>{item.name}</div>;
          })}
          {/* <div className={style.listItem} onClick={() => this.handleEnterSystem}>自由里</div>
          <div className={style.listItem}>日子里</div> */}
        </section>
      </section>
    </section>);
  }
}


export default withRouter(App);
