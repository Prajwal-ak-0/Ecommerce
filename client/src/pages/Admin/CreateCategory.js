import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd"

const CreateCategory = () => {
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [visible, setvisible] = useState(false);
  const [selected, setselected] = useState(null);
  const [updateName, setupdateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form ");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category");
    }
  };

  const handleUpdate=async (e) => {
    e.preventDefault();
    try {
      const {data} =await axios.put(`/api/v1/category/update-category/${selected._id}`,
      {name:updateName}
      )

      if(data?.success){
        toast.success(`${updateName} is updated!`);
        setselected(null);
        setupdateName("");
        setvisible(false);
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete=async (id)=>{
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if(data.success){
        toast.success("Category is Deleted");
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard-CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setvalue={setname}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2 "
                            onClick={()=>{
                              setvisible(true);
                              setselected(c);
                              setupdateName(c.name);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2"
                          onClick={()=>{handleDelete(c._id)
                          }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={()=>setvisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updateName}
                setvalue={setupdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
