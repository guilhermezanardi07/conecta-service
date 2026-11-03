import React, { useState } from 'react';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

import Welcome from './screens/Welcome';
import Login from './screens/login/Login';
import CriaLogin from './screens/login/CriaLogin';
import ForgotPassword from './screens/login/ForgotPassword';
import BemVindo from './screens/Welcome/bemVindo';

export default function App() {
  const [screen, setScreen] = useState('welcome');
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
        goToWelcome={() => setScreen('bemvindo')}
      />
    );
  }

  if (screen === 'register') {
    return <CriaLogin goToLogin={() => setScreen('login')} />;
  }

  if (screen === 'forgot') {
    return <ForgotPassword goToLogin={() => setScreen('login')} />;
  }

  return <BemVindo />;
}