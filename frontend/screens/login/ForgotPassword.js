import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Tela, Caixa, Titulo, Campo, LinkTexto, Botao } from '../../components/Tela';

export default function ForgotPassword({ goToLogin }) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSend = () => {
    if (!email) {
      Alert.alert('Erro', 'Digite seu email');
      return;
    }

    setCodeSent(true);
    Alert.alert('Sucesso', 'Código enviado!');
  };

  const handleReset = () => {
    if (!novaSenha) {
      Alert.alert('Erro', 'Digite a nova senha');
      return;
    }

    Alert.alert('Sucesso', 'Senha redefinida!');
  };

  return (
    <Tela>
      <Caixa top={351} altura={214} />
      <Titulo top={379}>Recuperar Senha</Titulo>

      {!codeSent ? (
        <Campo
          top={433}
          placeholder="digite seu email"
          value={email}
          onChangeText={setEmail}
        />
      ) : (
        <Campo
          top={433}
          placeholder="nova senha"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
      )}

      <LinkTexto top={506} onPress={goToLogin}>
        Voltar para o login
      </LinkTexto>

      <Botao
        top={538}
        tamanhoFonte={22}
        onPress={!codeSent ? handleSend : handleReset}
      >
        {!codeSent ? 'enviar verificação' : 'redefinir senha'}
      </Botao>
    </Tela>
  );
}