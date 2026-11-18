import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Estrelas({ nota = 0, tamanho = 18 }) {
  const n = Math.round(nota);
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name="star" size={tamanho} color={i <= n ? '#ffd600' : '#d4d4d4'} />
      ))}
    </View>
  );
}