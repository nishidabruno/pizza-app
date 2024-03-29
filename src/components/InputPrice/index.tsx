import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Input, Label, Size } from './styles';

type InputPriceProps = TextInputProps & {
  size: string;
}

export function InputPrice({ size, ...rest }: InputPriceProps) {
  return (
    <Container>
      <Size>
        <Label>{size}</Label>
      </Size>

      <Label>$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Container>
  );
}
