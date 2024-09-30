/* eslint-disable react/prop-types */
export const ContactButton = ({ children }) => {
    return (
        <>
            <button className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800">{children}</button>
        </>
    )
}