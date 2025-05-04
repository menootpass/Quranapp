import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react';
import { useSurahList } from '../../components/SurahListContext';
import { useFonts } from 'expo-font';
import { useSettings } from '../../components/SettingsContext';

export default function SurahDetailScreen() {
  // const [fontsLoaded] = useFonts({
  //   Usmanic: require('../../assets/fonts/Usmanic.otf'),
  // });
  const { nomor, ayat } = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollRef = useRef<ScrollView | null>(null);
  const ayatRefs = useRef<Record<string, View | null>>({});
  const { settings } = useSettings();

  // Ambil daftar surat dari context
  const { daftarSurat } = useSurahList();
  const nomorInt = parseInt(nomor as string, 10);
  const prevNomor = nomorInt > 1 ? nomorInt - 1 : null;
  const nextNomor = nomorInt < 114 ? nomorInt + 1 : null;
  const getNamaLatin = (no: number | null) => {
    if (!no) return '';
    const surat = daftarSurat.find(s => s.nomor === no);
    return surat ? surat.namaLatin : '';
  };

  // if (!fontsLoaded) return null;

  useEffect(() => {
    setLoading(true);
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal memuat data');
        setLoading(false);
      });
  }, [nomor]);

  useEffect(() => {
    if (!loading && data && ayat && ayatRefs.current[String(ayat)] && scrollRef.current) {
      ayatRefs.current[String(ayat)]?.measureLayout(
        scrollRef.current.getInnerViewNode(),
        (x: number, y: number) => {
          scrollRef.current?.scrollTo({ y, animated: true });
        }
      );
    }
  }, [loading, data, ayat]);

  if (loading) {
    return <ActivityIndicator size="large" color="#7B5E3C" style={{ flex: 1, marginTop: 64 }} />;
  }
  if (error || !data) {
    return <Text style={{ color: 'red', textAlign: 'center', marginTop: 64 }}>{error || 'Data tidak ditemukan'}</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: data.namaLatin }} />
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.juzLabel}>JUZ {data.juzTerakhir || 1}</Text>
          <Text style={styles.surahTitle}>{data.nomor}. {data.namaLatin}</Text>
          <Text style={styles.surahSub}>{data.arti?.toUpperCase()}</Text>
          <Text style={styles.surahInfo}>{data.tempatTurun?.toUpperCase()} | {data.jumlahAyat} AYAT</Text>
        </View>
        <Image source={require('../../assets/images/quran-icon-surah.png')} style={styles.headerIcon} />
      </View>

      {/* Tab Navigasi Surat */}
      <View style={styles.tabSwitcher}>
        {prevNomor && (
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => router.push(`/baca-quran/${prevNomor}`)}
          >
            <Text style={styles.tabText}>{getNamaLatin(prevNomor)}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.tabButton, styles.tabActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>{data.namaLatin}</Text>
        </TouchableOpacity>
        {nextNomor && (
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => router.push(`/baca-quran/${nextNomor}`)}
          >
            <Text style={styles.tabText}>{getNamaLatin(nextNomor)}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List Ayat */}
      <ScrollView ref={scrollRef} style={styles.ayatList} showsVerticalScrollIndicator={false}>
        {data.ayat?.map((ayatObj: any) => (
          <View
            key={ayatObj.nomorAyat}
            style={styles.ayatItem}
            ref={ref => ayatRefs.current[String(ayatObj.nomorAyat)] = ref}
          >
            <View style={styles.ayatNo}><Text style={styles.ayatNoText}>{ayatObj.nomorAyat}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={[
                styles.arabic, 
                { 
                  fontFamily: settings.arabicFontType === 'USTMANI' ? 'Usmanic' : 'System',
                  fontSize: settings.arabicFontSize
                }
              ]}>{ayatObj.teksArab}</Text>
              {settings.isLatinEnabled && (
                <Text style={[styles.latin, { fontSize: settings.latinFontSize }]}>{ayatObj.teksLatin}</Text>
              )}
              {settings.isTranslationEnabled && (
                <Text style={[styles.translation, { fontSize: settings.translationFontSize }]}>{ayatObj.teksIndonesia}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B5E3C',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  juzLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  surahTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  surahSub: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  surahInfo: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 2,
  },
  headerIcon: {
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
  ayatList: {
    flex: 1,
    marginTop: 4,
  },
  ayatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D2C4',
  },
  ayatNo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  ayatNoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  arabic: {
    color: '#6B4F27',
    textAlign: 'right',
    marginBottom: 4,
    fontWeight: '500',
  },
  latin: {
    color: '#A89B8E',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  translation: {
    color: '#6B4F27',
    fontWeight: 'bold',
    marginBottom: 2,
  },
}); 