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

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (email === '') {
      Alert.alert('Erro', 'Digite seu email');
      return;
    }

    Alert.alert('Sucesso', 'Código enviado!');
    setCodeSent(true);
  };

  const handleResetPassword = () => {
    if (newPassword === '') {
      Alert.alert('Erro', 'Digite a nova senha');
      return;
    }

    Alert.alert('Sucesso', 'Senha redefinida!');
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

          <Text style={styles.title}>Recuperar Senha</Text>

          {!codeSent ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>Enviar código</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.subtitle}>
                Digite sua nova senha
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nova senha"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Redefinir senha</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backText}>
              Voltar para o login
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

  image: {
    opacity: 0.3,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 47, 86, 0.6)',
  },

  card: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: -50,
  },

  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
  },

  subtitle: {
    color: '#CBD5F5',
    marginBottom: 15,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#0ba8af',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  backText: {
    color: '#349eeb',
    marginTop: 15,
  },
});