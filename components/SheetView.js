import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getSheetData } from '../services/sheetAPI';

export default function SheetView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      const result = await getSheetData();
      if (result.success) {
        setData(result.data);
      } else {
        setError('Failed to load sheet data');
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal>
      <View style={styles.table}>
        {data.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((cell, j) => (
              <Text key={j} style={styles.cell}>{cell}</Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    padding: 6,
    textAlign: 'center',
  },
  loader: {
    marginTop: 40,
  },
  errorBox: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#ffeeee',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
