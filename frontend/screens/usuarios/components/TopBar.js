import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cabeçalho azul. Mostra só o que for passado:
// onPressHome -> ícone de casa | onPressAvatar -> foto de perfil | onOpenMenu -> hambúrguer
export default function TopBar({ iniciais, foto, onPressAvatar, onPressHome, onOpenMenu }) {
  return (
    <View style={styles.topbar}>
      <Ionicons name="infinite" size={34} color="#19b3e6" />

      <View style={styles.right}>
        {onPressHome && (
          <Pressable onPress={onPressHome} hitSlop={10} accessibilityLabel="Voltar ao início">
            <Ionicons name="home-outline" size={26} color="#fff" />
          </Pressable>
        )}

        {onPressAvatar && (
          <Pressable style={styles.avatar} onPress={onPressAvatar} accessibilityLabel="Abrir meu perfil">
            {foto ? (
              <Image source={{ uri: foto }} style={styles.avatarImg} />
            ) : (
              <Text style={styles.avatarText}>{iniciais}</Text>
            )}
          </Pressable>
        )}

        <Pressable style={styles.hamburger} onPress={onOpenMenu} accessibilityLabel="Abrir menu">
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#1b365d',
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 48) + 8,
    paddingBottom: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#b0865f', overflow: 'hidden',
    borderWidth: 2, borderColor: '#19b3e6', alignItems: 'center', justifyContent: 'center',
  },
  avatarImg: { width: '100%', height: '100%' },
  avatarText: { color: '#fff', fontSize: 13, fontFamily: 'BebasNeue_400Regular' },
  hamburger: {
    width: 28, height: 28, borderRadius: 3, backgroundColor: '#e8e8e8',
    justifyContent: 'center', paddingHorizontal: 5, gap: 3,
  },
  bar: { height: 3, backgroundColor: '#1b365d', borderRadius: 2 },
});