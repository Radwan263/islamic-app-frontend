import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { BookOpen, Play, Pause, Volume2, Search, Bookmark } from 'lucide-react'

const allSuras = [
    { number: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', ayahs: 7 },
    { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', ayahs: 286 },
    { number: 3, name: 'آل عمران', englishName: 'Aal-E-Imran', ayahs: 200 },
    { number: 4, name: 'النساء', englishName: 'An-Nisa', ayahs: 176 },
    { number: 5, name: 'المائدة', englishName: 'Al-Maidah', ayahs: 120 },
    { number: 6, name: 'الأنعام', englishName: 'Al-Anam', ayahs: 165 },
    { number: 7, name: 'الأعراف', englishName: 'Al-Araf', ayahs: 206 },
    { number: 8, name: 'الأنفال', englishName: 'Al-Anfal', ayahs: 75 },
    { number: 9, name: 'التوبة', englishName: 'At-Tawbah', ayahs: 129 },
    { number: 10, name: 'يونس', englishName: 'Yunus', ayahs: 109 },
    { number: 11, name: 'هود', englishName: 'Hud', ayahs: 123 },
    { number: 12, name: 'يوسف', englishName: 'Yusuf', ayahs: 111 },
    { number: 13, name: 'الرعد', englishName: 'Ar-Rad', ayahs: 43 },
    { number: 14, name: 'ابراهيم', englishName: 'Ibrahim', ayahs: 52 },
    { number: 15, name: 'الحجر', englishName: 'Al-Hijr', ayahs: 99 },
    { number: 16, name: 'النحل', englishName: 'An-Nahl', ayahs: 128 },
    { number: 17, name: 'الإسراء', englishName: 'Al-Isra', ayahs: 111 },
    { number: 18, name: 'الكهف', englishName: 'Al-Kahf', ayahs: 110 },
    { number: 19, name: 'مريم', englishName: 'Maryam', ayahs: 98 },
    { number: 20, name: 'طه', englishName: 'Taha', ayahs: 135 },
    { number: 21, name: 'الأنبياء', englishName: 'Al-Anbiya', ayahs: 112 },
    { number: 22, name: 'الحج', englishName: 'Al-Hajj', ayahs: 78 },
    { number: 23, name: 'المؤمنون', englishName: 'Al-Muminun', ayahs: 118 },
    { number: 24, name: 'النور', englishName: 'An-Nur', ayahs: 64 },
    { number: 25, name: 'الفرقان', englishName: 'Al-Furqan', ayahs: 77 },
    { number: 26, name: 'الشعراء', englishName: 'Ash-Shuara', ayahs: 227 },
    { number: 27, name: 'النمل', englishName: 'An-Naml', ayahs: 93 },
    { number: 28, name: 'القصص', englishName: 'Al-Qasas', ayahs: 88 },
    { number: 29, name: 'العنكبوت', englishName: 'Al-Ankabut', ayahs: 69 },
    { number: 30, name: 'الروم', englishName: 'Ar-Rum', ayahs: 60 },
    { number: 31, name: 'لقمان', englishName: 'Luqman', ayahs: 34 },
    { number: 32, name: 'السجدة', englishName: 'As-Sajdah', ayahs: 30 },
    { number: 33, name: 'الأحزاب', englishName: 'Al-Ahzab', ayahs: 73 },
    { number: 34, name: 'سبأ', englishName: 'Saba', ayahs: 54 },
    { number: 35, name: 'فاطر', englishName: 'Fatir', ayahs: 45 },
    { number: 36, name: 'يس', englishName: 'Ya-Sin', ayahs: 83 },
    { number: 37, name: 'الصافات', englishName: 'As-Saffat', ayahs: 182 },
    { number: 38, name: 'ص', englishName: 'Sad', ayahs: 88 },
    { number: 39, name: 'الزمر', englishName: 'Az-Zumar', ayahs: 75 },
    { number: 40, name: 'غافر', englishName: 'Ghafir', ayahs: 85 },
    { number: 41, name: 'فصلت', englishName: 'Fussilat', ayahs: 54 },
    { number: 42, name: 'الشورى', englishName: 'Ash-Shura', ayahs: 53 },
    { number: 43, name: 'الزخرف', englishName: 'Az-Zukhruf', ayahs: 89 },
    { number: 44, name: 'الدخان', englishName: 'Ad-Dukhan', ayahs: 59 },
    { number: 45, name: 'الجاثية', englishName: 'Al-Jathiyah', ayahs: 37 },
    { number: 46, name: 'الأحقاف', englishName: 'Al-Ahqaf', ayahs: 35 },
    { number: 47, name: 'محمد', englishName: 'Muhammad', ayahs: 38 },
    { number: 48, name: 'الفتح', englishName: 'Al-Fath', ayahs: 29 },
    { number: 49, name: 'الحجرات', englishName: 'Al-Hujurat', ayahs: 18 },
    { number: 50, name: 'ق', englishName: 'Qaf', ayahs: 45 },
    { number: 51, name: 'الذاريات', englishName: 'Adh-Dhariyat', ayahs: 60 },
    { number: 52, name: 'الطور', englishName: 'At-Tur', ayahs: 49 },
    { number: 53, name: 'النجم', englishName: 'An-Najm', ayahs: 62 },
    { number: 54, name: 'القمر', englishName: 'Al-Qamar', ayahs: 55 },
    { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', ayahs: 78 },
    { number: 56, name: 'الواقعة', englishName: 'Al-Waqiah', ayahs: 96 },
    { number: 57, name: 'الحديد', englishName: 'Al-Hadid', ayahs: 29 },
    { number: 58, name: 'المجادلة', englishName: 'Al-Mujadila', ayahs: 22 },
    { number: 59, name: 'الحشر', englishName: 'Al-Hashr', ayahs: 24 },
    { number: 60, name: 'الممتحنة', englishName: 'Al-Mumtahanah', ayahs: 13 },
    { number: 61, name: 'الصف', englishName: 'As-Saf', ayahs: 14 },
    { number: 62, name: 'الجمعة', englishName: 'Al-Jumuah', ayahs: 11 },
    { number: 63, name: 'المنافقون', englishName: 'Al-Munafiqun', ayahs: 11 },
    { number: 64, name: 'التغابن', englishName: 'At-Taghabun', ayahs: 18 },
    { number: 65, name: 'الطلاق', englishName: 'At-Talaq', ayahs: 12 },
    { number: 66, name: 'التحريم', englishName: 'At-Tahrim', ayahs: 12 },
    { number: 67, name: 'الملك', englishName: 'Al-Mulk', ayahs: 30 },
    { number: 68, name: 'القلم', englishName: 'Al-Qalam', ayahs: 52 },
    { number: 69, name: 'الحاقة', englishName: 'Al-Haqqah', ayahs: 52 },
    { number: 70, name: 'المعارج', englishName: 'Al-Maarij', ayahs: 44 },
    { number: 71, name: 'نوح', englishName: 'Nuh', ayahs: 28 },
    { number: 72, name: 'الجن', englishName: 'Al-Jinn', ayahs: 28 },
    { number: 73, name: 'المزمل', englishName: 'Al-Muzzammil', ayahs: 20 },
    { number: 74, name: 'المدثر', englishName: 'Al-Muddaththir', ayahs: 56 },
    { number: 75, name: 'القيامة', englishName: 'Al-Qiyamah', ayahs: 40 },
    { number: 76, name: 'الانسان', englishName: 'Al-Insan', ayahs: 31 },
    { number: 77, name: 'المرسلات', englishName: 'Al-Mursalat', ayahs: 50 },
    { number: 78, name: 'النبأ', englishName: 'An-Naba', ayahs: 40 },
    { number: 79, name: 'النازعات', englishName: 'An-Naziat', ayahs: 46 },
    { number: 80, name: 'عبس', englishName: 'Abasa', ayahs: 42 },
    { number: 81, name: 'التكوير', englishName: 'At-Takwir', ayahs: 29 },
    { number: 82, name: 'الإنفطار', englishName: 'Al-Infitar', ayahs: 19 },
    { number: 83, name: 'المطففين', englishName: 'Al-Mutaffifin', ayahs: 36 },
    { number: 84, name: 'الإنشقاق', englishName: 'Al-Inshiqaq', ayahs: 25 },
    { number: 85, name: 'البروج', englishName: 'Al-Buruj', ayahs: 22 },
    { number: 86, name: 'الطارق', englishName: 'At-Tariq', ayahs: 17 },
    { number: 87, name: 'الأعلى', englishName: 'Al-Ala', ayahs: 19 },
    { number: 88, name: 'الغاشية', englishName: 'Al-Ghashiyah', ayahs: 26 },
    { number: 89, name: 'الفجر', englishName: 'Al-Fajr', ayahs: 30 },
    { number: 90, name: 'البلد', englishName: 'Al-Balad', ayahs: 20 },
    { number: 91, name: 'الشمس', englishName: 'Ash-Shams', ayahs: 15 },
    { number: 92, name: 'الليل', englishName: 'Al-Layl', ayahs: 21 },
    { number: 93, name: 'الضحى', englishName: 'Ad-Duha', ayahs: 11 },
    { number: 94, name: 'الشرح', englishName: 'Ash-Sharh', ayahs: 8 },
    { number: 95, name: 'التين', englishName: 'At-Tin', ayahs: 8 },
    { number: 96, name: 'العلق', englishName: 'Al-Alaq', ayahs: 19 },
    { number: 97, name: 'القدر', englishName: 'Al-Qadr', ayahs: 5 },
    { number: 98, name: 'البينة', englishName: 'Al-Bayyinah', ayahs: 8 },
    { number: 99, name: 'الزلزلة', englishName: 'Az-Zalzalah', ayahs: 8 },
    { number: 100, name: 'العاديات', englishName: 'Al-Adiyat', ayahs: 11 },
    { number: 101, name: 'القارعة', englishName: 'Al-Qariah', ayahs: 11 },
    { number: 102, name: 'التكاثر', englishName: 'At-Takathur', ayahs: 8 },
    { number: 103, name: 'العصر', englishName: 'Al-Asr', ayahs: 3 },
    { number: 104, name: 'الهمزة', englishName: 'Al-Humazah', ayahs: 9 },
    { number: 105, name: 'الفيل', englishName: 'Al-Fil', ayahs: 5 },
    { number: 106, name: 'قريش', englishName: 'Quraysh', ayahs: 4 },
    { number: 107, name: 'الماعون', englishName: 'Al-Maun', ayahs: 7 },
    { number: 108, name: 'الكوثر', englishName: 'Al-Kawthar', ayahs: 3 },
    { number: 109, name: 'الكافرون', englishName: 'Al-Kafirun', ayahs: 6 },
    { number: 110, name: 'النصر', englishName: 'An-Nasr', ayahs: 3 },
    { number: 111, name: 'المسد', englishName: 'Al-Masad', ayahs: 5 },
    { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas', ayahs: 4 },
    { number: 113, name: 'الفلق', englishName: 'Al-Falaq', ayahs: 5 },
    { number: 114, name: 'الناس', englishName: 'An-Nas', ayahs: 6 },
];

const QuranSection = () => {
  const [suras, setSuras] = useState([]);
  const [selectedSura, setSelectedSura] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ayahs, setAyahs] = useState([]); // State to store fetched ayahs

  useEffect(() => {
    setSuras(allSuras);
  }, []);

  const handleSuraClick = async (sura) => {
    setSelectedSura(sura);
    setLoading(true);
    setAyahs([]); // Clear previous ayahs

    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${sura.number}`);
      const data = await response.json();

      if (data.code === 200) {
        setAyahs(data.data.ayahs);
      } else {
        console.error("Failed to fetch sura data");
      }
    } catch (error) {
      console.error("Error connecting to the API", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredSuras = suras.filter(sura => 
    sura.name.includes(searchQuery) || 
    sura.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="quran" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            القرآن الكريم
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اقرأ واستمع إلى القرآن الكريم مع التفسير والترجمة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suras List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  السور
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث في السور..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredSuras.map((sura) => (
                    <div
                      key={sura.number}
                      onClick={() => handleSuraClick(sura)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedSura?.number === sura.number
                          ? 'bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {sura.number}. {sura.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {sura.englishName} • {sura.ayahs} آية
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sura Content */}
          <div className="lg:col-span-2">
            {selectedSura ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      سورة {selectedSura.name}
                    </CardTitle>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={togglePlayback}
                        className="text-green-600 border-green-600"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedSura.number !== 1 && selectedSura.number !== 9 && ayahs.length > 0 && (
                        <div className="text-center py-6 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-2xl font-arabic text-gray-900 dark:text-white">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-4 text-right">
                        {ayahs.map((ayah) => (
                          <div key={ayah.number} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-xl font-arabic text-gray-900 dark:text-white mb-2 leading-relaxed">
                              {ayah.text} <span className="text-green-600 font-sans">({ayah.numberInSurah})</span>
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      اختر سورة من القائمة لبدء القراءة
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuranSection
