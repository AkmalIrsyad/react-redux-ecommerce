/* eslint-disable no-undef */
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom'
import { axiosInstance } from "../lib/axios";
import { Skeleton } from "../components/ui/skeleton";


const ProductsDetailPage = () => {
    // 1, dapetin id
    // 2, fetch product yang memiliki ID tersebut
    // 3. masukin data product ke state
    // 4. tampilin data  dari ke ui
    const params = useParams();
    const [product, setProduct] = useState({
        "id": 0,
        "name": "",
        "price": 0,
        "imageUrl": "",
        "stock": 0
    })
    const [productsIsLoading, setProductsIsLoading] = useState(true) //untuk loading skeleton....

    const [quantity, setQuantity] = useState(0);

    const fetchProduct = async () => {
        try {
            setProductsIsLoading(true)
            const response = await axiosInstance.get("/products/" + params.productId)
            // console.log(response.data)
            setProduct(response.data) //menampilkan data ke ui
        } catch (err) {
            console.log(err)
        } finally {
            setProductsIsLoading(false)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [])


    return (
        <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
            <div className="grid grid-cols-2 gap-8">
                {
                    productsIsLoading ? <Skeleton className="w-full h-[480px]" />
                        : <img src={product.imageUrl} alt={product.name} className="w-full" />
                }

                <div className="flex flex-col gap-1 justify-center">
                    {
                        productsIsLoading ? <Skeleton className="w-[250px] h-[32px]" />
                            : <h1 className="text-xl">{product.name}</h1>
                    }

                    {
                        productsIsLoading ? <Skeleton className="w-[350px] h-[48px]" />
                            : <h3 className="text-3xl font-bold">Rp {product.price.toLocaleString('id-ID')}</h3>
                    }

                    {
                        productsIsLoading ? <Skeleton className="w-[350px] h-[120px] mt-4" />
                            :
                            <p className="text-sm text-muted-foreground mt-4">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati provident ipsam nisi enim? Ducimus ad accusamus quos? Rem repellat autem ex nulla nesciunt aut temporibus consectetur hic doloremque. Error, nemo!
                            </p>
                    }
                    <div className="flex items-center gap-8 mt-6">
                        {/* Button Quantity */}
                        <Button size="icon" variant="ghost">
                            <IoIosRemove className="h-6 w-6" />
                        </Button>
                        <p className="text-lg font-bold">{quantity}</p>
                        <Button size="icon" variant="ghost">
                            <IoIosAdd className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="flex items-center mt-8 gap-4 ">
                        <Button className="w-full" size="lg">
                            Add to cart
                        </Button>
                        <Button size="icon" variant="ghost">
                            <IoHeartOutline className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default ProductsDetailPage;