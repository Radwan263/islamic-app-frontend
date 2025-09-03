import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Heart, Plus, Users, Clock, Star } from 'lucide-react'

const SadaqaSection = () => {
  const [sadaqaRequests, setSadaqaRequests] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    name: '',
    description: '',
    category: 'عام'
  })

  // Mock sadaqa requests data
  const mockRequests = [
    {
      id: 1,
      name: "أحمد محمد علي",
      description: "يرجى الدعاء له بالشفاء العاجل من المرض",
      category: "الصحة",
      prayers: 156,
      createdAt: "2024-01-15",
      isActive: true
    },
    {
      id: 2,
      name: "فاطمة أحمد",
      description: "الدعاء لها بالتوفيق في الامتحانات",
      category: "التعليم",
      prayers: 89,
      createdAt: "2024-01-14",
      isActive: true
    },
    {
      id: 3,
      name: "محمد عبد الله",
      description: "الدعاء له بالهداية والتوبة النصوح",
      category: "الهداية",
      prayers: 234,
      createdAt: "2024-01-13",
      isActive: true
    },
    {
      id: 4,
      name: "عائشة محمود",
      description: "الدعاء لها بالذرية الصالحة",
      category: "الأسرة",
      prayers: 67,
      createdAt: "2024-01-12",
      isActive: true
    },
    {
      id: 5,
      name: "يوسف إبراهيم",
      description: "الدعاء له بالرزق الحلال الطيب",
      category: "الرزق",
      prayers: 123,
      createdAt: "2024-01-11",
      isActive: true
    }
  ]

  const categories = [
    'عام', 'الصحة', 'التعليم', 'الهداية', 'الأسرة', 'الرزق', 'السفر', 'العمل'
  ]

  useEffect(() => {
    setSadaqaRequests(mockRequests)
  }, [])

  const handleInputChange = (e) => {
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newRequest.name.trim() && newRequest.description.trim()) {
      const request = {
        id: Date.now(),
        ...newRequest,
        prayers: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isActive: true
      }
      setSadaqaRequests([request, ...sadaqaRequests])
      setNewRequest({ name: '', description: '', category: 'عام' })
      setShowAddForm(false)
    }
  }

  const addPrayer = (requestId) => {
    setSadaqaRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, prayers: request.prayers + 1 }
          : request
      )
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA')
  }

  return (
    <section id="sadaqa" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            الصدقة الجارية
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            شارك في الأجر بالدعاء للآخرين واطلب الدعاء لنفسك أو لأحبائك
          </p>
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-green-800 dark:text-green-200">
              "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ: إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ"
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">رواه مسلم</p>
          </div>
        </div>

        {/* Add Request Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            إضافة طلب دعاء
          </Button>
        </div>

        {/* Add Request Form */}
        {showAddForm && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>إضافة طلب دعاء جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="أدخل الاسم المراد الدعاء له"
                    value={newRequest.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <select
                    id="category"
                    name="category"
                    value={newRequest.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">وصف الطلب</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="اكتب تفاصيل الطلب والدعاء المطلوب"
                    value={newRequest.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    إضافة الطلب
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {sadaqaRequests.length}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">طلبات الدعاء</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {sadaqaRequests.reduce((sum, req) => sum + req.prayers, 0)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">إجمالي الدعوات</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(sadaqaRequests.reduce((sum, req) => sum + req.prayers, 0) / sadaqaRequests.length) || 0}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">متوسط الدعوات</p>
            </CardContent>
          </Card>
        </div>

        {/* Sadaqa Requests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sadaqaRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{request.name}</CardTitle>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      {request.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {request.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      <span>{request.prayers} دعوة</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </div>

                  {/* Prayer Button */}
                  <Button
                    onClick={() => addPrayer(request.id)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    ادع له/لها
                  </Button>

                  {/* Prayer confirmation */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      "اللهم اغفر له وارحمه وعافه واعف عنه"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sadaqaRequests.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              لا توجد طلبات دعاء حالياً
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SadaqaSection

