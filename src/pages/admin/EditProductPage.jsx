import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../../components/forms/ProductForm";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";


const EditProductPage = () =>{
    const [product, setProduct] = useState({
        "id": 0,
        "name": "",
        "price": 0,
        "imageUrl": "",
        "stock": 0
    });

    const params = useParams()

    const navigate = useNavigate()

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get("/products/" + params.productId)
            // console.log(response.data)
            setProduct(response.data) //menampilkan data ke ui
        } catch (err) {
            console.log(err)
        }   
    };

    const HandleEditProduct = async (values) =>{
        try {
            await axiosInstance.patch("/products/" + params.productId,
                {
                    name: values.name,
                    price: values.price,
                    stock: values.stock,
                    imageUrl: values.imageUrl,
                }
            );
            alert("Product edited");
            navigate("/admin/products");
        } catch (err) {
            console.log(err)
        }
    }; 

    useEffect(() =>{
        fetchProduct();
    },[]);

    return(
        
        <AdminLayout title="Edit Product" description="Editing product">
        { product.id ?( //conditonal Rendering
            <ProductForm 
            cardTitle={"Editing " + product.name}
            defaultName={product.name}
            defaultPrice={product.price}
            defaultStock={product.stock}
            defaultImageUrl={product.imageUrl} 
            onSubmit={HandleEditProduct} 
            />  
        ):null}
        </AdminLayout>
    );  
};

export default EditProductPage;