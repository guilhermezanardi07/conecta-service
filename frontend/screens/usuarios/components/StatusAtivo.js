import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusAtivo({ ativo = true, style }) {
  return (
    <View style={[styles.status, style]}>
      <View style={[styles.dot, !ativo && { backgroundColor: '#b5b5b5' }]} />
      <Text style={styles.text}>{ativo ? 'ATIVO' : 'INATIVO'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#e3e3e3',
    borderRadius: 10, paddingVertical: 2, paddingLeft: 3, paddingRight: 8,
  },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#4cd964' },
  text: { fontSize: 11, color: '#666', fontFamily: 'BebasNeue_400Regular' },
});