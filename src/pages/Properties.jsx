import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import {
  fetchProperties,
  insertProperty,
  updateProperty,
  deleteProperty,
} from '../api/properties'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

function Properties() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState('')

  // showForm: フォームモーダルの表示フラグ
  // editingProperty: 編集中の物件（null なら新規登録モード）
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)

  // 初回マウント時に物件一覧を取得
  useEffect(() => {
    loadProperties()
  }, [])

  async function loadProperties() {
    try {
      setLoading(true)
      setPageError('')
      const data = await fetchProperties()
      setProperties(data)
    } catch {
      setPageError('物件の取得に失敗しました。ページを再読み込みしてください。')
    } finally {
      setLoading(false)
    }
  }

  // ログアウト：Supabase セッションを破棄してログイン画面へ
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  // 新規登録ボタン：フォームを新規モードで開く
  const handleOpenAdd = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  // 編集ボタン：選択した物件をフォームにセットして開く
  const handleOpenEdit = (property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  // INSERT または UPDATE を実行してリストを更新する
  const handleSave = async (formData) => {
    if (editingProperty) {
      // 編集モード：既存物件を更新してリストの該当行を差し替え
      const updated = await updateProperty(editingProperty.id, formData)
      setProperties((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      )
    } else {
      // 新規モード：登録された物件をリスト先頭に追加
      const created = await insertProperty(formData)
      setProperties((prev) => [created, ...prev])
    }
    handleCloseForm()
  }

  // DELETE を実行してリストから該当行を除去する
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return
    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setPageError('削除に失敗しました。')
    }
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-actions">
          <button onClick={handleOpenAdd} className="btn-add">
            ＋ 新規登録
          </button>
          <button onClick={handleLogout} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      {/* ページレベルのエラー表示 */}
      {pageError && <p className="page-error">{pageError}</p>}

      {loading ? (
        <div className="loading">読み込み中...</div>
      ) : properties.length === 0 ? (
        // 物件が 0 件のとき空状態を表示
        <div className="empty-state">
          <p className="empty-state-text">まだ物件が登録されていません。</p>
          <button onClick={handleOpenAdd} className="btn-add">
            最初の物件を登録する
          </button>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => handleOpenEdit(property)}
              onDelete={() => handleDelete(property.id)}
            />
          ))}
        </div>
      )}

      {/* 新規登録・編集フォームモーダル */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSave={handleSave}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  )
}

export default Properties
