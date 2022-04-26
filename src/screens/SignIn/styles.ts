import styled, { css } from 'styled-components/native';
import type { AnyStyledComponent } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';

// Temporary fix (Issue with @types/styled-components-react-native ?)
const StyledLinearGradient = LinearGradient as unknown as AnyStyledComponent;

export const Container = styled(StyledLinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
  start: { x: 0, y: 1 },
  end: { x: 0.5, y: 0.5 }
}))`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 24px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: 340px;
  margin-top: 64px;
  margin-bottom: 32px;
  justify-content: center;
  width: 100%;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
  font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `};
`;
