import React, { useState } from 'react';
import { Platform } from 'react-native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  Label,
  MaxCharacters,
  InputGroupHeader
} from './styles';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function Product() {
  const [image, setImage] = useState('');

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Register</Title>

          <BorderlessButton>
            <DeleteLabel>Delete</DeleteLabel>
          </BorderlessButton>
        </Header>

        <Upload>
          <Photo uri={image} />
          <PickImageButton
            title="Load"
            type="secondary"
            onPress={handleImagePicker}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Name</Label>
            <Input />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Description</Label>
              <MaxCharacters>0 of 60 characters</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
            />
          </InputGroup>

          <InputGroup>
            <Label>Sizes and prices</Label>

            <InputPrice size="S" />
            <InputPrice size="M" />
            <InputPrice size="L" />
          </InputGroup>

          <Button title="Register pizza" />
        </Form>
      </ScrollView>
    </Container>
  );
}
