import React, { useState } from 'react';
import { Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton
} from './styles';

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
    </Container>
  );
}
