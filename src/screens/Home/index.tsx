import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import happyEmoji from '@assets/happy.png';

import { useAuth } from '@hooks/auth';
import { Search } from '@components/Search';
import { ProductCard, ProductData } from '@components/ProductCard';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuQuantity,
  Title,
  NewProductButton,
} from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { COLORS } = useTheme();
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase();

    try {
      const response = await firestore()
        .collection('pizzas')
        .orderBy('name_insensitive')
        .startAt(formattedValue)
        .endAt(`${formattedValue}\uf8ff`)
        .get()

      const data = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductData[];

      setPizzas(data);
    } catch (e) {
      Alert.alert('Loading error', 'Error loading pizzas...Try again later')
    }
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'Product' : 'Order';
    navigation.navigate(route, { id });
  }

  function handleSearch() {
    fetchPizzas(searchTerm)
  }

  // Data will be fetched again
  function handleSearchClear() {
    setSearchTerm('');
    fetchPizzas('');
  }

  function handleRegisterNew() {
    navigation.navigate('Product', {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('');
    }, [])
  );


  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Greetings, {user?.name}</GreetingText>
        </Greeting>


        <BorderlessButton onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </BorderlessButton>
      </Header>

      <Search
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Menu</Title>
        <MenuQuantity>{pizzas.length} pizzas</MenuQuantity>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />)}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      {user?.isAdmin && (
        <NewProductButton
          title="Add Pizza"
          type="secondary"
          onPress={handleRegisterNew}
        />
      )}

    </Container>
  );
}
