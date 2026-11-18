import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import MenuLateral from '../components/MenuLateral';
import Estrelas from '../components/Estrelas';
import StatusAtivo from '../components/StatusAtivo';
import { iniciais, MENU_CONTRATANTE } from '../tipos';

const FONT = 'BebasNeue_400Regular';

// Dados de exemplo (depois virão da API: listagem de prestadores, RF12)
const PROFISSIONAIS = [
  { id: 1, profissao: 'DIARISTA', nome: 'RITA MIRANDA MARAIA', nota: 4, cor: '#8a5a44', ini: 'RM' },
  { id: 2, profissao: 'CARPINTEIRO', nome: 'EMANUEL DOS SANTOS', nota: 4, cor: '#5b3a29', ini: 'ED' },
  { id: 3, profissao: 'PEDREIRO', nome: 'ANTONIO MARCOS DIAS', nota: 3, cor: '#6a8aa8', ini: 'AM' },
  { id: 4, profissao: 'MANICURE', nome: 'MARCIA MARIA MADALENA', nota: 2, cor: '#a0654a', ini: 'MM' },
];

export default function HomeContratante({ usuario, onOpenProfile, onSair }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <View style={styles.screen}>
      <TopBar
        iniciais={iniciais(usuario && usuario.nome)}
        foto={usuario && usuario.fotoPerfil}
        onPressAvatar={onOpenProfile}
        onOpenMenu={() => setMenuAberto(true)}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.tabs}>
          <Pressable style={styles.tab}><Text style={styles.tabText}>AVALIAÇÕES</Text></Pressable>
          <Pressable style={[styles.tab, styles.tabBorder]}>
            <Text style={styles.tabText}>VER SERVIÇOS CONTRATADOS</Text>
          </Pressable>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            style={styles.search}
            placeholder="PROCURAR SERVIÇOS E PROFISSIONAIS"
            placeholderTextColor="#aaa"
          />
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>CONHEÇA PROFISSIONAIS QUALIFICADOS</Text>
          <Text style={styles.bannerText}>PERTO DE VOCÊ</Text>
        </View>

        <View style={styles.listBox}>
          {PROFISSIONAIS.map((p, idx) => (
            <View
              key={p.id}
              style={[styles.card, idx === PROFISSIONAIS.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={[styles.avatarLg, { backgroundColor: p.cor }]}>
                <Text style={styles.avatarLgText}>{p.ini}</Text>
              </View>

              <View style={styles.info}>
                <View style={styles.infoHead}>
                  <Text style={styles.role}>{p.profissao}</Text>
                  <StatusAtivo />
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

      <MenuLateral
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        itens={MENU_CONTRATANTE}
        onSair={onSair}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#cdeeff' },

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

  banner: { backgroundColor: '#4a86d6', paddingVertical: 14, alignItems: 'center' },
  bannerText: { color: '#1b365d', fontSize: 17, fontFamily: FONT },

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