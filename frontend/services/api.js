import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Porta em que a API (NestJS) está rodando. Vem do PORT do backend/.env.
const PORTA_API = 3000;

// Tempo máximo de espera por uma resposta da API (em milissegundos).
const TEMPO_LIMITE_MS = 10000;

// Descobre o endereço da API conforme onde o app está rodando.
function descobrirUrlBase() {
  // No navegador, a API roda na mesma máquina.
  if (Platform.OS === 'web') {
    return `http://localhost:${PORTA_API}/api`;
  }

  // No celular, "localhost" seria o próprio celular. Por isso usamos o IP do
  // computador que o Expo já conhece (algo como "192.168.0.15:8081").
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri ? hostUri.split(':')[0] : 'localhost';

  return `http://${host}:${PORTA_API}/api`;
}

export const API_URL = descobrirUrlBase();

// Transforma a resposta de erro da API em um texto para mostrar ao usuário.
function mensagemDeErro(dados) {
  // Erro 400: a API devolve a lista de campos inválidos. Juntamos as mensagens.
  if (Array.isArray(dados.errors) && dados.errors.length > 0) {
    return dados.errors.map((erro) => erro.message).join('\n');
  }

  // Os demais erros (401, 409, 503...) já vêm com uma mensagem em português.
  if (typeof dados.message === 'string') {
    return dados.message;
  }

  return 'Erro inesperado no servidor. Tente novamente.';
}

// Envia um POST com JSON para a API e devolve o corpo da resposta.
// Se algo der errado, lança um Error cuja "message" já pode ser mostrada na tela.
async function post(caminho, corpo) {
  // Cancela a requisição se a API demorar demais para responder.
  const controle = new AbortController();
  const temporizador = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);

  let resposta;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
      signal: controle.signal,
    });
  } catch (erro) {
    // Chegou aqui quando não houve resposta: API desligada, sem rede, IP errado...
    throw new Error(
      'Não foi possível conectar ao servidor. Verifique se a API está ligada e tente novamente.',
    );
  } finally {
    clearTimeout(temporizador);
  }

  // Lê o JSON da resposta. Se não vier JSON, usa um objeto vazio.
  let dados = {};

  try {
    dados = await resposta.json();
  } catch (erro) {
    dados = {};
  }

  if (!resposta.ok) {
    throw new Error(mensagemDeErro(dados));
  }

  return dados;
}

// Cria a conta. Rota: POST /api/auth/register
export function cadastrar({ nome, email, cpf, senha, confirmacaoSenha, papel }) {
  return post('/auth/register', {
    nome,
    email,
    cpf,
    senha,
    confirmacaoSenha,
    papel,
  });
}

// Faz o login. Rota: POST /api/auth/login
// Devolve: { accessToken, tokenType, expiresIn, usuario: { idUsuario, nome, email, papeis } }
export function entrar(email, senha) {
  return post('/auth/login', { email, senha });
}