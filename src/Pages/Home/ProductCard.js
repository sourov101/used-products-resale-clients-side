import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import BookNowModal from './BookNowModal';


const ProductCard = ({ product }) => {
    const { name, image, resalePrice, originalPrice, yearOfUse, postTime, sellerName, location } = product;
    const [book, setBook] = useState(null);
    return (
        <div className='mx-auto '>
            <div className="card w-96 bg-base-100 shadow-xl ">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>Resale Price: {resalePrice}</p>
                    <p>Original Price: {originalPrice}</p>
                    <p>Year Of Use: {yearOfUse}</p>
                    <p>Post Time: {postTime}</p>


                    <p className='flex justify-between'>Seller Name: {sellerName}{
                        product.verified === 'true' && <FaCheck className='text-primary mx-2' />
                    }</p>


                    <p>Location: {location}</p>
                </div>
                <div className='text-center my-4'>

                    <label

                        htmlFor="booking-modal"
                        className="btn btn-primary text-white"
                        onClick={() => setBook(product)}
                    >Book Now</label>

                </div>
                <div>
                    {book &&


                        <BookNowModal
                            book={book}
                        >

                        </BookNowModal>}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;