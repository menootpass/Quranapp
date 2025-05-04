import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';

export default function JadwalShalatScreen() {
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    imsak: false,
    subuh: false,
    dzuhur: false,
    ashar: false,
    maghrib: false,
    isya: false,
  });
  const [fontsLoaded] = useFonts({ Heavitas: require('../../assets/fonts/Heavitas.ttf') });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [prayerTimes, setPrayerTimes] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Get current time in WIB (UTC+7)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      setCurrentTime(new Date(utc + 7 * 3600000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Izin lokasi ditolak');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetch(`https://waktu-sholat.vercel.app/prayer?latitude=${location.latitude}&longitude=${location.longitude}`)
        .then(res => res.json())
        .then(data => {
          setPrayerTimes(data.data); // simpan data jadwal sholat ke state
        });
    }
  }, [location]);

  // Format time as HH.mm
  const digitalTime = `${currentTime.getHours().toString().padStart(2, '0')}.${currentTime.getMinutes().toString().padStart(2, '0')}`;

  // Calculate clock hand angle
  const hour = currentTime.getHours() % 12;
  const minute = currentTime.getMinutes();
  const angle = (hour * 30) + (minute * 0.5) - 90; // -90 to start from top

  if (!fontsLoaded) return null;

  const handleSwitch = (key: string) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Jadwal Shalat' }} />
      <Text style={styles.title}>JADWAL SHALAT</Text>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Text style={styles.headerDate}>10 RAMADHAN 1446 H</Text>
        <Text style={styles.headerTime}>{digitalTime}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.menujuWaktu}>MENUJU WAKTU</Text>
            <Text style={styles.headerDzuhur}>DZUHUR</Text>
            <Text style={styles.headerSub}>PUKUL : {digitalTime}</Text>
            <Text style={styles.headerLoc}>KEC GONDOKUSUMAN, YOGYAKARTA, INDONESIA</Text>
            <Text style={styles.headerSisa}>TERSISA 10 MENIT</Text>
          </View>
          {/* Clock Illustration */}
          <View style={styles.clockCircle}>
            <Image
              source={require('../../assets/images/compas.png')}
              style={[styles.compassImage, { transform: [{ rotate: `${angle}deg` }] }]}
            />
          </View>
        </View>
      </View>
      {/* Prayer List */}
      <View style={styles.prayerList}>
        {prayerTimes ? (
          <>
            <PrayerRow label="IMSAK" time={prayerTimes.imsak} value={switches.imsak} onValueChange={() => handleSwitch('imsak')} />
            <PrayerRow label="SUBUH" time={prayerTimes.subuh} value={switches.subuh} onValueChange={() => handleSwitch('subuh')} />
            <PrayerRow label="DZUHUR" time={prayerTimes.dzuhur} value={switches.dzuhur} onValueChange={() => handleSwitch('dzuhur')} />
            <PrayerRow label="ASHAR" time={prayerTimes.ashar} value={switches.ashar} onValueChange={() => handleSwitch('ashar')} />
            <PrayerRow label="MAGHRIB" time={prayerTimes.maghrib} value={switches.maghrib} onValueChange={() => handleSwitch('maghrib')} />
            <PrayerRow label="ISYA" time={prayerTimes.isya} value={switches.isya} onValueChange={() => handleSwitch('isya')} />
          </>
        ) : (
          <Text style={{ color: '#6B4F27', textAlign: 'center', marginTop: 16 }}>Memuat jadwal sholat...</Text>
        )}
      </View>
    </View>
  );
}

function CustomSwitch({ value, onValueChange }: { value: boolean; onValueChange: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onValueChange}
      style={[styles.customSwitch, value && styles.customSwitchActive]}
    >
      <View style={[styles.customSwitchThumb, value && styles.customSwitchThumbActive]} />
    </TouchableOpacity>
  );
}

function PrayerRow({ label, time, value, onValueChange }: { label: string; time: string; value: boolean; onValueChange: () => void }) {
  return (
    <View style={styles.prayerRow}>
      <View>
        <Text style={styles.prayerLabel}>{label}</Text>
        <Text style={styles.prayerTime}>{time}</Text>
      </View>
      <CustomSwitch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#CACAC2',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Heavitas',
    color: '#5d4539',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 1,
  },
  headerCard: {
    width: '92%',
    backgroundColor: '#6B4F27',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    marginTop: 4,
    alignSelf: 'center',
  },
  headerDate: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 15,
    letterSpacing: 2,
    marginBottom: 2,
  },
  headerTime: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 18,
    marginBottom: 8,
  },
  menujuWaktu: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: 1,
  },
  headerDzuhur: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 22,
    marginBottom: 2,
    letterSpacing: 1,
  },
  headerSub: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 13,
    marginBottom: 2,
  },
  headerLoc: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 11,
    marginBottom: 2,
  },
  headerSisa: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 1,
  },
  clockCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#CACAC2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    position: 'relative',
  },
  compassImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  prayerList: {
    width: '92%',
    marginTop: 8,
  },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B7766',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  prayerLabel: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 2,
  },
  prayerTime: {
    color: '#fff',
    fontFamily: 'Heavitas',
    fontSize: 14,
    letterSpacing: 1,
  },
  customSwitch: {
    width: 48,
    height: 28,
    borderRadius: 16,
    backgroundColor: '#CACAC2',
    justifyContent: 'center',
    padding: 3,
    alignItems: 'flex-end',
  },
  customSwitchActive: {
    backgroundColor: '#CACAC2',
  },
  customSwitchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#5d4539',
    position: 'absolute',
    right: 3,
    top: 4,
    // transition for smooth movement
  },
  customSwitchThumbActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5d4539',
    right: 25,
  },
}); 