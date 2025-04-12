import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen: React.FC = () => {

    //criamos dois estados para armazenar o que o usuário digitar no input
    const [email, setEmail] = useState<string>('');//string inicialmente vazia
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    //função para chamar o botão quando clicado
    const handleSignIn = () => {
        //estiver vázio
        if (email === '' || password === '') {
            setError('Preencha todos os campos!');
        } else {
            setError('');
            Alert.alert('Login feito com sucesso!')
        }
    }
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
        />  

        <TextInput 
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
        />  

        <Button title="Entrar" onPress={handleSignIn}/>
     </View>
    );
}
 
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
})