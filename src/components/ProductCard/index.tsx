import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Content,
  IdentificationContainer,
  Description,
  Details,
  Image,
  Line,
  Name,
} from './styles';

export type ProductData = {
  id: string;
  photo_url: string;
  pizza_name: string;
  description: string;
}

type ProductCardProps = RectButtonProps & {
  data: ProductData;
}

export function ProductCard({ data, ...rest }: ProductCardProps) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <IdentificationContainer>
            <Name>{data.pizza_name}</Name>
            <Feather name="chevron-right" color={COLORS.SHAPE} size={18} />
          </IdentificationContainer>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
}
