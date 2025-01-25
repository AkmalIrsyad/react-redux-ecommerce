
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { axiosInstance } from "../lib/axios"; //baseUrl nya ada di lib/axios.js
import { Skeleton } from "../components/ui/skeleton";
import { useSelector } from "react-redux";

const HomePages = () => {
    const [productsIsLoading, setProductsIsLoading] = useState(false); //untuk loading....
    const [products, setProducts] = useState([]);

    const userSelector = useSelector((state) => state.userPengguna);

    const productsList = products.map((product) => {
        return (
            <ProductCard
                id={product.id} // bukan id dari db.json
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                stock={product.stock}
            />
        );
    });

    const fetchProducts = async () => {
        setProductsIsLoading(true)
        try {
            const response = await axiosInstance.get("/products")
            console.log(response.data)
            setProducts(response.data)
        } catch (err) {
            console.log(err)
        } finally {
            setProductsIsLoading(false)
        }
    }
    // Fetch Product data once, when home page is first mounted
    useEffect(() => {
        fetchProducts()
    }, []);
    return (
        <>
            <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
                <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Become a Trend-setter with us. {userSelector.username}
                    </h1>
                    <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                        GogoroShop provide you with the finest clothings and
                        ensures yours confidence throughout your days. 
                    </p>
                </div>
                {
                    productsIsLoading ? (
                        <div className="flex flex-col space-y-2">
                            <Skeleton className="h-[327px] w-[350px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-[24px] w-[320px]" />
                                <Skeleton className="h-[28px] w-[305px]" />
                                <Skeleton className="h-[20px] w-[290px]" />
                            </div>
                        </div>
                    )
                        : (<div className="grid grid-cols-2 gap-4">{productsList}</div>) // conditional Rendering dan Operator Ternary
                }
            </main>
        </>
    );
}
export default HomePages;