// 物件情報を表示するカードコンポーネント
function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="property-card-header">
        <span className="property-type">{property.type}</span>
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
        <div className="property-detail-item">
          <span className="detail-label">広さ</span>
          <span className="detail-value">{property.size} ㎡</span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
