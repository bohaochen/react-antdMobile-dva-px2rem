import Immutable from 'immutable';

const immutableState = Immutable.fromJS({
  data: null
});

export default {
  namespace: 'homePage',

  state: immutableState,

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == "/homePage") {
          dispatch({
            type: 'save',
            payload: {
              data: "12345"
            },
          });
        }

      });
    },
  },

  reducers: {

    save(state, action) {
      return state.merge(action.payload);
    },
  },

};
