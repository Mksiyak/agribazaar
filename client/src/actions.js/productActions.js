import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants"; 
import axios from 'axios';
import { serverUrl } from "../shared/baseUrl";

const listProducts = () => async(dispatch) =>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(serverUrl+"item/all");
        dispatch({type: PRODUCT_LIST_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});
    }
}
export { listProducts } 