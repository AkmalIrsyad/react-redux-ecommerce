import { ContactButton } from "./Contact-button"

export const Footer = () => {
    return (
        <footer className="min-h-16 border-t py-8 flex items-center justify-between px-20 mt-20">
            <p>Gogoro Copyright 2024</p>
            {/* <ContactButton label="Halo Dunia" /> */}
            <ContactButton>
                Contact Us
            </ContactButton>
        </footer>
    )
}