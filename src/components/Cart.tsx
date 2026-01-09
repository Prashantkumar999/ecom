import { useState } from 'react';
import { useAppSelector } from '../components/Home'
import { useAppDispatch } from '../components/Home'
import { removeItem } from '../slices/cartSlice';

export default function Cart() {
    const cartItems = useAppSelector(state => state.cart.cart)
    const dispatch = useAppDispatch();
    const [itemToDelete, setItemToDelete] = useState<number>(-1)
    // const onRemoverHandler = (id: number) => {
    //     dispatch(removeItem(id))
    // }
    const onConfirmHandler = (id: number) => {
        // console.log(id)
        setItemToDelete(-1)
        dispatch(removeItem(id))
    }
    const onCancelHandler = (id: number) => {
        setItemToDelete(-1)
    }
    return (
        <div className=' relative'>

            <div className='flex flex-col'>
                {
                    cartItems.map(product => <div className='flex items-center' key={product.id}>
                        <div>
                            <img src={product.thumbnail} />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <div className='flex  gap-10 items-center'>
                                <p>{product.price}</p>
                                <button className='bg-red-400 px-3 py-1 text-white' onClick={() => setItemToDelete(product.id)}>remove item</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className={`absolute top-[40%] left-[40%] bg-white border p-10 ${itemToDelete!==-1?"":"hidden"}`}>
                {
                    itemToDelete !== -1 && <div className='flex flex-col items-center gap-2'>
                        <p>do you really want to delete this item???</p>
                        <div className='flex gap-5'>
                            <button onClick={() => onCancelHandler(itemToDelete)} className='border px-4 py-2 bg-red-200 hover:scale-105 rounded-lg'>
                                cancel
                            </button>
                            <button onClick={() => onConfirmHandler(itemToDelete)} className='border px-4 py-2 bg-green-200 hover:scale-105 rounded-lg'>
                                confirm
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
