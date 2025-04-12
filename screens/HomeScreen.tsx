import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { supabase } from '../lib/supabase';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Erro ao sair da conta');
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo(a), {email}!</Text>
      <Button title="Sair da conta" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
