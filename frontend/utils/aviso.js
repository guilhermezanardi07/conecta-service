import { Alert, Platform } from 'react-native';

// Mostra uma mensagem para o usuário.
// No celular usa o Alert nativo. No navegador o Alert do React Native não
// aparece, então usamos o window.alert para a mensagem não passar despercebida.
export function mostrarAviso(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
    return;
  }

  Alert.alert(titulo, mensagem);
}