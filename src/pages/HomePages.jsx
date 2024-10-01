import { ProductCard } from "../components/ProductCard";


const productRaw = [
    {
        name: "t-shirt Navy Blue",
        price: 50000,
        imageUrl: "https://bb-scm-prod-pim.oss-ap-southeast-5.aliyuncs.com/products/54a991407ef8936e75e8d4bdb1da600b/helix/01-CHAMPION-AAJV6CMPA-CMPC3X301BLK-Black.jpg?x-oss-process=image/format,webp",
        stock: 4,
    },
    {
        name: "t-shirt white",
        imageUrl: "https://bb-scm-prod-pim.oss-ap-southeast-5.aliyuncs.com/products/87be003ef93d1ad0e5b0e74daedfc3bc/helix/01-CHAMPION-AAJV6CMPA-CMPC3X301WHT-White.jpg?x-oss-process=image/format,webp",
        price: 150000,
        stock: 0,
    },
];

const HomePages = () => {
    const products = productRaw.map((product, id) => {
        return (
            <ProductCard
                key={id}  // Menambahkan key di sini
                imageUrl={product.imageUrl}
                name={product.name}
                stock={product.stock}
                price={product.price}
            />
        )
    })
    return (
        <>
            <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
                <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Become a Trend-setter with us.
                    </h1>
                    <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                        GogoroShop provide you with the finest clothings and
                        ensures yours confidence throughout your days.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {products}
                </div>

            </main>
        </>
    );
}
export default HomePages;