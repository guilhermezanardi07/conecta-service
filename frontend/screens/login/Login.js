import React, { useState } from 'react';
import { Tela, Caixa, Titulo, Campo, LinkTexto, Botao } from '../../components/Tela';
import { entrar } from '../../services/api';
import { mostrarAviso } from '../../utils/aviso';

export default function Login({ goToRegister, onForgotPassword, goToWelcome }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Evita enviar o login duas vezes se o usuário tocar no botão repetidamente.
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (carregando) {
      return;
    }

    if (!email || !senha) {
      mostrarAviso('Erro', 'Preencha todos os campos');
      return;
    }

    setCarregando(true);

    try {
      // Chama a API. Se o login der certo, recebemos o token e os dados do usuário.
      const sessao = await entrar(email, senha);

      // Entrega a sessão para o App.js, que guarda os dados e troca de tela.
      goToWelcome(sessao);
    } catch (erro) {
      // Email/senha inválidos, API desligada etc. A mensagem já vem pronta.
      mostrarAviso('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
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