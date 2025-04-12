import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Importando o tipo de navegação
import { supabase } from '../lib/supabase';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    
    //criamos dois estados para armazenar o que o usuário digitar no input
    const [email, setEmail] = useState<string>('');//string inicialmente vazia
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    //função para chamar o botão quando clicado
    const handleLogin = async () => {
        if (!email || !password) {
          setError('Preencha todos os campos');
          return;
        }
    
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .eq('password', password)
          .single();
    
        if (error || !data) {
          setError('Email ou senha incorretos');
        } else {
          setError('');
          navigation.navigate('Home', { email: data.email });
        }
      };

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Não tem conta? Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
};
 
export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
    error: { color: 'red', marginBottom: 10, textAlign: 'center' }
  });