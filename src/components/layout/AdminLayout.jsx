/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoAdd, IoCart, IoPerson, IoPricetag } from "react-icons/io5"
import { Button } from "../ui/button"

const SideBarItem = (props) => {
    const { children } = props;
    return (
        <Button variant="ghost" size="lg" className="w-full rounded-none justify-start">
            {children}
        </Button>
    )
}

export const AdminLayout = (props) => {
    const { title, description, rightSection, children } = props
    return (
        <div className="flex">
            <aside className="w-72 border-r  h-screen">
                <div className="h-16 flex flex-col items-center justify-center border-b">
                    <h1 className="font-semibold text-3xl">Admin dashboard</h1>
                </div>
                <div className="flex flex-col space-y-0 py-4">
                    <SideBarItem>
                        <IoPricetag className="h-6 w-6 mr-4">
                        </IoPricetag>
                        Product Management
                    </SideBarItem>
                    <SideBarItem>
                        <IoCart className="h-6 w-6 mr-4">
                        </IoCart>
                        Order Management
                    </SideBarItem>
                </div>
            </aside>
            <div className="flex-1">
                <header className="h-16 border-b w-full flex justify-end items-center px-8">
                    <Button className="rounded-full" size="icon">
                        <IoPerson className="h-6 w-6"></IoPerson>
                    </Button>
                </header>
                <main className="flex flex-col p-4">
                    <div className="flex justify-between items-center pb-4 border-b mb-8">
                        <div>
                            <h1 className="font-bold text-4xl">{title}</h1>
                            <p className="text-muted-foreground">{description}</p>
                        </div>
                        {rightSection}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    )
}
