import { useEffect, useState } from 'react';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import type {TypedUseSelectorHook} from 'react-redux'

import { addItem } from '../slices/cartSlice';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()



const Home = () => {
    const cartItems = useAppSelector(state => state.cart.cart)
    const dispatch = useAppDispatch();
    interface Product {
        id: number,
        title: string,
        description: string,
        price: number,
        thumbnail: string,
    }
    const pageSize = 5;
    const [products, setProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState<number>(3)
    const [loading, setLoading] = useState<boolean>(false)
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    let totalPage = Math.ceil(products.length / 5);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get('https://dummyjson.com/products')
                setProducts(response.data.products)
                setLoading(false)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.log(err.message)
                }
            }
        }
        fetchData();
    }, [])

    const onPreviousHandler = () => {
        if (currentPage === 1) {
            return;
        }
        setCurrentPage(prev => prev - 1)

    }
    const onNextHandler = () => {
        if (currentPage === totalPage) return;
        setCurrentPage(prev => prev + 1)
    }
    console.log(products)
    const onAddHandler = (product: Product) => {
        dispatch(addItem(product))
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className=''>Products</h2>
            {loading && <h1>loading....</h1>}
            <div className='flex flex-row flex-wrap w-[80%] mx-auto'>
                {
                    products.slice(start, end).map(product => <div className='w-60 h-120 border flex flex-col justify-center items-center m-auto p-2' key={product.id}>
                        <p className=''>{product.title}</p>
                        <img src={product.thumbnail} />
                        <p>{product.description}</p>
                        <div className='flex justify-between gap-4 mt-4 items-center'>
                            <p>{product.price}</p>
                            <button onClick={() => onAddHandler(product)} className='border px-4 py-2 bg-gray-900 text-white'>add to cart</button>
                        </div>
                    </div>)
                }
            </div>
            <div className='flex gap-4 pt-4'>
                <button className='w-30 px-4 py-2 border' onClick={onPreviousHandler}>previous</button>
                {
                    Array.from({ length: totalPage }, (_, index) => <div onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 border ${currentPage == index + 1 ? "bg-green-200" : ""}`}>
                        <p>{index + 1}</p>
                    </div>)
                }
                <button className='w-30 px-4 py-2 border' onClick={onNextHandler}>next</button>
            </div>
            {cartItems.length}
        </div>
    );
}

export default Home;
