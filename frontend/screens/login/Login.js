import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Tela, Caixa, Titulo, Campo, LinkTexto, Botao } from '../../components/Tela';

export default function Login({ goToRegister, onForgotPassword, goToWelcome }) {
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
    <Tela>
      <Caixa top={351} altura={326} />
      <Titulo top={375}>login</Titulo>

      <Campo
        top={433}
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
      />
      <Campo
        top={514}
        placeholder="Senha*"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <LinkTexto top={591} onPress={onForgotPassword}>
        Esqueceu a senha?
      </LinkTexto>
      <LinkTexto top={623} onPress={goToRegister}>
        Não tem conta? cadastre-se
      </LinkTexto>

      <Botao top={649} onPress={handleLogin}>
        Entrar
      </Botao>
    </Tela>
  );
}