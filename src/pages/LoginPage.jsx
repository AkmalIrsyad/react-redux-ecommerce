import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { useState } from "react";


const LoginPage = () => {

// Message Error
    const [inputUsernameMessage, setInputUsernameMessage] = useState("");
    const [inputPasswordMessage, setInputPasswordMessage] = useState("")
// render kolom input username dan Password 
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
// Checked show password
    const [isChecked, setIsChecked] = useState(false)

    // Validasi length username and password
    const handleLogin = () => {
        const usernameIsValid = inputUsername.length >= 3
        const passwordIsValid = inputPassword.length >= 8

        if (!usernameIsValid) {
            alert("Username needs to be 3 Characters or more")
            return
        }
        if (!passwordIsValid) {
            alert("Password needs to be 8 Characters or more")
            return
        }
        alert(`username :${inputUsername} | password: ${inputPassword}`)
    }

    return (
        <>
            <main className="px-4 container py-8 flex flex-col justify-center max-w-screen-md items-center h-[90vh]">
                <form onSubmit={handleLogin} className="w-full max-w-[540px]">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome Back!</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input onChange={(event) => {
                                if (event.target.value.length < 8) {
                                    setInputUsernameMessage("Username needs to be 3 Characters or more")
                                } else {
                                    setInputUsernameMessage("")
                                }
                                setInputUsername(event.target.value)
                            }}
                                id="username" />
                        </div>
                        <p className="text-red-500 text-sm text-muted-foreground">{inputUsernameMessage}</p>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input type={isChecked ? "text" : "password"} onChange={(event) => {
                                if (event.target.value.length < 8) {
                                    setInputPasswordMessage("Password needs to be 8 Characters or more")
                                } else {
                                    setInputPasswordMessage("")
                                }
                                setInputPassword(event.target.value)
                            }}
                                id="password" />
                        </div>
                        <p className="text-red-500 text-sm text-muted-foreground">{inputPasswordMessage}</p>
                        <div className="flex items-center space-x-2">
                            <Checkbox onCheckedChange={(checked) => setIsChecked(checked)} id='show-password' />
                            <Label htmlFor="show-password">Show Password</Label>
                        </div>
                        <CardFooter>
                            <div className="flex flex-col space-y-4 w-full">
                                <Button type="submit" disabled={inputUsername.length < 3 || inputPassword.length < 8}>Login</Button>
                                <Button variant="link" className="w-full">SignUp instead</Button>
                            </div>
                        </CardFooter>
                    </CardContent>
                </Card>
                </form>
            </main>
        </>
    );
};

export default LoginPage;
