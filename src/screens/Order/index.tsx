import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@hooks/auth';
import { OrderNavigationProps } from '@src/@types/navigation';
import { PizzaResponse } from '@src/@types/pizzaResponse';

import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PIZZA_TYPES } from '@utils/pizzaTypes';

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from './styles';


export function Order() {
  const [selectedSize, setSelectedSize] = useState<SizesKeys | null>();
  const [orderPizza, setOrderPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [isSendingOrder, setIsSendingOrder] = useState(false);

  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();

  const { id } = route.params as OrderNavigationProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleOrder() {
    if (!selectedSize) {
      Alert.alert('Order', 'Select pizza size');
    }
    if (!quantity) {
      Alert.alert('Order', 'Select pizza quantity');
    }
    if (!tableNumber) {
      Alert.alert('Order', 'Select table number');
    }

    setIsSendingOrder(true);

    try {
      await firestore()
        .collection('orders')
        .add({
          pizza_name: orderPizza.pizza_name,
          quantity,
          amount: total,
          size: selectedSize,
          status: 'Pending',
          waiter_id: user?.id,
          image_url: orderPizza.photo_url,
          table_number: tableNumber,
        });

      navigation.navigate('Home');
    } catch {
      Alert.alert('Order', 'Something went wrong trying to place the order, try again later');
      setIsSendingOrder(false);
    }
  }

  type SizesKeys = keyof typeof orderPizza.price_by_sizes;
  const total = selectedSize ? quantity * Number(orderPizza.price_by_sizes[selectedSize]) : 0;

  useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await firestore()
          .collection('pizzas')
          .doc(id)
          .get()

        setOrderPizza(response.data() as PizzaResponse);
      } catch {
        Alert.alert('Order', 'Product could not be loaded, try again later');
      }
    }

    fetchPizza();
  }, [id]);

  return (
    <Container behavior="height">
      <ContentScroll>
        <Header>
          <ButtonBack
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Photo source={{ uri: orderPizza.photo_url }} />

        <Form>
          <Title>{orderPizza.pizza_name}</Title>
          <Label>Select the size</Label>
          <Sizes>
            {PIZZA_TYPES.map(item => (
              <RadioButton
                key={item.id}
                title={item.name}
                onPress={() => setSelectedSize(item.id as SizesKeys)}
                selected={selectedSize == item.id}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Table number</Label>
              <Input
                keyboardType="numeric"
                onChangeText={value => setTableNumber(Number(value))}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantity</Label>
              <Input
                keyboardType="numeric"
                onChangeText={value => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Total: {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(total)}
          </Price>

          <Button
            title="Confirm order"
            isLoading={isSendingOrder}
            onPress={handleOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}
