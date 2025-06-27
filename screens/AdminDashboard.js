import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { appendToSheet } from '../services/sheetAPI';

export default function AdminDashboard() {
  const [event, setEvent] = useState('');
  const [income, setIncome] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!event || !income || !expenditure) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    // file.uri is a local file path (optional: upload to cloud)
    const fileUrl = file ? file.uri : '';

    const result = await appendToSheet({
      event,
      income,
      expenditure,
      fileUrl,
    });

    if (result.success) {
      Alert.alert('Success', 'Data added to sheet');
      setEvent('');
      setIncome('');
      setExpenditure('');
      setFile(null);
    } else {
      Alert.alert('Error', 'Failed to add data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={event}
        onChangeText={setEvent}
      />
      <TextInput
        style={styles.input}
        placeholder="Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
      <TextInput
        style={styles.input}
        placeholder="Expenditure"
        keyboardType="numeric"
        value={expenditure}
        onChangeText={setExpenditure}
      />

      <Button title="Pick File" onPress={pickFile} />
      {file && <Text style={styles.fileName}>Selected: {file.name}</Text>}

      <Button title="Add to Sheet" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 6, padding: 10, marginBottom: 12 },
  fileName: { marginVertical: 10, fontStyle: 'italic' },
});
