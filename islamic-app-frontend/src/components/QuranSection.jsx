import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { BookOpen, Play, Pause, Volume2, Search, Bookmark } from 'lucide-react'

const QuranSection = () => {
  const [suras, setSuras] = useState([])
  const [selectedSura, setSelectedSura] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  const mockSuras = [
    { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", ayahs: 7 },
    { number: 2, name: "البقرة", englishName: "Al-Baqarah", ayahs: 286 },
    { number: 3, name: "آل عمران", englishName: "Ali 'Imran", ayahs: 200 },
    { number: 4, name: "النساء", englishName: "An-Nisa", ayahs: 176 },
    { number: 5, name: "المائدة", englishName: "Al-Ma'idah", ayahs: 120 },
    { number: 6, name: "الأنعام", englishName: "Al-An'am", ayahs: 165 },
  ]

  useEffect(() => {
    setSuras(mockSuras)
  }, [])

  const handleSuraClick = (sura) => {
    setSelectedSura(sura)
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const filteredSuras = suras.filter(sura => 
    sura.name.includes(searchQuery) || 
    sura.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                      {/* Bismillah */}
                      {selectedSura.number !== 1 && selectedSura.number !== 9 && (
                        <div className="text-center py-6 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-2xl font-arabic text-gray-900 dark:text-white">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </p>
                        </div>
                      )}
                      
                      {/* Sample Ayahs */}
                      <div className="space-y-4">
                        {selectedSura.number === 1 && (
                          <>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <p className="text-xl font-arabic text-gray-900 dark:text-white mb-2 leading-relaxed">
                                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                بسم الله الرحمن الرحيم
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <p className="text-xl font-arabic text-gray-900 dark:text-white mb-2 leading-relaxed">
                                الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                الحمد لله رب العالمين
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <p className="text-xl font-arabic text-gray-900 dark:text-white mb-2 leading-relaxed">
                                الرَّحْمَٰنِ الرَّحِيمِ
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                الرحمن الرحيم
                              </p>
                            </div>
                          </>
                        )}
                        
                        {selectedSura.number !== 1 && (
                          <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">
                              سيتم تحميل آيات السورة من API القرآن الكريم
                            </p>
                          </div>
                        )}
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

