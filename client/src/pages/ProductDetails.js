import { Layout } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const params=useParams();
  const [product,setProduct] =useState({});
  const [relatedProducts,setRelatedProducts]=useState([]);
  useEffect(()=>{
    if(params?.slug) getProduct();
  },[params?.slug]);

  const getProduct=async () =>{
    try {
      const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error)
    }
  }

  const getSimilarProducts=async (pid,cid) =>{
    try {
      const {data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} className='card-img-top' height='350' width='250' />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">
            Product Details
          </h1>
          <h4>Name: {product.name} </h4>
          <h4>Description: {product.description} </h4>
          <h4>Price: {product.price} </h4>
          <h4>Category: {product.category?.name} </h4>
          <button className="btn btn-secondary ms-1">
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />

      <div className="row">
        <h2> Similar Products</h2>
        {relatedProducts.length < 1 && (<p>No Similar Products Found</p>)}
        <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div style={{ width: "18rem" }} key={p._id} className="card m-2">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p.price}</p>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  )
}

export default ProductDetails