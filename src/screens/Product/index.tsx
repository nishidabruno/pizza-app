import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { ProductNavigationProps } from '@src/@types/navigation';

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
import { ProductData } from '@components/ProductCard';

type PizzaResponse = ProductData & {
  photo_path: string;
  price_by_sizes: {
    s: string;
    r: string;
    l: string;
  }
}

export function Product() {
  const [image, setImage] = useState('');
  const [pizzaName, setPizzaName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeS, setPriceSizeS] = useState('');
  const [priceSizeR, setPriceSizeR] = useState('');
  const [priceSizeL, setPriceSizeL] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;
  const navigation = useNavigation();

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
    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        pizza_name: pizzaName,
        name_insensitive: pizzaName.toLocaleLowerCase().trim(),
        description,
        price_by_sizes: {
          s: priceSizeS,
          r: priceSizeR,
          l: priceSizeL,
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(err => {
        Alert.alert('Register', 'Something went wrong, try again later');
        setIsLoading(false);
      })
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    firestore()
      .collection('pizzas')
      .doc(id)
      .delete()
      .then(response => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate('Home'))
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => {
          const product = response.data() as PizzaResponse;

          setPizzaName(product.pizza_name);
          setImage(product.photo_url);
          setPhotoPath(product.photo_path);
          setDescription(product.description);
          setPriceSizeS(product.price_by_sizes.s);
          setPriceSizeR(product.price_by_sizes.r);
          setPriceSizeL(product.price_by_sizes.l);
          setPhotoPath(product.photo_path)

        })
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack onPress={handleGoBack} />
        <Title>{id ? 'Details' : 'Add'}</Title>

        {id ? (
          <BorderlessButton onPress={handleDelete}>
            <DeleteLabel>Delete</DeleteLabel>
          </BorderlessButton>
        )
          : <View style={{ width: 38 }} />
        }
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Upload>
          <Photo uri={image} />
          {!id &&
            <PickImageButton
              title="Select"
              type="secondary"
              onPress={handleImagePicker}
            />
          }
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
              style={{ height: 80, lineHeight: 22, paddingTop: 12 }}
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

          {!id &&
            <Button
              title="Add Pizza"
              isLoading={isLoading}
              onPress={handleRegister}
            />
          }
        </Form>
      </ScrollView>
    </Container>
  );
}
