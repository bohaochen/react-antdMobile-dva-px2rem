import Immutable from 'immutable';
import pathToRegexp from 'path-to-regexp';
import { parseSearch } from '@utils/tools';

const immutableState = Immutable.fromJS({
  pathname: '/', // 当前页面pathname
  query: {}, // 当前页面url查询参数
  routes: [], // 当前页面路由信息
  params: {}, // 当前路由params
  permits: {}, // 权限列表
  pageLoading: false, // 页面是否正在加载
  projectShow: false, // 是否显示项目切换界面
  pageInfo: null, // 当前页面信息
});

export default {
  namespace: 'system',

  state: immutableState,

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        const query = parseSearch(search);
        dispatch({
          type: 'save',
          payload: {
            pathname,
            query,
          },
        });
      });
    },
  },

  reducers: {
    // 注入权限
    injectPermits(state, action) {
      const { permits } = action.payload;
      return state.merge({ permits });
    },

    // 清空授权
    clearPermits(state) {
      return state.merge({ permits: {} });
    },

    // 更新路由信息
    updateRoutes(state, action) {
      const pathname = state.get('pathname');
      const current = action.payload[action.payload.length - 1];
      const keys = [];
      const match = pathToRegexp(current.path, keys).exec(pathname);
      const params = {};
      keys.forEach((key, i) => {
        params[key.name] = match[i + 1];
      });
      // 处理path中的params
      const routes = action.payload.map((it) => {
        let { path } = it;
        Object.keys(params).forEach((key) => {
          path = path.replace(`:${key}`, params[key]);
        });
        return { ...it, path };
      });
      return state.merge({ routes, params });
    },

    // 更新页面加载状态
    updatePageLoading(state, action) {
      return state.merge({ pageLoading: action.payload });
    },

    save(state, action) {
      return state.merge(action.payload);
    },
  },

};
