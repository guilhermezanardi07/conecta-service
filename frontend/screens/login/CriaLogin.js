import React, { useState } from 'react';
import { Tela, Caixa, Titulo, Campo, LinkTexto, Botao } from '../../components/Tela';
import { cadastrar } from '../../services/api';
import { mostrarAviso } from '../../utils/aviso';

// A tela de cadastro (Figma) não tem escolha de papel, mas a API exige um.
// Por enquanto todo cadastro entra como CONTRATANTE. Para mudar, troque
// aqui por 'PRESTADOR' (ou adicione uma escolha na tela mais tarde).
const PAPEL_PADRAO = 'CONTRATANTE';

// A API exige senha com pelo menos 15 caracteres.
const SENHA_MINIMA = 15;

export default function CriaLogin({ goToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Evita enviar o cadastro duas vezes se o usuário tocar no botão repetidamente.
  const [carregando, setCarregando] = useState(false);

  // Aplica a máscara 000.000.000-00 enquanto o usuário digita o CPF.
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

    // Validações rápidas no app, antes de chamar a API.
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

    setCarregando(true);

    try {
      // Chama a API para criar a conta. O CPF vai com a máscara; a API valida
      // os dígitos e guarda no formato 000.000.000-00.
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
      // E-mail já cadastrado, CPF inválido, API desligada etc.
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