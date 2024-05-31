// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProducts} = props
  const {brand, imageUrl, price, rating, title} = similarProducts
  return (
    <li className="similarListItems">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similarItems_image"
      />
      <h1 className="similarItems_heading">{title}</h1>
      <p className="similarItems_para">by {brand}</p>
      <div className="similarItems_price_and_ratingContainer">
        <p className="similarItems_price">Rs {price}/-</p>
        <div className="similarItems_ratingContainer">
          <p className="similarItems_rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="productDetails_review_icon"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
