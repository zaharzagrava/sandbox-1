// Action Types
export const ClientActionTypes = {
  GET_CLIENT_REQUEST: 'GET_CLIENT_REQUEST',
  GET_CLIENT_SUCCESS: 'GET_CLIENT_SUCCESS',
  GET_CLIENT_FAILURE: 'GET_CLIENT_FAILURE'
};

// Inittial State
const InitialState = {
  client: {}
};

// Reducer
export const ClientReducer = function (state = InitialState, action: any) {
  switch (action.type) {
    case ClientActionTypes.GET_CLIENT_SUCCESS:
      return action.payload.client;
    default:
      return state;
  }
};

// Action Creators
export const ClientActionCreators = {
  clientLoaded: function (client: any) {
    return {
      type: ClientActionTypes.GET_CLIENT_SUCCESS,
      payload: client
    };
  }
};
