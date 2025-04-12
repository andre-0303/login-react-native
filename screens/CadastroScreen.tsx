import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

const CadastroScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');	

  // função marcada como async
  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    // aqui está o await dentro da função corretamente
    const { error: signUpError } = await supabase
      .from('users')
      .insert([{ email, password }]);

    if (signUpError) {
      setError('Erro ao cadastrar usuário');
    } else {
      Alert.alert('Cadastro realizado com sucesso!');
      navigation.goBack();
    }
  };

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
      <Button title="Cadastrar" onPress={handleSignUp} />
    </View>
  );
};
 
export default CadastroScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' }
});
