import { useState } from 'react'

// 物件の新規登録・編集に使うモーダルフォーム
// property が null のとき新規登録、object のとき編集モードになる
function PropertyForm({ property, onSave, onCancel }) {
  const isEdit = !!property

  const [name, setName] = useState(property?.name ?? '')
  const [rent, setRent] = useState(property?.rent ?? '')
  const [area, setArea] = useState(property?.area ?? '')
  const [floorPlan, setFloorPlan] = useState(property?.floor_plan ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSave({ name, rent, area, floorPlan })
    } catch {
      setError(isEdit ? '更新に失敗しました。' : '登録に失敗しました。')
      setLoading(false)
    }
  }

  return (
    // オーバーレイ部分をクリックするとモーダルが閉じる
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{isEdit ? '物件を編集' : '物件を新規登録'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="prop-name">物件名</label>
            <input
              id="prop-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：サンシャインマンション渋谷"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prop-rent">家賃（円）</label>
            <input
              id="prop-rent"
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              placeholder="例：150000"
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prop-area">エリア名</label>
            <input
              id="prop-area"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="例：渋谷区"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prop-floor-plan">間取り</label>
            <input
              id="prop-floor-plan"
              type="text"
              value={floorPlan}
              onChange={(e) => setFloorPlan(e.target.value)}
              placeholder="例：1LDK"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-footer">
            <button type="button" onClick={onCancel} className="btn-cancel">
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PropertyForm
