import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.main};
`;

export default function Button({ onPress, children }) {
  return <StyledButton onPress={onPress}>{children}</StyledButton>;
}

Button.defaultProps = {
  children: null,
  onPress: () => {}
};

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func
};
