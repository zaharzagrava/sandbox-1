import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ClientReducer } from './src/store/client';
import { RequestReducer } from './src/store/request';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/components/Login';
import { Register } from './src/components/Register';
import requestSaga from './src/store/sagas';

// --- Setting up Redux & Redux Dev Tools
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    clients: ClientReducer,
    requests: RequestReducer
  }),
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(function* () {
  yield all([requestSaga()]);
});

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        linking={{
          prefixes: [],
          config: {
            screens: {
              '/login': '/login',
              '/register': '/register'
            }
          }
        }}
        fallback={<Text>Loading...</Text>}
      >
        <Stack.Navigator initialRouteName="/login">
          <Stack.Screen name="/login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="/register" component={Register} options={{ title: 'Register', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
