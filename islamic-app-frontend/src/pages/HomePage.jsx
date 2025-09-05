import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // تأكد من أن هذا السطر موجود

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>السلام عليكم ورحمة الله وبركاته</h1>
        <p>نورت تطبيق نور الإسلام، اختر ما تريد</p>
      </div>

      <nav className="main-menu">
        <Link to="/quran" className="menu-item">القرآن الكريم</Link>
        <Link to="/hadith" className="menu-item">الأحاديث</Link>
        <Link to="/azkar" className="menu-item">الأذكار</Link>
        <Link to="/duas" className="menu-item">الأدعية</Link>
        <Link to="/sadaqa" className="menu-item">صدقة جارية</Link>
        <Link to="/tasbih" className="menu-item">السبحة الإلكترونية</Link>
        <Link to="/prayer-times" className="menu-item">أوقات الصلاة</Link>
      </nav>

      <div className="developer-info">
        <p>بيانات المطور</p>
      </div>
    </div>
  );
};

export default HomePage;
