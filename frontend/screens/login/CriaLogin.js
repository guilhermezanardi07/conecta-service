import React, { useState } from 'react';
import {
  Tela,
  Caixa,
  Titulo,
  Campo,
  LinkTexto,
  Botao,
} from '../../components/Tela';
import { cadastrar } from '../../services/api';
import { mostrarAviso } from '../../utils/aviso';

// A tela ainda não possui escolha de papel.
// Por enquanto, todo cadastro entra como CONTRATANTE.
const PAPEL_PADRAO = 'CONTRATANTE';

// O cadastro aceita senhas de 8 a 32 caracteres.
const SENHA_MINIMA = 8;
const SENHA_MAXIMA = 32;

export default function CriaLogin({ goToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Aplica a máscara 000.000.000-00 enquanto o usuário digita.
  const formatCpf = (text) => {
    const numbers = text.replace(/\D/g, '').slice(0, 11);

    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleRegister = async () => {
    if (carregando) {
      return;
    }

    if (!nome || !email || !cpf || !senha || !confirmarSenha) {
      mostrarAviso('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarAviso('Erro', 'As senhas não coincidem');
      return;
    }

    if (senha.length < SENHA_MINIMA) {
      mostrarAviso(
        'Erro',
        `A senha deve ter pelo menos ${SENHA_MINIMA} caracteres`,
      );
      return;
    }

    if (senha.length > SENHA_MAXIMA) {
      mostrarAviso(
        'Erro',
        `A senha deve ter no máximo ${SENHA_MAXIMA} caracteres`,
      );
      return;
    }

    setCarregando(true);

    try {
      // A API valida o CPF e armazena a senha somente como hash.
      await cadastrar({
        nome,
        email,
        cpf,
        senha,
        confirmacaoSenha: confirmarSenha,
        papel: PAPEL_PADRAO,
      });

      mostrarAviso('Sucesso', 'Conta criada! Faça login para continuar.');
      goToLogin();
    } catch (erro) {
      mostrarAviso('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
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