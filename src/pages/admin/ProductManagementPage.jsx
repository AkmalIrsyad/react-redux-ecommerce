/* eslint-disable react/jsx-key */
import { IoAdd } from "react-icons/io5";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../..//components/ui/table"
import { ChevronLeft, ChevronRight, Edit, Trash, } from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem } from "../../components/ui/pagination"
import { Link, useSearchParams } from 'react-router-dom'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {Checkbox} from "../../components/ui/checkbox";

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();


    const [products, setProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [ productName, setProductName ] = useState("");
    const [selectedProductIds,setSelectedProductIds] = useState([]);

    const searchProduct = () => {
        if (productName) {
            searchParams.set("search", productName);
            setSearchParams(searchParams);   
        }else{
            searchParams.delete("search")
            setSearchParams(searchParams);   
        }
        
    }

    const handleNextPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) + 1)
        setSearchParams(searchParams)
    }

    const handlePreviousPage = () => {
        searchParams.set("page", Number(searchParams.get("page")) - 1)
        setSearchParams(searchParams)
    }

    const handleDeleteProduct = async (productId) =>{
        const shouldDelete = confirm(`Are You Sure you want to delete ${selectedProductIds.length} This Product?`);
        if (!shouldDelete) 
            return;
            const deletePromises = selectedProductIds.map((productId) => {
                return axiosInstance.delete("/products/" + productId)
            })
            try {
                await Promise.all(deletePromises)
                alert(`Successfully Deleted ${selectedProductIds.length} products!`)
                searchParams.set("page", Number(1));
                setSearchParams(searchParams);
                setSelectedProductIds([]);
                fetchProducts();
            } catch (err) {
                console.log(err)
        };
        try {
            await axiosInstance.delete("/products/" + productId);
            alert("Product Deleted")
            fetchProducts();
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnCheckedProduct = (productId,checked) =>{
        if (checked) {
            const prevSelectedProductIds = [...selectedProductIds];
            prevSelectedProductIds.push(productId);
            setSelectedProductIds(prevSelectedProductIds);
        }else{
            const productIdIndex = selectedProductIds.findIndex((id) =>{
                return id == productId;
            });

            const prevSelectedProductIds = [...selectedProductIds];
            prevSelectedProductIds.splice(productIdIndex,1);
            setSelectedProductIds(prevSelectedProductIds);
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/products", {
                params: {
                    _per_page: 5, //limit dari axios
                    _page: Number(searchParams.get("page")),
                    name: searchParams.get("search") //Kalau ini Kosong, dia akan gak nge-filter by name
                }
            });

            // console.log(response.data);
            setHasNextPage(Boolean(response.data.next)) // null diubah jadi boolean (false)
            setProducts(response.data.data)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        if (searchParams.get("page")) {
            fetchProducts();
        }
    }, [searchParams.get("page"), searchParams.get("search")]);

    useEffect(() => {
        if (!searchParams.get("page")) {
            searchParams.set("page", 1)
            setSearchParams(searchParams)
        }
    }, [])

    return (
        <AdminLayout
            title="Product Management"
            description="Managing Our Product"
            rightSection={
                <div className="flex gap-2">
                    { // Conditonal Rendering
                        selectedProductIds.length ? (
                           <Button variant="destructive" onClick={handleDeleteProduct} >Delete {selectedProductIds.length} Products</Button> 
                        ): null}
                    <Link to="/admin/products/create">
                <Button>
                    <IoAdd className="h-6 w-6 mr-2" />
                    Add Product
                </Button>
                </Link>  
                </div>
              
            }
        >
        <div className="mb-8">
            <Label>Search Product Name</Label>
            <div className="flex gap-4">
                <Input  
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="max-w-[400px]" 
                placeholder="Cari..."
                />
                <Button onClick={searchProduct}>Search</Button>
            </div>
        </div>
            <Table className="p-4 border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => {
                        return (
                            <TableRow>
                                <TableCell>
                                    <Checkbox onCheckedChange={(checked) => handleOnCheckedProduct(product.id,checked)}
                                        checked={selectedProductIds.includes(product.id)}
                                        />
                                </TableCell>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>Rp{(product.price).toLocaleString("id-ID")}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                       <Link to={"/admin/products/edit/" + product.id}>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-6 h-6" />
                                    </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })
                    }
                </TableBody>
            </Table>
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <Button disabled={searchParams.get("page") == 1} onClick={handlePreviousPage} variant="ghost">
                            <ChevronLeft className="w-6 h-6 mr-6" />Previous</Button>
                    </PaginationItem>

                    <PaginationItem className="mx-8 font-semibold">
                        Page {searchParams.get("page")}
                    </PaginationItem>

                    <PaginationItem>
                        <Button disabled={!hasNextPage} onClick={handleNextPage} variant="ghost">
                            Next<ChevronRight className="w-6 h-6 ml-2" /></Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </AdminLayout>
    )
}
export default ProductManagementPage;