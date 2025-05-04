import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

const JUZ_LIST = [
  { nomor: 1,  title: 'JUZ 1',  start: 'AL FATIHAH AYAT 1', surah: 1, ayat: 1 },
  { nomor: 2,  title: 'JUZ 2',  start: 'AL BAQARAH AYAT 142', surah: 2, ayat: 142 },
  { nomor: 3,  title: 'JUZ 3',  start: 'AL BAQARAH AYAT 253', surah: 2, ayat: 253 },
  { nomor: 4,  title: 'JUZ 4',  start: 'ALI IMRAN AYAT 92', surah: 3, ayat: 92 },
  { nomor: 5,  title: 'JUZ 5',  start: 'AN NISA AYAT 24', surah: 4, ayat: 24 },
  { nomor: 6,  title: 'JUZ 6',  start: 'AN NISA AYAT 148', surah: 4, ayat: 148 },
  { nomor: 7,  title: 'JUZ 7',  start: 'AL MAIDAH AYAT 82', surah: 5, ayat: 82 },
  { nomor: 8,  title: 'JUZ 8',  start: 'AL ANFAL AYAT 41', surah: 8, ayat: 41 },
  { nomor: 9,  title: 'JUZ 9',  start: 'AL ARAF AYAT 88', surah: 7, ayat: 88 },
  { nomor: 10, title: 'JUZ 10', start: 'AT TAUBAH AYAT 41', surah: 9, ayat: 41 },
  { nomor: 11, title: 'JUZ 11', start: 'AT TAUBAH AYAT 94', surah: 9, ayat: 94 },
  { nomor: 12, title: 'JUZ 12', start: 'HUD AYAT 6', surah: 11, ayat: 6 },
  { nomor: 13, title: 'JUZ 13', start: 'YUSUF AYAT 53', surah: 12, ayat: 53 },
  { nomor: 14, title: 'JUZ 14', start: 'AL HIJR AYAT 1', surah: 15, ayat: 1 },
  { nomor: 15, title: 'JUZ 15', start: 'AL ISRA AYAT 1', surah: 17, ayat: 1 },
  { nomor: 16, title: 'JUZ 16', start: 'AL KAHFI AYAT 75', surah: 18, ayat: 75 },
  { nomor: 17, title: 'JUZ 17', start: 'AL ANBIYA AYAT 1', surah: 21, ayat: 1 },
  { nomor: 18, title: 'JUZ 18', start: 'AL MUKMINUN AYAT 1', surah: 23, ayat: 1 },
  { nomor: 19, title: 'JUZ 19', start: 'AL FURQAN AYAT 21', surah: 25, ayat: 21 },
  { nomor: 20, title: 'JUZ 20', start: 'AN NAML AYAT 56', surah: 27, ayat: 56 },
  { nomor: 21, title: 'JUZ 21', start: 'AL ANKABUT AYAT 46', surah: 29, ayat: 46 },
  { nomor: 22, title: 'JUZ 22', start: 'AL AHZAB AYAT 31', surah: 33, ayat: 31 },
  { nomor: 23, title: 'JUZ 23', start: 'YA SIN AYAT 28', surah: 36, ayat: 28 },
  { nomor: 24, title: 'JUZ 24', start: 'AZ ZUMAR AYAT 32', surah: 39, ayat: 32 },
  { nomor: 25, title: 'JUZ 25', start: 'FUSSILAT AYAT 47', surah: 41, ayat: 47 },
  { nomor: 26, title: 'JUZ 26', start: 'AL AHQAF AYAT 1', surah: 46, ayat: 1 },
  { nomor: 27, title: 'JUZ 27', start: 'AZ ZARIYAT AYAT 31', surah: 51, ayat: 31 },
  { nomor: 28, title: 'JUZ 28', start: 'AL MUJADILAH AYAT 1', surah: 58, ayat: 1 },
  { nomor: 29, title: 'JUZ 29', start: 'AL MULK AYAT 1', surah: 67, ayat: 1 },
  { nomor: 30, title: 'JUZ 30', start: 'AN NABA AYAT 1', surah: 78, ayat: 1 },
];

export default function BacaQuranScreen() {
  const [surahList, setSurahList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'SURAH' | 'JUZ' | 'RUKU'>('SURAH');
  const router = useRouter();
  const [fontsLoaded] = useFonts({ Heavitas: require('../../assets/fonts/Heavitas.ttf') });
  if (!fontsLoaded) return null;

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then((res) => res.json())
      .then((data) => {
        setSurahList(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal memuat data');
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Baca Al Quran' }} />
      {/* Header */}
      <Text style={styles.header}>AL QURAN</Text>

      {/* Last Read Card */}
      <View style={styles.lastReadCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.lastReadLabel}>TERAKHIR DIBACA</Text>
          <Text style={styles.lastReadSurah}>2. AL BAQARAH</Text>
          <Text style={styles.lastReadAyat}>AYAT : 280</Text>
        </View>
        <Image source={require('../../assets/images/quran-icon-surah.png')} style={styles.headerIcon} />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'SURAH' && styles.tabActive]} onPress={() => setActiveTab('SURAH')}>
          <Text style={[styles.tabText, activeTab === 'SURAH' && styles.tabTextActive]}>SURAH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'JUZ' && styles.tabActive]} onPress={() => setActiveTab('JUZ')}>
          <Text style={[styles.tabText, activeTab === 'JUZ' && styles.tabTextActive]}>JUZ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'RUKU' && styles.tabActive]} onPress={() => setActiveTab('RUKU')}>
          <Text style={[styles.tabText, activeTab === 'RUKU' && styles.tabTextActive]}>RUKU'</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {activeTab === 'SURAH' ? (
        loading ? (
          <ActivityIndicator size="large" color="#7B5E3C" style={{ marginTop: 32 }} />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>{error}</Text>
        ) : (
          <ScrollView style={styles.surahList} showsVerticalScrollIndicator={false}>
            {surahList.map((surah) => (
              <TouchableOpacity key={surah.nomor} style={styles.surahItem} onPress={() => router.push(`/baca-quran/${surah.nomor}`)}>
                <View style={styles.surahNo}><Text style={styles.surahNoText}>{surah.nomor}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.surahName}>{surah.namaLatin}</Text>
                  <Text style={styles.surahMeta}>{surah.tempatTurun.toUpperCase()} | {surah.jumlahAyat} AYAT</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
      ) : activeTab === 'JUZ' ? (
        <ScrollView style={styles.surahList} showsVerticalScrollIndicator={false}>
          {JUZ_LIST.map((juz) => (
            <TouchableOpacity key={juz.nomor} style={styles.juzItem} onPress={() => router.push(`/baca-quran/${juz.surah}?ayat=${juz.ayat}`)}>
              <View style={styles.juzNo}><Text style={styles.juzNoText}>{juz.nomor}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.juzTitle}>{juz.title}</Text>
                <Text style={styles.juzMeta}>MULAI : {juz.start}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Coming soon...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE7DD',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B4F27',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 2,
  },
  lastReadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B5E3C',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  lastReadLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
    letterSpacing: 1,
  },
  lastReadSurah: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lastReadAyat: {
    color: '#fff',
    fontSize: 14,
  },
  lastReadIcon: {
    marginLeft: 12,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#D6D2C4',
    borderRadius: 16,
    marginBottom: 12,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#7B5E3C',
  },
  tabText: {
    color: '#7B5E3C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#fff',
  },
  surahList: {
    flex: 1,
    marginTop: 4,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D2C4',
  },
  surahNo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D6D2C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  surahNoText: {
    color: '#7B5E3C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  surahName: {
    color: '#6B4F27',
    fontWeight: 'bold',
    fontSize: 16,
  },
  surahMeta: {
    color: '#A89B8E',
    fontSize: 12,
    marginTop: 2,
  },
  juzItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D2C4',
  },
  juzNo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  juzNoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Heavitas',
  },
  juzTitle: {
    color: '#6B4F27',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Heavitas',
  },
  juzMeta: {
    color: '#A89B8E',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Heavitas',
  },
  headerIcon: {
    width: 112,
    height: 140,
    marginLeft: 12,
    resizeMode: 'contain',
  },
}); 