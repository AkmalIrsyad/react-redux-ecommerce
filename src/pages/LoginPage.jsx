import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormItem, FormMessage, FormLabel, FormField, FormControl, FormDescription } from '../components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormSchema = z.object({
    username: z.string()
        .min(3, "Your Username is under 3 characters")
        .max(16, "Your Username is over 16 characters"),
    password: z.string()
        .min(8, "Your password is under 8 Characters"),
});

const LoginPage = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(loginFormSchema),
        reValidateMode: "onSubmit" // ngetrigger error (macam2 jenis revalidatemode) 
    });
    // Checked show password
    const [isChecked, setIsChecked] = useState(false)

    // Validasi length username and password
    const handleLogin = (values) => {
        console.log(values)
        alert(`username :${values.username} | password: ${values.password}`)
    }

    return (
        <>
            <main className="px-4 container py-8 flex flex-col justify-center max-w-screen-md items-center h-[90vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]">
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome Back!</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>Username Has to be between 3 and 16 characters</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field}
                                                    type={isChecked ? "text" : "password"}
                                                />
                                            </FormControl>
                                            <FormDescription>Password has to be 8 characters or more</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <div className="flex items-center space-x-2">
                                    <Checkbox onCheckedChange={(checked) => setIsChecked(checked)} id='show-password' />
                                    <Label htmlFor="show-password">Show Password</Label>
                                </div>
                                <CardFooter>
                                    <div className="flex flex-col space-y-4 w-full">
                                        <Button type="submit">Login</Button>
                                        <Button variant="link" className="w-full">SignUp instead</Button>
                                    </div>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </main>
        </>
    );
};

export default LoginPage;
