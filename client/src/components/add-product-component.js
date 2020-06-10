import React, { useEffect } from "react";
import { listProducts } from "../actions.js/productActions";
import { useDispatch , useSelector } from 'react-redux';
import { useState } from "react";
import Axios from "axios";
import { serverUrl } from "../shared/baseUrl";
import { createNotification } from "../App";

const Addproduct = ()=> {
    const productlist = useSelector(state => state.productList).products;
    const dispatch = useDispatch();
    const [productid, setproductid] = useState('');
    const [price, setprice] = useState('');
    const [unit, setunit] = useState('');
    const [image, setimage] = useState(null);
    const [tags, settags] = useState('');
    const [quantity, setquantity] = useState('')
    useEffect(() => {
        dispatch(listProducts());
    },[]);
    useEffect(()=>{ 
        console.log(image);    
    },[image]
    )

    const getCookie = (name)=>{
        const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(productid,price,unit,image,tags,quantity);
        const formData = new FormData();
        formData.append('productid',productid);
        formData.append('price',price);
        formData.append('unit',unit);
        formData.append('image',image);
        formData.append('tags',tags);
        formData.append('quantity',quantity);
        formData.append('sellerId',getCookie('user_id'));
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        Axios.post(serverUrl+"item",formData,config).then(res => {
                    console.log(res);
                    if(res.status/100===2)
                    {
                        createNotification("success",`Product added successfully`);
                    }
                    else{
                        // <Redirect to="#"/>
                        createNotification("error",`error`);
                    }
                })
    }

    
    return(
            <div className="add-product-wrapper" style={{alignContent:'centre',marginBottom:'200px',marginTop:'100px'}}>
                <div style={{width:'500px',maxWidth:'100%' ,margin:'auto'}}>
                <form>
                    <h3>Add Product</h3>
                    
                    <div className="form-group">
                    <label>Product</label>
                    <br/>
                    <select style={{width:'100%'}} onChange={(e) => setproductid(e.target.value)} value={productid}>
                        <option value = "">select</option>
                        {
                            productlist.map((product)=>
                                <option value = { product.id }>{ product.name }</option>
                            )
                        }
                    </select>
                    </div>

                    <div className="form-group">
                    <label>Price</label>
                    <input required onChange={(e) => setprice(e.target.value)} value={price} type="text" className="form-control"  />
                    </div>

                    <div className="form-group">
                    <label>Price Unit</label>
                    <br/>
                    <select style={{width:'100%'}} onChange={(e) => setunit(e.target.value)} value={unit}>
                        <option>select</option>
                        <option value = 'rupee/kg'>rupee/kg</option>
                        <option value = 'rupee/lit'>rupee/litere</option>
                    </select>
                    </div>

                    <div className="form-group" onChange={(e) => setquantity(e.target.value)} value={quantity}>
                    <label>Quantity</label>
                    <input required type="text" className="form-control"  />
                    </div>

                    <div className="form-group"onChange={(e) => {setimage(e.target.files[0])}} value={image} >
                    <label>Image</label>
                    <input  type="file"  accept="image/png, image/jpeg" className="form-control" style = {{border:'0px',height:'50px'}} />
                    </div>

                    <div className="form-group" onChange={(e) => settags(e.target.value)} value={tags}>
                    <label>Tags</label>
                    <input required type="text" className="form-control"  />
                    </div>

                </form>
                
                <button  type="submit" onClick = {handleSubmit} className="btn btn-primary btn-block">Submit</button>

                </div>
            </div>
        )
}
export default Addproduct;