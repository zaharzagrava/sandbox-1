import React from 'react';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css, ThemeProvider } from 'styled-components/native';

import { getCLientMyselfData } from '../store/selectors';
import { ProfileScreenNavigationProp } from '../types';
import { theme } from '../themes/themes';

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const StyledButton = styled.Text`
  background-color: whitesmoke;
`;

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
    // <ThemeProvider theme={theme}>
    <View>
      <Text>Hello from login</Text>
      <Text>{JSON.stringify(clients, undefined, 2)}</Text>
      <StyledButton></StyledButton>
      <Button
        title="go to storybook"
        onPress={() => {
          navigation.navigate('/storybook');
        }}
      />
    </View>
    // </ThemeProvider>
  );
};
