import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { ItemSeparator } from '@components/ItemSeparator';
import { OrderCard } from '@components/OrderCard';
import { OrderResponse } from '@src/@types/pizzaResponse';


import { Container, Header, Title } from './styles';
import { useAuth } from '@hooks/auth';

export function Orders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  const { user } = useAuth();

  function handlePizzaDelivery(id: string) {
    Alert.alert('Order', 'Confirm pizza delivery?', [
      {
        text: 'No',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          firestore()
            .collection('orders')
            .doc(id)
            .update({
              status: 'Delivered'
            });
        }
      }
    ])
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as OrderResponse[];

        setOrders(data);
      });

    return () => subscribe();
  }, [user?.id]);

  return (
    <Container>
      <Header>
        <Title>Orders made</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            onPress={() => handlePizzaDelivery(item.id)}
            enabled={item.status === 'Done'}
          />
        )}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Container>
  );
}
