import { useState, useMemo } from 'react';
import { useAppSelector } from '../components/Home'
import { useAppDispatch } from '../components/Home'
import { removeItem, increaseQuantity, decreaseQuantity } from '../slices/cartSlice';
import { createPortal } from 'react-dom';

const portalRoot = document.getElementById("portal");


export default function Cart() {

  const cartItems = useAppSelector(state => state.cart.cart)
  const dispatch = useAppDispatch();
  const [itemToDelete, setItemToDelete] = useState<number>(-1)

  const onConfirmHandler = (id: number) => {
    setItemToDelete(-1)
    dispatch(removeItem(id))
  }
  const onCancelHandler = () => {
    setItemToDelete(-1)
  }

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = item.quantity || 1
      const price = item.price || 0
      return sum + (price * quantity)
    }, 0)
  }, [cartItems])

  const cartItemsList = useMemo(() => {
    return cartItems.map(product => (
      <div className='flex items-center' key={product.id}>
        <div>
          <img src={product.thumbnail} />
        </div>
        <div className='flex flex-col gap-4'>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div className='flex  gap-10 items-center'>
            <p>{product.price || 0} x {product.quantity || 1} = {((product.price || 0) * (product.quantity || 1)).toFixed(2)}</p>
            <div className='flex gap-2 items-center'>
              <button onClick={() => dispatch(decreaseQuantity(product.id))} className='border px-2 py-1'>-</button>
              <span>{product.quantity || 1}</span>
              <button onClick={() => dispatch(increaseQuantity(product.id))} className='border px-2 py-1'>+</button>
            </div>
            <button className='bg-red-400 px-3 py-1 text-white' onClick={() => setItemToDelete(product.id)}>remove item</button>
          </div>
        </div>
      </div>
    ))
  }, [cartItems, dispatch])

  if (!portalRoot) return null;

  return (
    <div className=' '>
      <div className='flex flex-col'>
        {cartItemsList}
      </div>
      <div className='mt-4 border-t pt-4'>
        <p className='text-xl font-bold'>Total: {total.toFixed(2)}</p>
      </div>
      {/* ${itemToDelete!==-1?"":"hidden" }*/}
      {/* top-2 left-[40%] bg-white border p-10  */}
      <div className={``}>
        {createPortal(
          itemToDelete !== -1 && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40">
              <div className="mt-10 flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
                <p className="text-center">
                  Do you really want to delete this item?
                </p>

                <div className="flex gap-5">
                  <button
                    onClick={onCancelHandler}
                    className="rounded-lg border bg-red-200 px-4 py-2 hover:scale-105"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => onConfirmHandler(itemToDelete)}
                    className="rounded-lg border bg-green-200 px-4 py-2 hover:scale-105"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ),
          portalRoot
        )}

      </div>
    </div>

  )
}
