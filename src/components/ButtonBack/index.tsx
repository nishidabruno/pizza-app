import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';


import { Container } from './styles';

export function ButtonBack({ ...rest }: BorderlessButtonProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={18}
        color={COLORS.TITLE}
      />
    </Container>
  );
}
