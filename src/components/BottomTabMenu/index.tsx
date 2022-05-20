import React from 'react';

import {
  Container,
  Notification,
  Quantity,
  Title,
} from './styles';

type BottonTabMenuProps = {
  title: string;
  color: string;
  notifications?: string;
}

export function BottomTabMenu({ color, title, notifications }: BottonTabMenuProps) {
  const noNotification = notifications === '0';

  return (
    <Container>
      <Title color={color}>{title}</Title>
      {notifications && (
        <Notification noNotifications={noNotification}>
          <Quantity noNotifications={noNotification}>
            {notifications}
          </Quantity>
        </Notification>
      )}
    </Container>
  );
}
