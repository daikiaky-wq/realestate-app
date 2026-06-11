import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import PropertyCard from '../components/PropertyCard'

// ダミー物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンシャインマンション渋谷', rent: 150000, area: '渋谷区', type: '1LDK', size: 45 },
  { id: 2, name: 'グリーンハイツ新宿', rent: 120000, area: '新宿区', type: '1K', size: 30 },
  { id: 3, name: 'ブルースカイアパート品川', rent: 200000, area: '品川区', type: '2LDK', size: 60 },
  { id: 4, name: 'パークサイドレジデンス目黒', rent: 180000, area: '目黒区', type: '2DK', size: 50 },
  { id: 5, name: '東京ガーデンタワー港', rent: 280000, area: '港区', type: '3LDK', size: 85 },
  { id: 6, name: 'ハーモニーコート豊島', rent: 90000, area: '豊島区', type: 'ワンルーム', size: 25 },
]

function Properties() {
  const navigate = useNavigate()

  // ログアウト処理：Supabase のセッションを破棄してログイン画面へ
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <button onClick={handleLogout} className="btn-logout">
          ログアウト
        </button>
      </header>
      <div className="properties-grid">
        {DUMMY_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

export default Properties
