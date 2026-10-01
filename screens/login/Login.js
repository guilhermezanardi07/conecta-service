import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert
} from 'react-native';

export default function Login({ goToRegister, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
  if (!email || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  goToWelcome();
};

  return (
    <ImageBackground
      source={require('../../img/fundLogin.png')}
      style={styles.background}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>

        <View style={styles.card}>

          <Image
            source={require('../../img/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email*"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha*"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

           <TouchableOpacity onPress={onForgotPassword}>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* CADASTRO */}
          <TouchableOpacity onPress={goToRegister}>
            <Text style={styles.register}>
              Não tem conta? Cadastre-se
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },


  card: {
    width: '85%',
    backgroundColor: 'rgba(40, 47, 86,0.3)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },


  logo: {
    width: 700,
    height: 120,
    resizeMode: 'contain',
    position: 'absolute',
    top: -50,
  },

  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
  },

  forgot: {
    color: '#5ca9fa',
    alignSelf: 'flex-end',
    paddingTop: 15,

  },

  button: {
    backgroundColor: '#0ba8af',
    padding: 15,
    borderRadius: 40,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },

  register: {
    color: '#5ca9fa',
    marginTop: 20,
  },
});