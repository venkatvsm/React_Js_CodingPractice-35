// Write your code here
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {apiStatus: 'LOADING', productDetails: [], quantity: 1}

  componentDidMount() {
    this.renderApiCalls()
  }

  renderApiCalls = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        similarProducts: data.similar_products.map(eachItem => ({
          availability: eachItem.availability,
          brand: eachItem.brand,
          description: eachItem.description,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          price: eachItem.price,
          rating: eachItem.rating,
          style: eachItem.style,
          title: eachItem.title,
          totalReviews: eachItem.total_reviews,
        })),
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({productDetails: updatedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onClickAddBtn = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickMinusBtn = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="Loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  rendersimilarProducts = ([...similarProducts]) => (
    <div className="similarProductsContainer">
      <h1 className="similarProducts_heading">Similar Products</h1>
      <ul className="similarProducts_ListContainer">
        {similarProducts.map(eachItem => (
          <SimilarProductItem similarProducts={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  )

  renderSuccessView = () => {
    const {productDetails, quantity} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      similarProducts,
      title,
      totalReviews,
    } = productDetails
    return (
      <>
        <div className="productDetailsCardContainer">
          <img
            src={imageUrl}
            alt="product"
            className="productDetails_imageUrl"
          />
          <div className="productDetails_descriptioncontainer">
            <h1 className="productDetails_heading">{title}</h1>
            <p className="productDetails_price">Rs {price}/-</p>
            <div className="productDetails_reviewcontainer">
              <div className="productDetails_review_IconContainer">
                <p className="productDetails_review_rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="productDetails_review_icon"
                />
              </div>
              <p className="productDetails_review_totalReviews">
                {totalReviews} Reviews
              </p>
            </div>
            <p className="productDetails_description">{description}</p>
            <div className="productDetails_availableContainer">
              <p className="productDetails_available">Available:</p>
              <p className="spanEl">{availability}</p>
            </div>
            <div className="productDetails_availableContainer">
              <p className="productDetails_available">Brand:</p>
              <p className="spanEl">{brand}</p>
            </div>
            <hr className="horizontalLine" />
            <div className="addCartContainer">
              <div className="iconAndcountContainer">
                <button
                  type="button"
                  aria-label="plus"
                  className="buttonEl"
                  onClick={this.onClickAddBtn}
                  data-testid="plus"
                >
                  <BsPlusSquare />
                </button>
                <p className="count_para">{quantity}</p>
                <button
                  type="button"
                  aria-label="minus"
                  className="buttonEl"
                  onClick={this.onClickMinusBtn}
                  data-testid="minus"
                >
                  <BsDashSquare />
                </button>
              </div>
              <button type="button" className="AddToCartBtn">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        {this.rendersimilarProducts([...similarProducts])}
      </>
    )
  }

  onclickRetryBtn = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="productNotFoundContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="productNotFound_Image"
      />
      <h1 className="productNotFound_heading">Product Not Found</h1>
      <button className="retryBtn" type="button" onClick={this.onclickRetryBtn}>
        Continue Shopping
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div className="ProductItemDetailsContainer">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}
export default ProductItemDetails
