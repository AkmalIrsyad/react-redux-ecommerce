import { AdminLayout } from "../../components/layout/AdminLayout";
import { axiosInstance } from "../../lib/axios";
import {useNavigate} from 'react-router-dom'
import { ProductForm } from "../../components/forms/ProductForm";

const CreateProductPage =() => {
    const navigate = useNavigate(); // ganti halaman(link)

const handleCreateProduct = async (values) => {
    try {
        await axiosInstance.post("/products",{
            name: values.name,
            price: values.price,
            stock: values.stock,
            imageUrl: values.imageUrl,
        });
        alert("Product created");
        navigate("/admin/products")
    } catch (err) {
            console.log(err)
    } 
};
    return(
        <AdminLayout title="Create Products" description="Add new product">
            <ProductForm cardTitle="Add New Product" onSubmit={handleCreateProduct}/>
        </AdminLayout>
    )
}
export default CreateProductPage