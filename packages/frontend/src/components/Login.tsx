import React from 'react';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getCLientMyselfData } from '../store/selectors';
import { ProfileScreenNavigationProp } from '../types';

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const Login = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const clients = useSelector(getCLientMyselfData);

  useEffect(() => {
    dispatch({
      type: 'GET_CLIENT_MYSELF',
      payload: {
        getClientMyself: { id: 'e53548d1-d7f9-4cf5-a15d-8819709270dc' },
        requestInfo: { status: 'processing' }
      }
    });
  }, []);

  return (
    <View>
      <Text>Hello from login</Text>
      <Text>{JSON.stringify(clients, undefined, 2)}</Text>
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate('/register');
        }}
      />
    </View>
  );
};
