import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// ... (باقي استيراد المكونات كما هو)
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import QuranSection from './components/QuranSection';
// ...

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية الآن لا تحتوي على Navbar */}
        <Route path="/" element={<HomePage />} />

        {/* باقي الصفحات تحتوي على Navbar */}
        <Route path="/quran" element={<><Navbar /><QuranSection /></>} />
        <Route path="/hadith" element={<><Navbar /><HadithSection /></>} />
        <Route path="/azkar" element={<><Navbar /><AzkarSection /></>} />
        <Route path="/duas" element={<><Navbar /><DuasSection /></>} />
        <Route path="/sadaqa" element={<><Navbar /><SadaqaSection /></>} />
        <Route path="/tasbih" element={<><Navbar /><TasbihSection /></>} />
        <Route path="/prayer-times" element={<><Navbar /><PrayerTimesSection /></>} />
      </Routes>
    </Router>
  );
}

export default App;
