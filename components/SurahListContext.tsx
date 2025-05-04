import React, { createContext, useContext, useEffect, useState } from 'react';

interface Surah {
  nomor: number;
  namaLatin: string;
  [key: string]: any;
}

interface SurahListContextType {
  daftarSurat: Surah[];
  loading: boolean;
  error: string;
}

const SurahListContext = createContext<SurahListContextType>({
  daftarSurat: [],
  loading: true,
  error: '',
});

export const SurahListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [daftarSurat, setDaftarSurat] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(res => {
        setDaftarSurat(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal memuat daftar surat');
        setLoading(false);
      });
  }, []);

  return (
    <SurahListContext.Provider value={{ daftarSurat, loading, error }}>
      {children}
    </SurahListContext.Provider>
  );
};

export const useSurahList = () => useContext(SurahListContext); 