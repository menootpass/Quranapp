import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function MenuScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Heavitas': require('../assets/fonts/Heavitas.ttf'),
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/images/quran-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.card}>
            <MenuButton label="BACA AL QURAN" onPress={() => router.push('../baca-quran')} />
            <MenuButton label="TAFSIR QURAN" onPress={() => router.push('../tafsir-quran')} />
            <MenuButton label="HAFALAN QURAN" onPress={() => router.push('../hafalan-quran')} />
            <MenuButton label="MORFOLOGI AL QURAN" onPress={() => router.push('../morfologi-quran')} />
            <MenuButton label="JADWAL SHALAT" onPress={() => router.push('../jadwal-shalat')} />
            <MenuButton label="PENGATURAN" onPress={() => router.push('../pengaturan')} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

function MenuButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.menuButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    color: 'rgba(93,69,57,1)'
  },
  menuButton: {
    backgroundColor: 'rgba(202,202,194,1)',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  menuButtonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Heavitas',
    letterSpacing: 1,
  },
}); 