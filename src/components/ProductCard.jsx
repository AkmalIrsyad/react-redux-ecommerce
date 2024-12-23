/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { Link } from 'react-router-dom'


export const ProductCard = (props) => {

  const [quantity, setQuantity] = useState(0)

  const { imageUrl, name, price, stock, id } = props

  const AddToCart = () => { };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  }

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link to={"/product/" + id} className="aspect-square w-full overflow-hidden">
        <img
          className="w-full"
          src={imageUrl}
          alt="product"
        />
      </Link>
      <Link to={"/product/" + id}>
        <p className="text-md">{name}</p>
        <p className="text-xl font-semibold">Rp {price.toLocaleString("id-ID")}</p>
        <p className="text-muted-foreground text-sm">In Stock: {stock}</p>
      </Link>

      <div className="flex flex-col gap-2">
        {/* Button Quantity */}
        <div className="flex justify-between items-center">
          <Button disabled={quantity == 0} onClick={decrementQuantity} size="icon" variant="ghost">
            <IoIosRemove className="h-6 w-6" />
          </Button>
          <p className="text-lg font-bold">{quantity}</p>
          <Button disabled={quantity >= stock} onClick={incrementQuantity} size="icon" variant="ghost">
            <IoIosAdd className="h-6 w-6" />
          </Button>
        </div>
        {/* Button add to cart */}
        <Button disabled={!Boolean(stock)} onClick={AddToCart} className="w-full hover:bg-white border border-black hover:text-black transition duration-300 ease-in-out">
          {stock > 0 ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  )
}