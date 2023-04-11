import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import SimpleImageSlider from "react-simple-image-slider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);


  const navigate=useNavigate();
  /***********************Demo***************/
  // const options = {
  //   method: 'GET',
  //   url: 'https://aliexpress-datahub.p.rapidapi.com/item_search_promotion_deals',
  //   params: {page: '1'},
  //   headers: {
  //     'X-RapidAPI-Key': '9acef659e4mshc8d76aa81a52888p19b689jsnc73c8646d7e1',
  //     'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com'
  //   }
  // };

  // axios.request(options).then(function (response) {
  //   console.log(response.data.result.resultList.item);
  // }).catch(function (error) {
  //   console.error(error);
  // });
  
  /***********************Demo***************/

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //get total no of count
  const getTotal=async ()=>{
    try {
      const {data} =await axios.get('/api/v1/product/product-count');
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(page===1) return;
    loadMore();
  },[page])
  const loadMore=async ()=>{
    try {
      setLoading(true);
      const {data} =await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products-Best Offers"}>
      <div className="conatiner-fluid row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p.array}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button 
            style={{width:'100px',marginLeft:'25px'}}
            onClick={()=>window.location.reload()}
            className="btn btn-danger mt-2">
              Reset
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
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
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length <total && (
              <button className="btn btn-warning" onClick={(e)=>{
                e.preventDefault();
                setPage(page+1);
              }}>
                {loading ? "Loading..." :"LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
