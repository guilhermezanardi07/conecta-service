import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Tela provisória exibida depois do login. Mostra os dados que a API devolveu.
// (A interface final desta tela será feita depois.)
export default function BemVindo({ usuario, onSair }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22 }}>
        Bem-vindo{usuario ? `, ${usuario.nome}` : ''}!
      </Text>

      {usuario && usuario.papeis ? (
        <Text style={{ marginTop: 8 }}>Perfil: {usuario.papeis.join(', ')}</Text>
      ) : null}

      <TouchableOpacity onPress={onSair} style={{ marginTop: 24 }}>
        <Text style={{ color: '#0088c7', fontSize: 18 }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}