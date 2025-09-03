from flask import Blueprint, request, jsonify
from datetime import datetime
from src.models.user import db
from src.models.sadaqa import SadaqaJariya

sadaqa_bp = Blueprint('sadaqa', __name__)

@sadaqa_bp.route('/sadaqa', methods=['GET'])
def get_sadaqa_jariya():
    """الحصول على قائمة الأشخاص للدعاء لهم"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    sadaqa_pagination = SadaqaJariya.query.order_by(
        SadaqaJariya.supplication_count.desc()
    ).paginate(
        page=page, 
        per_page=per_page, 
        error_out=False
    )
    
    return jsonify({
        'sadaqa_jariya': [item.to_dict() for item in sadaqa_pagination.items],
        'total': sadaqa_pagination.total,
        'pages': sadaqa_pagination.pages,
        'current_page': page
    })

@sadaqa_bp.route('/sadaqa', methods=['POST'])
def add_person_for_sadaqa():
    """إضافة شخص للدعاء له"""
    data = request.get_json()
    
    if not data or 'person_name' not in data or 'user_id' not in data:
        return jsonify({'error': 'person_name and user_id are required'}), 400
    
    # التحقق من عدم وجود نفس الاسم مسبقاً
    existing = SadaqaJariya.query.filter_by(person_name=data['person_name']).first()
    if existing:
        return jsonify({'error': 'Person already exists'}), 400
    
    sadaqa_item = SadaqaJariya(
        person_name=data['person_name'],
        user_id=data['user_id']
    )
    
    db.session.add(sadaqa_item)
    db.session.commit()
    
    return jsonify(sadaqa_item.to_dict()), 201

@sadaqa_bp.route('/sadaqa/<int:sadaqa_id>/supplicate', methods=['POST'])
def supplicate_for_person(sadaqa_id):
    """الدعاء لشخص (زيادة العداد)"""
    sadaqa_item = SadaqaJariya.query.get_or_404(sadaqa_id)
    
    sadaqa_item.supplication_count += 1
    sadaqa_item.last_supplicated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify(sadaqa_item.to_dict())

@sadaqa_bp.route('/sadaqa/<int:sadaqa_id>', methods=['DELETE'])
def delete_sadaqa_person(sadaqa_id):
    """حذف شخص من قائمة الصدقة الجارية"""
    sadaqa_item = SadaqaJariya.query.get_or_404(sadaqa_id)
    
    db.session.delete(sadaqa_item)
    db.session.commit()
    
    return jsonify({'message': 'Person removed from sadaqa jariya list'})

@sadaqa_bp.route('/sadaqa/search', methods=['GET'])
def search_sadaqa():
    """البحث عن شخص في قائمة الصدقة الجارية"""
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    results = SadaqaJariya.query.filter(
        SadaqaJariya.person_name.contains(query)
    ).limit(10).all()
    
    return jsonify([item.to_dict() for item in results])

