import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SharedLayout.css'; // <-- 1. استيراد ملف التصميم المشترك

const QuranSection = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahDetails, setSurahDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then(response => {
        setSurahs(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching surahs:", error);
      });
  }, []);

  const handleSurahChange = (event) => {
    const surahNumber = event.target.value;
    setSelectedSurah(surahNumber);
    setLoading(true);
    setSurahDetails(null);

    axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then(response => {
        setSurahDetails(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching surah details:", error);
        setLoading(false);
      });
  };

  // --- 2. تغليف كل شيء بالحاويات التصميمية الجديدة ---
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 style={{ fontFamily: 'Amiri, serif', color: '#5d4037', textAlign: 'center' }}>
          القرآن الكريم
        </h1>
        
        <select onChange={handleSurahChange} defaultValue="" style={selectStyle}>
          <option value="" disabled>اختر سورة...</option>
          {surahs.map(surah => (
            <option key={surah.number} value={surah.number}>
              {surah.number} - {surah.name} ({surah.englishName})
            </option>
          ))}
        </select>

        {loading && <p style={{ textAlign: 'center' }}>جاري التحميل...</p>}

        {surahDetails && (
          <div style={{ marginTop: '20px', direction: 'rtl' }}>
            <h2 style={{ fontFamily: 'Amiri, serif', color: '#5d4037' }}>
              {surahDetails.name}
            </h2>
            <div style={ayahContainerStyle}>
              {surahDetails.ayahs.map(ayah => (
                <p key={ayah.number} style={ayahStyle}>
                  {ayah.text} <span style={ayahNumberStyle}>({ayah.numberInSurah})</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. إضافة بعض التنسيقات المباشرة لتحسين المظهر الداخلي ---
const selectStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontFamily: 'Amiri, serif',
  marginBottom: '20px'
};

const ayahContainerStyle = {
  borderTop: '2px solid #e6c56c',
  paddingTop: '15px',
  marginTop: '15px'
};

const ayahStyle = {
  fontSize: '22px',
  lineHeight: '2.5',
  borderBottom: '1px solid #eee',
  paddingBottom: '15px',
  marginBottom: '15px'
};

const ayahNumberStyle = {
  color: '#3182ce',
  fontSize: '18px',
  marginRight: '10px'
};

export default QuranSection;
