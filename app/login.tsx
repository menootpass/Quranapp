import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/quran-bg.png')}
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.label}>E-MAIL OR USERNAME</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email or username"
            placeholderTextColor="#bdbdbd"
            autoCapitalize="none"
          />
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#bdbdbd"
            secureTextEntry
          />
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
            <Text style={styles.socialText}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={20} color="#1877F3" style={{ marginRight: 8 }} />
            <Text style={styles.socialText}>CONTINUE WITH FACEBOOK</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Ionicons name="checkmark" size={16} color="#7B5E3C" />}
              </View>
              <Text style={styles.rememberMe}>REMEMBER ME</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgot}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  card: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
    marginTop: 10,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15,
    marginBottom: 10,
    color: '#7B5E3C',
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0dbd2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 2,
  },
  socialText: {
    color: '#7B5E3C',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#7B5E3C',
    backgroundColor: '#fff',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#e0dbd2',
    borderColor: '#7B5E3C',
  },
  rememberMe: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  forgot: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#bdb5a7',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  signInText: {
    color: '#7B5E3C',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  signUpButton: {
    backgroundColor: '#bdb5a7',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#7B5E3C',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
}); 