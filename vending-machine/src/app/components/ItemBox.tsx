import React from 'react';

export default function ItemBox() {
    return (
        <div className="item-box">
            <div className="item-image">
                <p className="sold-out">Sold Out</p>
                <div className="item-price">price</div>
                <div className="item-stock">stock</div>
                <img className="item-img-print" src="" alt="" />
            </div>
            <button className="buy-btn">
                구매
            </button>
        </div>
    )
}