import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            { detail.shipping ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        <div>Free shipping</div>
                        <div>And return</div>
                    </div>
                </div>
            :null
            }
            { 
                <div className="tag">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div className="tag_text">
                        <div>Available</div>
                        
                    </div>
                </div>
            
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price">$ { detail.price }</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={()=>{
                        console.log('add to cart')
                      // props.addToCart(detail._id)
                    }}
                />
            </div>
        </div>
    )

    const showProdSpecifications = (detail) => (
        <div className="product_specifications">
            <h2>Specifications:</h2>
            <div>
                <div className="item">
                    <strong>Description:</strong> {detail.description}
                </div>
                
            </div>
        </div>
    )


    const detail = props.detail;
    return (
        <div>
           
            <h1>{detail.name}</h1>
            <h2>Category: {detail.category.name} </h2>
            <p>
                {detail.description}
            </p>
            { showProdTags(detail)}
            { showProdActions(detail)}
            { showProdSpecifications(detail)}
        </div>
    );
};

export default ProdNfo;