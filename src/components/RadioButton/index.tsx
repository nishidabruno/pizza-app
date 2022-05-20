import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Radio,
  Selected,
  Title,
  RadioButtonContainerProps,
} from './styles';

type RadioButtonProps = RectButtonProps & RadioButtonContainerProps & {
  title: string;
}

export function RadioButton({ title, selected = false, ...rest }: RadioButtonProps) {
  return (
    <Container selected={selected} {...rest}>
      <Radio>
        {selected && <Selected />}
      </Radio>

      <Title>{title}</Title>
    </Container>
  );
}
