import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

const NotFoundPage = () => {
    return (
        <div>
            <div className="grid h-screen place-content-center bg-white px-4 w-screen">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-200">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-gray-500">We cant find that page.</p>

                    <Link to={'/'}>
                        <Button>Go back home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
