import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo(a), {email}!</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' }
});
