import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, StyleSheet } from 'react-native';
import TopBar from '../components/TopBar';
import MenuLateral from '../components/MenuLateral';
import Estrelas from '../components/Estrelas';
import { iniciais, primeiroNome, MENU_PRESTADOR } from '../tipos';

const FONT = 'BebasNeue_400Regular';

// Dados de exemplo (depois virão da API: agenda, avaliação média, pedidos)
const RESUMO = { nota: 4.5, concluidos: 12, novosPedidos: 3 };
const PROXIMOS = [
  { id: 1, data: 'HOJE • 14:00', servico: 'LIMPEZA RESIDENCIAL', cliente: 'JUNIOR E. DOS SANTOS', status: 'CONFIRMADO' },
  { id: 2, data: 'AMANHÃ • 09:30', servico: 'LIMPEZA PÓS-OBRA', cliente: 'CARLA FERREIRA', status: 'PENDENTE' },
  { id: 3, data: 'SEX • 16:00', servico: 'DIARISTA (DIA INTEIRO)', cliente: 'MARCOS LIMA', status: 'CONFIRMADO' },
];

export default function HomePrestador({ usuario, onOpenProfile, onSair }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [disponivel, setDisponivel] = useState(true); // campo "disponibilidade" do Prestador
  const [boostAtivo] = useState(false);

  const nomeCurto = primeiroNome(usuario && usuario.nome);

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
          <Pressable style={styles.tab}><Text style={styles.tabText}>AGENDA</Text></Pressable>
          <Pressable style={[styles.tab, styles.tabBorder]}>
            <Text style={styles.tabText}>HISTÓRICO DE PAGAMENTOS</Text>
          </Pressable>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>{nomeCurto ? `OLÁ, ${nomeCurto}!` : 'OLÁ!'}</Text>
          <Text style={styles.bannerText}>ACOMPANHE SEUS SERVIÇOS</Text>
        </View>

        {/* Disponibilidade */}
        <View style={styles.dispRow}>
          <Text style={styles.dispText}>
            {disponivel ? 'VOCÊ ESTÁ DISPONÍVEL PARA NOVOS SERVIÇOS' : 'VOCÊ ESTÁ INDISPONÍVEL'}
          </Text>
          <Switch
            value={disponivel}
            onValueChange={setDisponivel}
            trackColor={{ false: '#b5b5b5', true: '#4cd964' }}
          />
        </View>

        {/* Resumo */}
        <View style={styles.resumo}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoNum}>{RESUMO.nota.toFixed(1)}</Text>
            <Estrelas nota={RESUMO.nota} tamanho={14} />
            <Text style={styles.resumoLabel}>AVALIAÇÃO</Text>
          </View>
          <View style={[styles.resumoItem, styles.resumoBorda]}>
            <Text style={styles.resumoNum}>{RESUMO.concluidos}</Text>
            <Text style={styles.resumoLabel}>CONCLUÍDOS</Text>
          </View>
          <View style={[styles.resumoItem, styles.resumoBorda]}>
            <Text style={styles.resumoNum}>{RESUMO.novosPedidos}</Text>
            <Text style={styles.resumoLabel}>NOVOS PEDIDOS</Text>
          </View>
        </View>

        {/* Boost */}
        <View style={styles.boost}>
          <View style={{ flex: 1 }}>
            <Text style={styles.boostTitulo}>BOOST {boostAtivo ? '• ATIVO' : ''}</Text>
            <Text style={styles.boostTexto}>
              Apareça em destaque para os contratantes e receba mais pedidos.
            </Text>
          </View>
          <Pressable style={styles.boostBtn}>
            <Text style={styles.boostBtnText}>{boostAtivo ? 'GERENCIAR' : 'ATIVAR'}</Text>
          </Pressable>
        </View>

        {/* Próximos serviços */}
        <Text style={styles.secao}>PRÓXIMOS SERVIÇOS</Text>
        <View style={styles.listBox}>
          {PROXIMOS.map((s, idx) => (
            <View key={s.id} style={[styles.item, idx === PROXIMOS.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemData}>{s.data}</Text>
                <Text style={styles.itemServico}>{s.servico}</Text>
                <Text style={styles.itemCliente}>{s.cliente}</Text>
              </View>
              <View style={[styles.tag, s.status === 'PENDENTE' && styles.tagPendente]}>
                <Text style={styles.tagText}>{s.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pillWrap}>
          <Pressable style={styles.pill}><Text style={styles.pillText}>VER AGENDA</Text></Pressable>
        </View>

        <View style={styles.ctaWrap}>
          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>CADASTRAR SERVIÇO +</Text>
          </Pressable>
        </View>
      </ScrollView>

      <MenuLateral
        visible={menuAberto}
        onClose={() => setMenuAberto(false)}
        itens={MENU_PRESTADOR}
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

  banner: { backgroundColor: '#4a86d6', paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  bannerText: { color: '#1b365d', fontSize: 17, fontFamily: FONT },

  dispRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 14, marginTop: 14, paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: '#fff', borderRadius: 10,
  },
  dispText: { flex: 1, color: '#555', fontSize: 16, fontFamily: FONT, paddingRight: 8 },

  resumo: {
    flexDirection: 'row', marginHorizontal: 14, marginTop: 12, backgroundColor: '#fff',
    borderWidth: 3, borderColor: '#1f77c4', borderRadius: 10, paddingVertical: 10,
  },
  resumoItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  resumoBorda: { borderLeftWidth: 1, borderLeftColor: '#c9d4e6' },
  resumoNum: { fontSize: 28, color: '#1b365d', fontFamily: FONT },
  resumoLabel: { fontSize: 13, color: '#888', fontFamily: FONT },

  boost: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 14, marginTop: 12,
    backgroundColor: '#fff', borderRadius: 10, borderWidth: 2, borderColor: '#ffd600', padding: 12,
  },
  boostTitulo: { fontSize: 20, color: '#1b365d', fontFamily: FONT },
  boostTexto: { fontSize: 13, color: '#666', lineHeight: 18 },
  boostBtn: { backgroundColor: '#ffd600', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14 },
  boostBtnText: { color: '#1b365d', fontSize: 17, fontFamily: FONT },

  secao: { marginTop: 18, marginLeft: 16, fontSize: 19, color: '#1b365d', fontFamily: FONT },
  listBox: {
    marginTop: 6, marginHorizontal: 14, backgroundColor: '#fff',
    borderWidth: 3, borderColor: '#1f77c4', borderRadius: 10, overflow: 'hidden',
  },
  item: {
    flexDirection: 'row', alignItems: 'center', padding: 10,
    borderBottomWidth: 1, borderBottomColor: '#c9d4e6',
  },
  itemData: { fontSize: 14, color: '#1f77c4', fontFamily: FONT },
  itemServico: { fontSize: 18, color: '#111', fontFamily: FONT },
  itemCliente: { fontSize: 15, color: '#777', fontFamily: FONT },
  tag: { backgroundColor: '#4cd964', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  tagPendente: { backgroundColor: '#ffb84d' },
  tagText: { fontSize: 12, color: '#fff', fontFamily: FONT },

  pillWrap: { alignItems: 'center', marginTop: -14 },
  pill: {
    backgroundColor: '#fff', borderWidth: 3, borderColor: '#4a86d6', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 1,
  },
  pillText: { color: '#999', fontSize: 15, fontFamily: FONT },

  ctaWrap: { alignItems: 'flex-end', paddingHorizontal: 14, marginTop: 20 },
  cta: {
    backgroundColor: '#1f77c4', borderWidth: 3, borderColor: '#1b66b0', borderRadius: 8,
    paddingVertical: 12, paddingHorizontal: 18,
  },
  ctaText: { color: '#6fb4ef', fontSize: 19, fontFamily: FONT },
});