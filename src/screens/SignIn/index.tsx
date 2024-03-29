import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/auth';

import {
  Brand,
  Container,
  Content,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  Title
} from './styles';

import brandImg from '@assets/brand.png';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, forgotPassword, isLoggingIn } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>

          <Brand source={brandImg} />
          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Password"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Forgot your password?</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Login"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLoggingIn}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
