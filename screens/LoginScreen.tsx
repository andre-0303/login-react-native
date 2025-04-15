import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { supabase } from '../lib/supabase';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // ✅ Login com email e senha
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Email ou senha incorretos');
    } else {
      setError('');
      navigation.navigate('Home', { email });
    }
  };

  // ✅ Login com Google
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Erro ao logar com Google:', error.message);
      setError('Erro ao fazer login com Google');
    }
  };

  const handleMagicLink = async () => {
    if (email === '') {
      setError('Preencha o campo de email');
      return;
    }
  
    // Certifique-se de passar o redirectTo correto aqui
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        redirectTo: 'exp://192.168.0.102:19000' // Isso é para quando você está rodando no Expo
      }
    });
  
    if (error) {
      setError('Erro ao enviar o link mágico');
    } else {
      Alert.alert('Link mágico enviado para seu email!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Não tem conta? Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Entrar com Google" onPress={handleGoogleLogin} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Login com Magic Link" onPress={handleMagicLink} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  buttonContainer: { marginTop: 10 },
});
