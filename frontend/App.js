import React, { useState } from 'react';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

import Welcome from './screens/Welcome';
import Login from './screens/login/Login';
import CriaLogin from './screens/login/CriaLogin';
import ForgotPassword from './screens/login/ForgotPassword';
import BemVindo from './screens/Welcome/bemVindo';

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
          // Login aprovado pela API: guarda a sessão e vai para a próxima tela.
          setSessao(dadosLogin);
          setScreen('bemvindo');
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

  return (
    <BemVindo
      usuario={sessao ? sessao.usuario : null}
      onSair={() => {
        // Sair: apaga a sessão e volta para o login.
        setSessao(null);
        setScreen('login');
      }}
    />
  );
}