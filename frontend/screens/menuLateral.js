import React from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';

// Menu lateral. Os itens só fecham o menu (ainda não navegam); "Sair" encerra a sessão.
export default function MenuLateral({ visible, onClose, itens = [], onSair }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable style={styles.overlay} onPress={onClose} />

        <View style={styles.panel}>
          <View style={styles.header}>
            <Text style={styles.title}>MENU</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.close}>×</Text>
            </Pressable>
          </View>

          {itens.map((item) => (
            <Pressable
              key={item}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              onPress={onClose}
            >
              <Text style={styles.itemText}>{item}</Text>
            </Pressable>
          ))}

          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            onPress={() => {
              onClose();
              if (onSair) onSair();
            }}
          >
            <Text style={[styles.itemText, { color: '#ff9b9b' }]}>Sair</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  panel: { width: 270, backgroundColor: '#1b365d', paddingTop: 48 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  title: { color: '#fff', fontSize: 22, fontFamily: 'BebasNeue_400Regular', letterSpacing: 1 },
  close: { color: '#fff', fontSize: 32, lineHeight: 32 },
  item: {
    paddingVertical: 16, paddingHorizontal: 18,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  pressed: { backgroundColor: 'rgba(255,255,255,0.08)' },
  itemText: { color: '#fff', fontSize: 20, fontFamily: 'BebasNeue_400Regular' },
});