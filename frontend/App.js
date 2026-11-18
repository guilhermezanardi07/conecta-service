import React, { useState } from 'react';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

import Welcome from './screens/Welcome';
import Login from './screens/login/Login';
import CriaLogin from './screens/login/CriaLogin';
import ForgotPassword from './screens/login/ForgotPassword';

import { tipoDoUsuario } from './screens/usuarios/tipos';
import HomeContratante from './screens/usuarios/contratante/HomeContratante';
import PerfilContratante from './screens/usuarios/contratante/PerfilContratante';
import HomePrestador from './screens/usuarios/prestador/HomePrestador';
import PerfilPrestador from './screens/usuarios/prestador/PerfilPrestador';

export default function App() {
  const [screen, setScreen] = useState('welcome');

  // Guarda o resultado do login: { accessToken, tokenType, expiresIn, usuario }.
  // Fica só na memória: ao fechar o app, o usuário precisa entrar de novo.
  const [sessao, setSessao] = useState(null);

  const [fontsLoaded] = useFonts({ BebasNeue_400Regular });

  if (!fontsLoaded) {
    return null;
  }

  if (screen === 'welcome') {
    return <Welcome onStart={() => setScreen('login')} />;
  }

  if (screen === 'login') {
    return (
      <Login
        goToRegister={() => setScreen('register')}
        onForgotPassword={() => setScreen('forgot')}
        goToWelcome={(dadosLogin) => {
          // Login aprovado pela API: guarda a sessão e abre a home do tipo do usuário.
          setSessao(dadosLogin);
          setScreen('home');
        }}
      />
    );
  }

  if (screen === 'register') {
    return <CriaLogin goToLogin={() => setScreen('login')} />;
  }

  if (screen === 'forgot') {
    return <ForgotPassword goToLogin={() => setScreen('login')} />;
  }

  // ===== Área logada: contratante ou prestador =====
  const usuario = sessao ? sessao.usuario : null;
  const ehPrestador = tipoDoUsuario(usuario) === 'prestador';

  const sair = () => {
    // Sair: apaga a sessão e volta para o login.
    setSessao(null);
    setScreen('login');
  };

  if (screen === 'perfil') {
    const Perfil = ehPrestador ? PerfilPrestador : PerfilContratante;
    return <Perfil usuario={usuario} onBack={() => setScreen('home')} onSair={sair} />;
  }

  const Home = ehPrestador ? HomePrestador : HomeContratante;
  return <Home usuario={usuario} onOpenProfile={() => setScreen('perfil')} onSair={sair} />;
}