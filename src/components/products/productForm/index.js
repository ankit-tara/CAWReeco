import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../redux/reducers/productSlice';
import { FormContainer, QuantityContainer, QuantityInput, QuantityButton } from "./style"

function ProductForm({ product, onClose }) {
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    quantity: 0,
    total: '',
    status: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setProductDetails({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        total: product.total,
        status: product.status,
      });
    }
  }, [product]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(0, productDetails.quantity + value);
    setProductDetails({ ...productDetails, quantity: newQuantity });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...productDetails, id: product.id }))
    onClose()
  };

  return (
    <FormContainer>
        <h2>{product?.name}</h2>
        <h4>{product?.brand}</h4>
        <div className="section-wrapper">
          <img src={product?.imgSrc} alt="Product Image" />
          <form onSubmit={handleSubmit}>
            <div className="inputWrapper">
              <p>Price: </p>
              <QuantityInput
                type="number"
                placeholder="Price"
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, price: e.target.value })
                }
              />
            </div>
            <QuantityContainer>
              <div className="inputWrapper">
                <p>Quantity:</p>
                <div>
                  <QuantityButton type="button" onClick={(e) => { handleQuantityChange(-1) }}>-</QuantityButton>
                  <QuantityInput
                    type="number"
                    placeholder="Quantity"
                    value={productDetails.quantity}
                    onChange={(e) =>
                      setProductDetails({ ...productDetails, quantity: e.target.value })
                    }
                  />
                  <QuantityButton type="button" onClick={(e) => { handleQuantityChange(1) }}>+</QuantityButton>
                </div>
              </div>
            </QuantityContainer>
            <div className="inputWrapper">
              <p>
                Total:
              </p>
              <p>{product?.total}</p>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
    </FormContainer>
  );
}

export default ProductForm;

