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

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();


    const [products, setProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true)
    const [ productName, setProductName ] = useState("")

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
        const shouldDelete = confirm("Are You Sure you want to delete This Product");
        if (!shouldDelete) {
            return;
        }
        try {
            await axiosInstance.delete("/products/" + productId);
            alert("Product Deleted")
            fetchProducts();
        } catch (err) {
            console.log(err)
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
                <Link to="/admin/products/create">
                <Button>
                    <IoAdd className="h-6 w-6 mr-2" />
                    Add Product
                </Button>
                </Link>
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
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>Rp{(product.price).toLocaleString("id-ID")}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <div className="flex gap-4">
                                       <Link to={"/admin/products/edit/" + product.id}>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-6 h-6" />
                                    </Button>
                                    </Link>
                                    <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive" size="icon">
                                        <Trash  className="w-6 h-6" />    
                                    </Button> 
                                    </div>
                                    
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