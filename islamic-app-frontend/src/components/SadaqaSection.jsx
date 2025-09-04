// =============================================================
//  ملف: SadaqaSection.jsx (نسخة نهائية ومصححة)
//  يتصل بالـ API الحقيقي لجلب وإضافة البيانات
// =============================================================
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Heart, Plus, Users, Clock, Star } from 'lucide-react';

// --- الرابط الأساسي للـ API ---
// استخدمنا إعادة التوجيه في Netlify، لذلك نستخدم مسارًا نسبيًا
const API_BASE_URL = '/api'; 

const SadaqaSection = () => {
  const [sadaqaRequests, setSadaqaRequests] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    person_name: '', // تم تغيير الاسم ليتوافق مع الخادم
    description: '',
    category: 'General' // تم تغيير الاسم ليتوافق مع الخادم
  });
  const [loading, setLoading] = useState(true); // يبدأ بـ true لجلب البيانات عند التحميل
  const [error, setError] = useState('');

  const categories = [
    'General', 'Health', 'Education', 'Guidance', 'Family', 'Livelihood', 'Travel', 'Work'
  ];

  // --- دالة لجلب كل الطلبات من الخادم ---
  const fetchSadaqaRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/sadaqa`);
      if (!response.ok) {
        throw new Error('فشل في جلب البيانات من الخادم');
      }
      const data = await response.json();
      setSadaqaRequests(data);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  // --- جلب البيانات عند تحميل المكون لأول مرة ---
  useEffect(() => {
    fetchSadaqaRequests();
  }, []);

  const handleInputChange = (e) => {
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value
    });
  };

  // --- دالة لإرسال طلب جديد إلى الخادم ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRequest.person_name.trim() || !newRequest.description.trim()) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setError('');
      const response = await fetch(`${API_BASE_URL}/sadaqa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // في المستقبل، سنضيف التوكن هنا
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newRequest)
      });

      if (!response.ok) {
        throw new Error('فشل في إضافة الطلب');
      }

      // إعادة جلب كل الطلبات من الخادم لعرض الطلب الجديد
      await fetchSadaqaRequests(); 
      setNewRequest({ person_name: '', description: '', category: 'General' });
      setShowAddForm(false);

    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء إرسال الطلب');
    }
  };

  // --- دالة لإضافة دعوة (تحديث) ---
  const addPrayer = async (requestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sadaqa/${requestId}/supplicate`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('فشل في تحديث عدد الدعوات');
      }
      const updatedRequest = await response.json();
      // تحديث الحالة في الواجهة فورًا
      setSadaqaRequests(prev =>
        prev.map(request =>
          request.id === requestId ? updatedRequest : request
        )
      );
    } catch (err) {
      console.error(err); // يمكن عرض رسالة خطأ للمستخدم هنا
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="sadaqa" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... (جزء العنوان والحديث الشريف لا يتغير) ... */}
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

        {/* زر ونموذج الإضافة (لا يتغير) */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            إضافة طلب دعاء
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>إضافة طلب دعاء جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="person_name">الاسم</Label>
                  <Input
                    id="person_name"
                    name="person_name"
                    placeholder="أدخل الاسم المراد الدعاء له"
                    value={newRequest.person_name}
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

        {/* عرض رسالة الخطأ */}
        {error && (
          <div className="text-center mb-4 p-3 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* عرض مؤشر التحميل */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">جاري تحميل البيانات...</p>
          </div>
        ) : (
          <>
            {/* الإحصائيات (لا تتغير) */}
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
                    {sadaqaRequests.reduce((sum, req) => sum + (req.supplication_count || 0), 0)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">إجمالي الدعوات</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(sadaqaRequests.reduce((sum, req) => sum + (req.supplication_count || 0), 0) / sadaqaRequests.length) || 0}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">متوسط الدعوات</p>
                </CardContent>
              </Card>
            </div>

            {/* عرض الطلبات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sadaqaRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{request.person_name}</CardTitle>
                      <div className="text-right">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                          {request.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {request.description}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span>{request.supplication_count || 0} دعوة</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDate(request.created_at)}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => addPrayer(request.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        ادع له/لها
                      </Button>
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

            {/* حالة عدم وجود طلبات */}
            {!loading && sadaqaRequests.length === 0 && (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  لا توجد طلبات دعاء حالياً. كن أول من يضيف طلباً!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default SadaqaSection;
