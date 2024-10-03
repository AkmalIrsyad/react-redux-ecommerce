import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { useState } from "react";

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [isChecked, setIsChecked] = useState(false)

    const handleLogin = () => {
        alert(`username :${inputUsername} | password: ${inputPassword}`)
    }

    return (
        <>
            <main className="px-4 container py-8 flex flex-col justify-center max-w-screen-md h-[90vh] items-center">
                <Card className="w-full max-w-[540px]">
                    <CardHeader>
                        <CardTitle>Welcome Back!</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input onChange={(event) => {
                                setInputUsername(event.target.value)
                            }}
                                id="username" />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input type={isChecked ? "text" : "password"} onChange={(event) => {
                                setInputPassword(event.target.value)
                            }}
                                id="password" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox onCheckedChange={(checked) => setIsChecked(checked)} id='show-password' />
                            <Label htmlFor="show-password">Show Password</Label>
                        </div>
                        <CardFooter>
                            <div className="flex flex-col space-y-4 w-full">
                                <Button onClick={handleLogin}>Login</Button>
                                <Button variant="link" className="w-full">SignUp instead</Button>
                            </div>
                        </CardFooter>
                    </CardContent>
                </Card>
            </main>
        </>
    );
};

export default LoginPage;
