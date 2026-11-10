import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function BemVindo({ usuario, onSair }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <View style={styles.card}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Sessão Ativa</Text>
        </View>

        <Text style={styles.title}>
          Bem-vindo{usuario?.nome ? `, ${usuario.nome}` : ''}!
        </Text>

        <Text style={styles.subtitle}>
          Você acessou com sucesso a plataforma Conecta Service.
        </Text>

        {usuario && usuario.papeis ? (
          <View style={styles.profileBox}>
            <Text style={styles.profileLabel}>Perfil(is) Vinculado(s):</Text>
            <Text style={styles.profileValue}>{usuario.papeis.join(', ')}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.logoutButton} onPress={onSair} activeOpacity={0.8}>
          <Text style={styles.logoutButtonText}>Encerrar Sessão</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  badgeContainer: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  profileBox: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  profileLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  profileValue: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '600',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#fee2e2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  logoutButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
});