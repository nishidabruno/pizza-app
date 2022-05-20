import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { ReactNode } from 'react';

type ContainerProps = {
  index: number;
  children: ReactNode;
}

export type StatusTypeProps = 'Pending' | 'Done' | 'Delivered';

type StatusProps = {
  status: StatusTypeProps;
}

export const Container = styled.View<ContainerProps>`
  width: 50%;

  ${({ theme, index }) => css`
  border-right-width: ${index % 2 > 0 ? 0 : 1}px;
  border-right-color: ${theme.COLORS.SHAPE};
  `}
`;

export const ContainerButton = styled(RectButton)`
  width: 100%;
  align-items: center;
  padding: 24px;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 21px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 11px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
  `}
`;

export const StatusContainer = styled.View<StatusProps>`
  padding: 4px 16px;
  border-radius: 12px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  ${({ theme, status }) => status === 'Pending' && css`
    background-color: ${theme.COLORS.ALERT_50};
    border: 1px solid ${theme.COLORS.ALERT_900};
  `}

  ${({ theme, status }) => status === 'Done' && css`
    background-color: ${theme.COLORS.SUCCESS_900};
  `}

  ${({ theme, status }) => status === 'Delivered' && css`
    background-color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;

  ${({ theme, status }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${status === 'Pending' ? theme.COLORS.ALERT_900 : theme.COLORS.TITLE};
  `}
`;
