import React from 'react';
import { View, StyleSheet } from 'react-native';
import SheetView from '../components/SheetView';

export default function StudentDashboard() {
  return (
    <View style={styles.container}>
      <SheetView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
});
