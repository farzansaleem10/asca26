import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple role check by email domain or ID (for demo)
    if (email === 'asca@admin.com') {
      navigation.navigate('AdminDashboard');
    } else {
      navigation.navigate('StudentDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});
