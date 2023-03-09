import React from 'react';
import {Link} from 'react-router-dom';

export const HomeCategory = (props) => {
    const {route, name, description, image} = props;

    return (
        <div style={{height: 600}} className="col-12 col-md-6 my-3">
            <Link to={`/category/${route}`} style={{textDecoration: "none"}}>
                <div style={{height: 400}} className="w-100">
                    <img src={image} alt={name} className="w-100 h-100"/>
                </div>
                <div>
                    <h2 className="h4 my-1"><strong>{name}:</strong></h2>
                    <p className="m-0">{description}</p>
                </div>
            </Link>
        </div>
    );
}