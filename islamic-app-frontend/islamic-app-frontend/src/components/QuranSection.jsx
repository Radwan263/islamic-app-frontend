import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './QuranSection.css'; // سنضيف بعض التنسيقات لاحقًا

const QuranSection = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useRef لتخزين مراجع عناصر السور
  const surahRefs = useRef({});

  // 1. جلب قائمة السور عند تحميل المكون لأول مرة
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('فشل تحميل قائمة السور. يرجى المحاولة مرة أخرى.');
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  // 2. جلب آيات السورة المحددة
  const fetchAyahs = async (surahNumber) => {
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      setAyahs(response.data.data.ayahs);
    } catch (err) {
      setError('فشل تحميل آيات السورة.');
    }
  };

  // 3. التعامل مع تغيير السورة من القائمة المنسدلة
  const handleSurahChange = (event) => {
    const surahNumber = event.target.value;
    if (surahNumber) {
      const surah = surahs.find(s => s.number == surahNumber);
      setSelectedSurah(surah);
      fetchAyahs(surahNumber);
      
      // الانتقال السلس إلى بداية قسم عرض الآيات
      const ayahsContainer = document.getElementById('ayahs-display-container');
      if (ayahsContainer) {
        ayahsContainer.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setSelectedSurah(null);
      setAyahs([]);
    }
  };

  if (loading) return <p className="quran-status">جاري تحميل البيانات...</p>;
  if (error) return <p className="quran-status error">{error}</p>;

  return (
    <div className="quran-section-container">
      <h2 className="quran-title">القرآن الكريم</h2>

      {/* --- القائمة المنسدلة لاختيار السورة --- */}
      <div className="surah-selector-container">
        <label htmlFor="surah-select">اختر السورة:</label>
        <select id="surah-select" onChange={handleSurahChange} defaultValue="">
          <option value="" disabled>-- قائمة السور --</option>
          {surahs.map(surah => (
            <option key={surah.number} value={surah.number}>
              {surah.number}. {surah.name} ({surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'})
            </option>
          ))}
        </select>
      </div>

      {/* --- قسم عرض الآيات للسورة المختارة --- */}
      <div id="ayahs-display-container">
        {selectedSurah && (
          <div className="surah-content">
            <h3>سورة {selectedSurah.name}</h3>
            {/* إضافة البسملة إذا لم تكن السورة هي التوبة */}
            {selectedSurah.number !== 9 && (
              <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            )}
            {ayahs.map(ayah => (
              <p key={ayah.number} className="ayah-text">
                {ayah.text} <span className="ayah-number">({ayah.numberInSurah})</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranSection;
