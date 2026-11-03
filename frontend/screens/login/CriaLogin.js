import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Tela, Caixa, Titulo, Campo, LinkTexto, Botao } from '../../components/Tela';

export default function CriaLogin({ goToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const formatCpf = (text) => {
    const numbers = text.replace(/\D/g, '').slice(0, 11);

    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
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

    Alert.alert('Sucesso', 'Conta criada!');
    goToLogin();
  };

  return (
    <Tela>
      <Caixa top={351} altura={449} />
      <Titulo top={375}>Criar Conta</Titulo>

      <Campo
        top={419}
        placeholder="nome completo"
        value={nome}
        onChangeText={setNome}
      />
      <Campo
        top={490}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <Campo
        top={557}
        placeholder="cpf"
        keyboardType="numeric"
        maxLength={14}
        value={cpf}
        onChangeText={(text) => setCpf(formatCpf(text))}
      />
      <Campo
        top={624}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Campo
        top={691}
        placeholder="confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <LinkTexto top={749} onPress={goToLogin}>
        já tem conta? voltar
      </LinkTexto>

      <Botao top={774} onPress={handleRegister}>
        Entrar
      </Botao>
    </Tela>
  );
}