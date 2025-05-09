// src/screens/HistoryScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TimerContext } from '../context/TimerContext';

export default function HistoryScreen() {
  const { state } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      <FlatList
        data={state.history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{new Date(item.completedAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { marginVertical: 5, padding: 10, borderWidth: 1, borderRadius: 6 }
});
