import React from 'react';
import Layout from '../../components/Layout';
import products from '../../utils/products.json';
import './Product.css';
import {connect} from 'react-redux';
import {addToCart} from "../../redux/cart/CartActions";
import {addToFavorite} from "../../redux/favorite/FavoriteActions";
import {ReactComponent as Heart} from "../../assets/icons/heart.svg";
import {ReactComponent as HeartPressed} from "../../assets/icons/heart-outline.svg";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            isFavorite: props.isFavorite
        };
    }

    handleFavoriteClick = () => {
        const {product, isFavorite} = this.state;
        this.setState({isFavorite: !isFavorite});
        this.props.addToFavorite({
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.image,
            },
        });
    };

    componentDidMount() {
        const {match} = this.props;
        const productId = match.params.productId;
        const categoryValues = Object.values(products);
        const productItems = categoryValues.reduce((acc, category) => {
            return [
                ...acc,
                ...category.items
            ]
        }, []);
        const currentProduct = productItems.find(product => {
            return Number(productId) === product.id;
        });
        this.setState({product: currentProduct});
    }

    render() {
        const {product, isFavorite} = this.state

        return (
            <Layout>
                <div className="product-page container-fluid container-min-max-width">
                    <h1 className="my-5 h2">{product.name}</h1>
                    <div className="product-info d-flex">
                        <div className="image-wrapper d-flex mr-5">
                            <img src={product.image} alt="Product presentation"/>
                        </div>
                        <div className="product-details">
                            <p className="h3 text-danger">{product.price} {product.currency}</p>
                            <div style={{display: "flex"}}>
                                <button
                                    className="btn btn-dark mb-4 font-weight-bold mr-2"
                                    onClick={() => {
                                        this.props.addToCart({
                                            product: {
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                currency: product.currency,
                                                image: product.image
                                            }
                                        })
                                    }}
                                >
                                    Adaugă în coș
                                </button>
                                <button className="btn btn-outline-dark"
                                        style={{width: 38, height: 38}}
                                        onClick={this.handleFavoriteClick}>
                                    {isFavorite ? <Heart style={{width: 15}}/> : <HeartPressed style={{width: 15}}/>}
                                </button>
                            </div>
                            <p><span className="font-weight-bold">Greutate</span>: {product.weight}</p>
                            <p><span className="font-weight-bold">Mărime</span>: {product.height}</p>
                            <p><span className="font-weight-bold">Durata de viață</span>: {product.lifeSpan}</p>
                            <p className="font-weight-bold mb-1">Descriere:</p>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { match } = ownProps;
    const productId = match.params.productId;
    return {
        isFavorite: state.favorite.products.some(
            (product) => product.id === Number(productId)
        ),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        addToFavorite: (product) => dispatch(addToFavorite(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);