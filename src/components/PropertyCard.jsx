// 物件情報を表示するカードコンポーネント
// onEdit / onDelete コールバックで親から CRUD 操作を委譲する
function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <div className="property-card-header">
        <span className="property-type">{property.floor_plan}</span>
        <div className="card-actions">
          <button onClick={onEdit} className="btn-edit">
            編集
          </button>
          <button onClick={onDelete} className="btn-delete">
            削除
          </button>
        </div>
      </div>
      <h2 className="property-name">{property.name}</h2>
      <div className="property-details">
        <div className="property-detail-item">
          <span className="detail-label">エリア</span>
          <span className="detail-value">{property.area}</span>
        </div>
        <div className="property-detail-item">
          <span className="detail-label">家賃</span>
          <span className="detail-value rent">
            {property.rent.toLocaleString('ja-JP')}円 / 月
          </span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
