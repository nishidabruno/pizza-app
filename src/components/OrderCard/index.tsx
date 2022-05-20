import { OrderResponse } from '@src/@types/pizzaResponse';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  ContainerButton,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
} from './styles';

type OrderCardProps = RectButtonProps & {
  index: number;
  data: OrderResponse;
}

export function OrderCard({ index, data, ...rest }: OrderCardProps) {
  return (
    <Container index={index}>
      <ContainerButton  {...rest}>
        <Image source={{ uri: data.image_url }} />
        <Name>{data.pizza_name}</Name>

        <Description>
          Table {data.table_number} · Qnt: {data.quantity}
        </Description>

        <StatusContainer status={data.status}>
          <StatusLabel status={data.status}>
            {data.status}
          </StatusLabel>
        </StatusContainer>
      </ContainerButton >
    </Container >
  );
}
