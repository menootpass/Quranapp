import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function SelectionScreen() {
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
            <Text style={styles.title}>KAMU INGIN DIBIMBING OLEH</Text>
            
            <View style={styles.optionsContainer}>
              <Link href="/menu" asChild>
                <TouchableOpacity style={styles.optionButton}>
                  <Image 
                    source={require('../assets/images/ustadzah-icon.png')}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>USTADZAH</Text>
                </TouchableOpacity>
              </Link>

              <Text style={styles.orText}>ATAU</Text>

              <Link href="/menu" asChild>
                <TouchableOpacity style={styles.optionButton}>
                  <Image 
                    source={require('../assets/images/ustadz-icon.png')}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>USTADZ</Text>
                </TouchableOpacity>
              </Link>
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Heavitas',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  optionButton: {
    backgroundColor: 'rgba(202, 202, 194, 1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  optionImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Heavitas',
  },
  orText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Heavitas',
    marginVertical: 10,
  },
}); 