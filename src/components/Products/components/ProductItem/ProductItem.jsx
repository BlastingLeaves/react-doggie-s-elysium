import React from 'react';
import './ProductItem.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart} from "../../../../redux/cart/CartActions";

function ProductItem(props) {
    const {name, price, currency, image, id} = props;

    return (
        <div className="product-item col-12 col-md-4 mb-3 d-flex flex-column align-items-center">
            <div style={{width: 500}}>
                <Link to={`/product/${id}`} className="d-flex flex-column align-items-center">
                    <img src={image} alt="productPhoto" className="mb-2" width={"100%"} height={"100%"}/>
                    <p className="mb-1 text-center">{name}</p>
                    <p className="text-center">{price + currency}</p>
                </Link>
            </div>
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
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product))
    };
}

export default connect(null, mapDispatchToProps)(ProductItem);