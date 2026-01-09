import { useAppSelector } from '../components/Home'
import { useAppDispatch } from '../components/Home'
import { removeItem } from '../slices/cartSlice';

export default function Cart() {
    const cartItems = useAppSelector(state => state.cart.cart)
    const dispatch = useAppDispatch();
    const onRemoverHandler = (id: number) => {
        dispatch(removeItem(id))
    }
    return (
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
                            <button className='bg-red-400 px-3 py-1 text-white' onClick={() => onRemoverHandler(product.id)}>remove item</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}
