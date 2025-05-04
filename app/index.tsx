import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function SplashScreen() {
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
          <View style={styles.content}>
            <Text style={styles.title}>AL QURAN DAN TAFSIR</Text>
            <Text style={styles.subtitle}>AL ALIM</Text>
            
            <Link href="/selection" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>MULAI</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Heavitas',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'Heavitas',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Heavitas',
  },
}); 