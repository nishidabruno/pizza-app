import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
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
  const [pizzaName, setPizzaName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeS, setPriceSizeS] = useState('');
  const [priceSizeR, setPriceSizeR] = useState('');
  const [priceSizeL, setPriceSizeL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleRegister() {
    if (!pizzaName.trim()) {
      return Alert.alert('Register', 'Pizza name field is empty')
    }
    if (!description.trim()) {
      return Alert.alert('Register', 'Pizza description field is empty')
    }
    if (!image) {
      return Alert.alert('Register', 'Pizza image must be provided')
    }
    if (!priceSizeS || !priceSizeR || !priceSizeL) {
      return Alert.alert('Register', 'All prices by size should be filled in')
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
            <Input
              onChangeText={setPizzaName}
              value={pizzaName}
            />
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
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Sizes and prices</Label>

            <InputPrice
              size="S"
              onChangeText={setPriceSizeS}
              value={priceSizeS}
            />
            <InputPrice
              size="R"
              onChangeText={setPriceSizeR}
              value={priceSizeR}
            />
            <InputPrice
              size="L"
              onChangeText={setPriceSizeL}
              value={priceSizeL}
            />
          </InputGroup>

          <Button
            title="Register pizza"
            isLoading={isLoading}
            onPress={handleRegister}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
