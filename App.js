import React, { useState } from 'react';
import Welcome from './screens/Welcome';
import Login from './screens/login/Login';
import ForgotPassword from './screens/login/ForgotPassword';
import CriaLogin from './screens/login/CriaLogin';
import BemVindo from './screens/Welcome/bemVindo';

export default function App() {
  const [screen, setScreen] = useState('welcome');

  if (screen === 'welcome') {
    return <Welcome onStart={() => setScreen('login')} />;
  }

  if (screen === 'login') {
    return (
      <Login
        onForgotPassword={() => setScreen('forgot')}
        goToRegister={() => setScreen('register')}
        goToWelcome={() => setScreen('bemVindo')}
      />
    );
  }

  if (screen === 'forgot') {
    return <ForgotPassword onBack={() => setScreen('login')} />;
  }

  if (screen === 'register') {
    return <CriaLogin goBack={() => setScreen('login')} />;
  }

  if (screen === 'bemVindo') {
    return <BemVindo />;
  }

  return null;
}