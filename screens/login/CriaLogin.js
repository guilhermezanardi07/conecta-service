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

export default function CriaLogin({ goBack }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  
  const formatCpf = (value) => {
    let v = value.replace(/\D/g, '');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setCpf(v);
  };

  const handleRegister = () => {
    if (!nome || !email || !cpf || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado (simulação)');
  };

  return (
    <ImageBackground
      source={require('../../img/fundLogin.png')}
      style={styles.background}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>

        <View style={styles.card}>

          {/* LOGO */}
          <Image
            source={require('../../img/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Criar Conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#ccc"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#ccc"
            value={cpf}
            onChangeText={formatCpf}
            keyboardType="numeric"
            maxLength={14}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goBack}>
            <Text style={{ color: '#5ca9fa', marginTop: 15, borderRadius: 20, }}>
              Já tem conta? Voltar
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
});