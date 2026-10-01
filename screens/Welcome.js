import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Welcome({ onStart }) {
  return (
    <View style={styles.container}>

      <View style={styles.card}>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../img/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* CONTEÚDO */}
        <Text style={styles.title}>Conecta Service</Text>

        <Text style={styles.subtitle}>
          Profissional bom não pode ficar invisível — 
          e cliente não pode contratar no escuro.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: '85%',
    borderWidth: 2,
    borderColor: '#08e0e7',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    position: 'relative',
  },

  logoContainer: {
    position: 'absolute',
    top: -40, 
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },

  logo: {
    width: 80,
    height: 80,
  },

  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 50, 
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 14,
    color: '#CBD5F5',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#08e0e7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});