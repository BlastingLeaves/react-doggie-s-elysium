import React, {useState} from 'react';
import './ProductItem.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart} from "../../../../redux/cart/CartActions";
import {ReactComponent as Heart} from "../../../../assets/icons/heart.svg"
import {ReactComponent as HeartPressed} from "../../../../assets/icons/heart-outline.svg"
import {addToFavorite} from "../../../../redux/favorite/FavoriteActions";

function ProductItem(props) {
    const {name, price, currency, image, id, isFavorite} = props;
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

    const handleFavoriteClick = () => {
        setIsFavoriteState(!isFavoriteState);
        props.addToFavorite({
            product: {
                id,
                name,
                price,
                currency,
                image,
            },
        });
    };

    return (
        <div className="product-item col-12 col-md-4 mb-3 d-flex flex-column align-items-center">
            <div style={{width: 500}}>
                <Link to={`/product/${id}`} className="d-flex flex-column align-items-center">
                    <img src={image} alt="productPhoto" className="mb-2" width={"100%"} height={"100%"}/>
                    <p className="mb-1 text-center">{name}</p>
                    <p className="text-center">{price + currency}</p>
                </Link>
            </div>
            <div>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => props.addToCart({
                        product: {
                            id,
                            name,
                            price,
                            currency,
                            image
                        }
                    })}
                >
                    Adaugă în coș
                </button>
                <button className="btn btn-outline-dark ml-1"
                        style={{width: 39, height: 38}}
                        onClick={handleFavoriteClick}>
                    {isFavoriteState ? <Heart style={{width: 15}}/> : <HeartPressed style={{width: 15}}/>}
                </button>
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        isFavorite: state.favorite.products.some(
            (product) => product.id === ownProps.id
        ),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        addToFavorite: (product) => dispatch(addToFavorite(product))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);