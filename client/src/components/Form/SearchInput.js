import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchInput = () => {
    const [values,setValues]=useSearch();
    const navigate=useNavigate();

    const handleSubmit=async (e) =>{
      e.preventDefault();
      try {
        const {data}=await axios.get(`/api/v1/product/search/${values.keyword}`);
        setValues({...values,results:data});
        navigate("/search");
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
         <form role="search" onClick={handleSubmit} className='d-flex'>
            <input type="search" className='form-control me-2' placeholder='search' aria-label='search'
            value={values.keyword}
            onChange={(e)=>setValues({...values,keyword:e.target.value
          })}
            />
            <button 
            type="submit" className="btn btn-outline-success">
                Search
            </button>
         </form>
    </div>
  )
}

export default SearchInput