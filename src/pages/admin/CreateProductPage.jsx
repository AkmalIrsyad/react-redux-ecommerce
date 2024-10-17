import { z } from "zod";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const CreateProductFormSchema = z.object({
    name: z.string()
        .min(3, "Your Product Name is under 3 characters")
        .max(80, "Your Product Name is over 80 characters"),
    price: z.coerce.number()
        .min(10000, "Price Cannot be under Rp 10.000"),
    stock: z.coerce.number()
        .min(1,"stock Cannot be under 1"),
    imageUrl: z.string().url("use a valid URL"),
});

const CreateProductPage =() => {
    const form = useForm({
        defaultValues:{
            name:"",
            price:0,
            stock:0,
            imageUrl:"",
        },
        resolver:zodResolver(CreateProductFormSchema),
    });

const handleCreateProduct = (values) => {
    console.log(values);
}
    return(
        <AdminLayout title="Create Products" description="Add new product">
            <h1>Create Product Page</h1>
            <Form {...form}> 
                <form onSubmit={form.handleSubmit(handleCreateProduct)} className="max-w-[540px] w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-semibold">Add new Product</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col">
                        {/* name */}
                        <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>Product Name Has to be between 3 and 80 characters</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                        {/* price */}
                           <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                         {/* stock */}
                         <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} /> 
                          {/* imageUrl */}
                          <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>Please use valid image URL</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />           
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Create New Product</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </AdminLayout>
    )
}
export default CreateProductPage