import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { IoCart, IoHeart } from 'react-icons/io5'
import { Separator } from './ui/separator'
import { Link } from 'react-router-dom'
export const Header = () => {
    return (
        <header className="h-16 border-b flex items-center justify-between px-8">
            {/* Brand */}
            <p className="text-2xl font-bold hover:cursor-pointer">GogoroShop</p>
            {/* Search Bar */}
            <Input className="max-w-[600px]" placeholder="Search Product....." />
            {/* Buttons */}
            <div className="flex space-x-4 h-5 items-center">
                <div className="flex space-x-2">
                    <Link to={'/cart'}>
                        <Button variant="ghost" size="icon">
                            <IoCart className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                        <IoHeart className="h-5 w-5" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-full" />

                {/*  */}
                <div className="flex space-x-2">
                    <Button>Login</Button>
                    <Button variant="outline">SignUp</Button>
                </div>
            </div>
        </header>
    )
}