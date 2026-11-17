import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, Pressable, StyleSheet, Platform, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuLateral from '../menuLateral';

const FONT = 'BebasNeue_400Regular';

// Dados de exemplo (depois virão da API)
const PROFISSIONAIS = [
  { id: 1, profissao: 'DIARISTA', nome: 'RITA MIRANDA MARAIA', nota: 4, cor: '#8a5a44', ini: 'RM' },
  { id: 2, profissao: 'CARPINTEIRO', nome: 'EMANUEL DOS SANTOS', nota: 4, cor: '#5b3a29', ini: 'ED' },
  { id: 3, profissao: 'PEDREIRO', nome: 'ANTONIO MARCOS DIAS', nota: 3, cor: '#6a8aa8', ini: 'AM' },
  { id: 4, profissao: 'MANICURE', nome: 'MARCIA MARIA MADALENA', nota: 2, cor: '#a0654a', ini: 'MM' },
];

function iniciais(usuario) {
  const nome = usuario && usuario.nome ? usuario.nome.trim() : '';
  if (!nome) return 'EU';
  const p = nome.split(/\s+/);
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

function Estrelas({ nota }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name="star" size={18} color={i <= nota ? '#ffd600' : '#d4d4d4'} />
      ))}
    </View>
  );
}

function Ativo() {
  return (
    <View style={styles.status}>
      <View style={styles.dot} />
      <Text style={styles.statusText}>ATIVO</Text>
    </View>
  );
}

export default function Index({ usuario, onOpenProfile }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <View style={styles.screen}>
      {/* Topo */}
      <View style={styles.topbar}>
        <Ionicons name="infinite" size={34} color="#19b3e6" />

        <View style={styles.topbarRight}>
          {/* Clicar na foto abre a tela de perfil */}
          <Pressable style={styles.avatarSm} onPress={onOpenProfile}>
            <Text style={styles.avatarSmText}>{iniciais(usuario)}</Text>
          </Pressable>

          <Pressable style={styles.hamburger} onPress={() => setMenuAberto(true)}>
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Abas */}
        <View style={styles.tabs}>
          <Pressable style={styles.tab}><Text style={styles.tabText}>AVALIAÇÕES</Text></Pressable>
          <Pressable style={[styles.tab, styles.tabBorder]}>
            <Text style={styles.tabText}>VER SERVIÇOS CONTRATADOS</Text>
          </Pressable>
        </View>

        {/* Busca (ainda sem função) */}
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.search}
            placeholder="PROCURAR SERVIÇOS E PROFICIONAIS"
            placeholderTextColor="#aaa"
          />
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>CONHEÇA PROFICIONAIS QUALIFICADOS</Text>
          <Text style={styles.sectionTitleText}>PERTO DE VOCE</Text>
        </View>

        {/* Lista */}
        <View style={styles.listBox}>
          {PROFISSIONAIS.map((p, idx) => (
            <View key={p.id} style={[styles.card, idx === PROFISSIONAIS.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={[styles.avatarLg, { backgroundColor: p.cor }]}>
                <Text style={styles.avatarLgText}>{p.ini}</Text>
              </View>

              <View style={styles.info}>
                <View style={styles.infoHead}>
                  <Text style={styles.role}>{p.profissao}</Text>
                  <Ativo />
                </View>
                <Text style={styles.name} numberOfLines={1}>{p.nome}</Text>
                <Estrelas nota={p.nota} />
              </View>

              <Pressable style={styles.seeMore}>
                <Text style={styles.seeMoreText}>VER MAIS</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.pillWrap}>
          <Pressable style={styles.pill}><Text style={styles.pillText}>VER MAIS</Text></Pressable>
        </View>

        <View style={styles.hireWrap}>
          <Pressable style={styles.hire}>
            <Text style={styles.hireText}>CONTRATAR SERVIÇO +</Text>
          </Pressable>
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
  topbarRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarSm: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#b0865f',
    borderWidth: 2, borderColor: '#19b3e6', alignItems: 'center', justifyContent: 'center',
  },
  avatarSmText: { color: '#fff', fontSize: 13, fontFamily: FONT },
  hamburger: {
    width: 28, height: 28, borderRadius: 3, backgroundColor: '#e8e8e8',
    justifyContent: 'center', paddingHorizontal: 5, gap: 3,
  },
  bar: { height: 3, backgroundColor: '#1b365d', borderRadius: 2 },

  tabs: { flexDirection: 'row', backgroundColor: '#4a86d6' },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  tabBorder: { borderLeftWidth: 2, borderLeftColor: '#cdeeff' },
  tabText: { color: '#1b365d', fontSize: 17, fontFamily: FONT },

  searchWrap: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 10, justifyContent: 'center' },
  search: {
    backgroundColor: '#f4f4f4', borderWidth: 1, borderColor: '#b9c7d3', borderRadius: 20,
    paddingVertical: 8, paddingLeft: 14, paddingRight: 38, fontSize: 15, fontFamily: FONT, color: '#555',
  },
  searchIcon: { position: 'absolute', right: 28, top: 22 },

  sectionTitle: { backgroundColor: '#4a86d6', paddingVertical: 14, alignItems: 'center' },
  sectionTitleText: { color: '#1b365d', fontSize: 17, fontFamily: FONT },

  listBox: {
    marginTop: 18, marginHorizontal: 14, backgroundColor: '#fff',
    borderWidth: 3, borderColor: '#1f77c4', borderRadius: 10, overflow: 'hidden',
  },
  card: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingLeft: 10,
    borderBottomWidth: 1, borderBottomColor: '#c9d4e6',
  },
  avatarLg: {
    width: 54, height: 54, borderRadius: 27, borderWidth: 2, borderColor: '#1b365d',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarLgText: { color: '#fff', fontSize: 20, fontFamily: FONT },
  info: { flex: 1, marginLeft: 10 },
  infoHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  role: { fontSize: 19, fontFamily: FONT, color: '#111' },
  name: { fontSize: 17, fontFamily: FONT, color: '#777', marginVertical: 2 },
  seeMore: {
    alignSelf: 'stretch', width: 76, borderLeftWidth: 1, borderLeftColor: '#c9d4e6',
    alignItems: 'center', justifyContent: 'center',
  },
  seeMoreText: { color: '#aaa', fontSize: 16, fontFamily: FONT },

  status: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#e3e3e3',
    borderRadius: 10, paddingVertical: 2, paddingLeft: 3, paddingRight: 8,
  },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#4cd964' },
  statusText: { fontSize: 11, color: '#666', fontFamily: FONT },

  pillWrap: { alignItems: 'center', marginTop: -14 },
  pill: {
    backgroundColor: '#fff', borderWidth: 3, borderColor: '#4a86d6', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 1,
  },
  pillText: { color: '#999', fontSize: 15, fontFamily: FONT },

  hireWrap: { alignItems: 'flex-end', paddingHorizontal: 14, marginTop: 20 },
  hire: {
    backgroundColor: '#1f77c4', borderWidth: 3, borderColor: '#1b66b0', borderRadius: 8,
    paddingVertical: 12, paddingHorizontal: 18,
  },
  hireText: { color: '#6fb4ef', fontSize: 19, fontFamily: FONT },
});