import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewIrem = ({ product, handleRemoveFromCart }) => {
    const { _id, img, price, name, quantity } = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Order Quantity: <span className='orange-text'>{quantity}</span></p>
            </div>
            <div>
                <button onClick={()=> handleRemoveFromCart(_id)} className='btn-delete'><FontAwesomeIcon icon={faTrashAlt} className="delete-icon" /></button>
            </div>
        </div>
    );
};

export default ReviewIrem;