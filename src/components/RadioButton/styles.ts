import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export type RadioButtonContainerProps = {
  selected: boolean;
  children?: React.ReactNode;
}

export const Container = styled(RectButton) <RadioButtonContainerProps>`
  width: 104px;
  height: 82px;
  border-radius: 8px;
  padding: 14px 16px;

  ${({ theme, selected }) => css`
    border: 1px solid ${selected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
    background-color: ${selected ? theme.COLORS.SUCCESS_50 : theme.COLORS.TITLE};
  `}
`;

export const Title = styled.Text`
  font-size: 16px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Radio = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_900};
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;
