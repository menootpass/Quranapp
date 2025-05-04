import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Switch, Platform, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useSettings } from '../../components/SettingsContext';
import { Picker } from '@react-native-picker/picker';

export default function PengaturanScreen() {
  const { settings, updateSettings } = useSettings();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Heavitas: require('../../assets/fonts/Heavitas.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../../assets/images/quran-bg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Stack.Screen options={{ title: 'Pengaturan' }} />
          <Text style={styles.title}>PENGATURAN</Text>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileIconWrapper}>
              <Image source={require('../../assets/images/icon.png')} style={styles.profileIcon} />
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/login')}>
              <Text style={styles.signInText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
          {/* Settings List */}
          <View style={styles.settingsList}>
            <SettingSwitch
              label="AKTIFKAN TERJEMAHAN"
              value={settings.isTranslationEnabled}
              onValueChange={(value) => updateSettings({ isTranslationEnabled: value })}
            />
            <SettingSwitch
              label="AKTIFKAN LATIN"
              value={settings.isLatinEnabled}
              onValueChange={(value) => updateSettings({ isLatinEnabled: value })}
            />
            <SettingSwitch
              label="TERJEMAHAN PERKATA"
              value={settings.isWordTranslationEnabled}
              onValueChange={(value) => updateSettings({ isWordTranslationEnabled: value })}
            />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>UKURAN FONT ARABIC</Text>
              <Picker
                selectedValue={settings.arabicFontSize}
                style={styles.settingPicker}
                onValueChange={(val: number) => updateSettings({ arabicFontSize: val })}
                dropdownIconColor="#7B5E3C"
                mode="dropdown"
              >
                <Picker.Item label="20 px" value={20} />
                <Picker.Item label="25 px" value={25} />
                <Picker.Item label="30 px" value={30} />
                <Picker.Item label="40 px" value={40} />
              </Picker>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>UKURAN LATIN</Text>
              <Picker
                selectedValue={settings.latinFontSize}
                style={styles.settingPicker}
                onValueChange={(val: number) => updateSettings({ latinFontSize: val })}
                dropdownIconColor="#7B5E3C"
                mode="dropdown"
              >
                <Picker.Item label="20 px" value={20} />
                <Picker.Item label="25 px" value={25} />
                <Picker.Item label="30 px" value={30} />
                <Picker.Item label="40 px" value={40} />
              </Picker>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>UKURAN TERJEMAHAN</Text>
              <Picker
                selectedValue={settings.translationFontSize}
                style={styles.settingPicker}
                onValueChange={(val: number) => updateSettings({ translationFontSize: val })}
                dropdownIconColor="#7B5E3C"
                mode="dropdown"
              >
                <Picker.Item label="20 px" value={20} />
                <Picker.Item label="25 px" value={25} />
                <Picker.Item label="30 px" value={30} />
                <Picker.Item label="40 px" value={40} />
              </Picker>
            </View>
            <SettingButton 
              label="JENIS PENULISAN ARABIC" 
              value={settings.arabicFontType} 
            />
            <SettingButton 
              label="TEMA APLIKASI" 
              value={settings.theme} 
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

function SettingSwitch({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (val: boolean) => void }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <CustomSwitch value={value} onValueChange={onValueChange} />
    </View>
  );
}

function CustomSwitch({ value, onValueChange }: { value: boolean; onValueChange: (val: boolean) => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[styles.customSwitch, value && styles.customSwitchActive]}
    >
      <View style={[styles.customSwitchThumb, value && styles.customSwitchThumbActive]} />
    </TouchableOpacity>
  );
}

function SettingButton({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <TouchableOpacity style={styles.settingButton}>
        <Text style={styles.settingButtonText}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Heavitas',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(202,202,194,1)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 18,
    width: '100%',
  },
  profileIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  signInButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#5D4539',
    fontFamily: 'Heavitas',
    fontSize: 16,
  },
  settingsList: {
    width: '100%',
    marginTop: 8,
    backgroundColor: 'rgba(202,202,194,1)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 4,
  },
  settingLabel: {
    color: '#444',
    fontSize: 14,
    fontFamily: 'Heavitas',
    flex: 1,
  },
  settingButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  settingButtonText: {
    color: '#7B5E3C',
    fontFamily: 'Heavitas',
    fontSize: 13,
  },
  customSwitch: {
    width: 54,
    height: 29,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 3,
  },
  customSwitchActive: {
    backgroundColor: '#d0d0c7',
  },
  customSwitchThumb: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#5d4539',
    position: 'absolute',
    left: 3,
    top: 3,
    // transition for smooth movement
    // @ts-ignore
    transitionProperty: 'left',
    transitionDuration: '0.2s',
  },
  customSwitchThumbActive: {
    left: 28,
  },
  settingPicker: {
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    color: '#7B5E3C',
    fontFamily: 'Heavitas',
    fontSize: 13,
  },
}); 