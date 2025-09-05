import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// استيراد المكونات
import Navbar from './components/Navbar'; // سنبقي على شريط التنقل
import HomePage from './pages/HomePage'; // صفحتنا الرئيسية الجديدة

// استيراد مكونات الأقسام
import QuranSection from './components/QuranSection';
import HadithSection from './components/HadithSection';
import AzkarSection from './components/AzkarSection';
import DuasSection from './components/DuasSection';
import SadaqaSection from './components/SadaqaSection';
import TasbihSection from './components/TasbihSection';
import PrayerTimesSection from './components/PrayerTimesSection';

function App() {
  return (
    <Router>
      {/* شريط التنقل سيظهر في كل الصفحات */}
      <Navbar />
      
      {/* Routes هو المسؤول عن تبديل الصفحات */}
      <Routes>
        {/* المسار الرئيسي / يعرض الصفحة الرئيسية */}
        <Route path="/" element={<HomePage />} />

        {/* كل مسار آخر يعرض المكون الخاص به فقط */}
        <Route path="/quran" element={<QuranSection />} />
        <Route path="/hadith" element={<HadithSection />} />
        <Route path="/azkar" element={<AzkarSection />} />
        <Route path="/duas" element={<DuasSection />} />
        <Route path="/sadaqa" element={<SadaqaSection />} />
        <Route path="/tasbih" element={<TasbihSection />} />
        <Route path="/prayer-times" element={<PrayerTimesSection />} />
      </Routes>
    </Router>
  );
}

export default App;
