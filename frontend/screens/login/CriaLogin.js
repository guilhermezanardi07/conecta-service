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
import SeletorTipoUsuario from './SeletorTipoUsuario';

// O cadastro aceita senhas de 8 a 32 caracteres.
const SENHA_MINIMA = 8;
const SENHA_MAXIMA = 32;

export default function CriaLogin({ goToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  // 'PRESTADOR' | 'CONTRATANTE' | null (o usuário precisa escolher)
  const [papel, setPapel] = useState(null);
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

    if (!papel) {
      mostrarAviso('Erro', 'Escolha se você é prestador ou contratante de serviços');
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
        papel,
      });

      mostrarAviso('Sucesso', 'Conta criada! Faça login para continuar.');
      goToLogin();
    } catch (erro) {
      mostrarAviso('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  };

  // Layout: a caixa subiu 40 e os campos ficaram mais próximos (58 de distância)
  // para abrir espaço ao seletor de tipo de conta. Ajuste os "top" se precisar.
  return (
    <Tela>
      <Caixa top={311} altura={489} />
      <Titulo top={330}>Criar Conta</Titulo>

      <Campo
        top={372}
        placeholder="nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <Campo
        top={430}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />

      <Campo
        top={488}
        placeholder="cpf"
        keyboardType="numeric"
        maxLength={14}
        value={cpf}
        onChangeText={(text) => setCpf(formatCpf(text))}
      />

      <Campo
        top={546}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Campo
        top={604}
        placeholder="confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <SeletorTipoUsuario top={664} valor={papel} onChange={setPapel} />

      <LinkTexto top={749} onPress={goToLogin}>
        já tem conta? voltar
      </LinkTexto>

      <Botao top={774} onPress={handleRegister}>
        Entrar
      </Botao>
    </Tela>
  );
}