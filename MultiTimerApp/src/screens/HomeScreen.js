// src/screens/HomeScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, SectionList, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TimerContext } from '../context/TimerContext';
import uuid from 'react-native-uuid';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(TimerContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTimer, setNewTimer] = useState({ name: '', duration: '', category: '' });

  const startTimer = (timer) => {
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          id: timer.id,
          updates: {
            duration: timer.duration - 1,
            status: 'Running'
          }
        }
      });

      if (timer.duration - 1 <= 0) {
        clearInterval(interval);
        dispatch({
          type: 'COMPLETE_TIMER',
          payload: {
            id: timer.id,
            log: {
              name: timer.name,
              completedAt: new Date().toISOString()
            }
          }
        });
        alert(`Timer Complete: ${timer.name}`);
      }
    }, 1000);
  };

  const addTimer = () => {
    dispatch({
      type: 'ADD_TIMER',
      payload: {
        id: uuid.v4(),
        ...newTimer,
        duration: parseInt(newTimer.duration),
        originalDuration: parseInt(newTimer.duration),
        status: 'Paused'
      }
    });
    setModalVisible(false);
    setNewTimer({ name: '', duration: '', category: '' });
  };

  const groupedTimers = Object.values(
    state.timers.reduce((acc, timer) => {
      if (!acc[timer.category]) acc[timer.category] = { title: timer.category, data: [] };
      acc[timer.category].data.push(timer);
      return acc;
    }, {})
  );

  return (
    <View style={styles.container}>
      <Button title="Add Timer" onPress={() => setModalVisible(true)} />
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <SectionList
        sections={groupedTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.timerBox}>
            <Text>{item.name}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Remaining: {item.duration}s</Text>
            <View style={styles.actions}>
              <Button title="Start" onPress={() => startTimer(item)} />
              <Button title="Pause" onPress={() => dispatch({ type: 'UPDATE_TIMER', payload: { id: item.id, updates: { status: 'Paused' } } })} />
              <Button title="Reset" onPress={() => dispatch({ type: 'UPDATE_TIMER', payload: { id: item.id, updates: { duration: item.originalDuration, status: 'Paused' } } })} />
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput placeholder="Name" value={newTimer.name} onChangeText={text => setNewTimer({ ...newTimer, name: text })} />
          <TextInput placeholder="Duration (s)" keyboardType="numeric" value={newTimer.duration} onChangeText={text => setNewTimer({ ...newTimer, duration: text })} />
          <TextInput placeholder="Category" value={newTimer.category} onChangeText={text => setNewTimer({ ...newTimer, category: text })} />
          <Button title="Save" onPress={addTimer} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  sectionHeader: { fontWeight: 'bold', fontSize: 18, backgroundColor: '#eee', padding: 5 },
  timerBox: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  modalContent: { flex: 1, justifyContent: 'center', padding: 20 }
});
