import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function MorfologiQuranScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Morfologi Al Quran' }} />
      <Text style={styles.title}>Morfologi Al Quran</Text>
      {/* Content will be added here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 