import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuLateral from '../../menuLateral';

const FONT = 'BebasNeue_400Regular';

function iniciais(nome) {
  if (!nome) return 'EU';
  const p = nome.trim().split(/\s+/);
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

export default function Perfil({ usuario, onBack }) {
  const [menuAberto, setMenuAberto] = useState(false);

  // Troque pelos campos reais que a sua API devolve
  const nome = (usuario && usuario.nome) || 'JUNIOR ESQUEIATTO DOS SANTOS';
  const idade = (usuario && usuario.idade) || 23;
  const cidades = (usuario && usuario.cidades) || 'MANINÓPOLIS';

  return (
    <View style={styles.screen}>
      <View style={styles.topbar}>
        <Ionicons name="infinite" size={34} color="#19b3e6" />

        {/* Ícone de casa: volta para a tela inicial */}
        <Pressable onPress={onBack} hitSlop={10}>
          <Ionicons name="home-outline" size={26} color="#fff" />
        </Pressable>

        <Pressable style={styles.hamburger} onPress={() => setMenuAberto(true)}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* Foto */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{iniciais(nome)}</Text>
            </View>
            <Pressable style={styles.edit}>
              <Ionicons name="pencil" size={12} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.status}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>ATIVO</Text>
          </View>

          <Text style={styles.name}>{nome}</Text>

          <View style={styles.row}>
            <Text style={styles.text}>IDADE: {idade}</Text>
            <Text style={styles.gold}>USUARIO OURO</Text>
          </View>

          <Text style={[styles.text, { marginTop: 10 }]}>CIDADES QUE PRESTA SERVIÇOS: {cidades}</Text>

          <View style={styles.mapBox}>
            <Text style={styles.mapTitle}>MAPA DE SERVIÇOS CONTRATADOS</Text>
            <View style={styles.mapItem} />
            <View style={styles.mapItem} />
            <View style={styles.mapItem} />
          </View>
        </View>
      </ScrollView>

      <MenuLateral visible={menuAberto} onClose={() => setMenuAberto(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#cdeeff' },
  topbar: {
    backgroundColor: '#1b365d',
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 48) + 8,
    paddingBottom: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    width: 28, height: 28, borderRadius: 3, backgroundColor: '#e8e8e8',
    justifyContent: 'center', paddingHorizontal: 5, gap: 3,
  },
  bar: { height: 3, backgroundColor: '#1b365d', borderRadius: 2 },

  content: { paddingTop: 56, paddingHorizontal: 14, paddingBottom: 30 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, paddingTop: 56, paddingHorizontal: 14,
    paddingBottom: 20, minHeight: 520, elevation: 3,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  avatarWrap: { position: 'absolute', top: -46, alignSelf: 'center' },
  avatar: {
    width: 92, height: 92, borderRadius: 46, backgroundColor: '#b0865f',
    borderWidth: 3, borderColor: '#1f77c4', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 34, fontFamily: FONT },
  edit: {
    position: 'absolute', right: 0, bottom: 2, width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#1f77c4', borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },

  status: {
    position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#e3e3e3', borderRadius: 10, paddingVertical: 2, paddingLeft: 3, paddingRight: 8,
  },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#4cd964' },
  statusText: { fontSize: 11, color: '#666', fontFamily: FONT },

  name: { textAlign: 'center', fontSize: 20, color: '#555', fontFamily: FONT, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  text: { fontSize: 19, color: '#555', fontFamily: FONT },
  gold: { fontSize: 18, color: '#e6d800', fontFamily: FONT },

  mapBox: {
    marginTop: 14, borderWidth: 4, borderColor: '#e3e3e3', borderRadius: 12, padding: 14, minHeight: 190,
  },
  mapTitle: { fontSize: 19, color: '#666', fontFamily: FONT, marginBottom: 14 },
  mapItem: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#d8d8d8', marginBottom: 8 },
});