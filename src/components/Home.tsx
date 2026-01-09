import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import type { TypedUseSelectorHook } from "react-redux"
import { pageSize } from '../constants'
import {
    fetchProducts,
    searchProducts,
    filterByCategory,
    clearFilter
} from "../slices/productSlice"
import { addItem } from "../slices/cartSlice"
import type { Product } from "../slices/productSlice"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

const Home = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.cart)
    const { products, loading, searchResults,filter} =
        useAppSelector(state => state.products)


    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const totalPage = Math.ceil(products.length / pageSize)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    useEffect(() => {
        if (!search.trim()) return
        dispatch(searchProducts(search))
    }, [search])

    const onPreviousHandler = () => {
        if (currentPage === 1) return
        setCurrentPage(prev => prev - 1)
    }

    const onNextHandler = () => {
        if (currentPage === totalPage) return
        setCurrentPage(prev => prev + 1)
    }

    const onAddHandler = (product: Product) => {
        dispatch(addItem(product))
    }
    const isInCart = (id: number) => {
        return cartItems.some(item => item.id === id)
    }

    // console.log(searchResults.length)
    return (
        <div className='flex flex-col justify-center items-center mb-5'>
            <div>
                <h2 className=''>Products</h2>
                <div className='flex gap-3 mb-4'>
                    <button
                        className={`border px-4 py-2 ${filter==="beauty"?"bg-gray-300":""}`}
                        onClick={() => dispatch(filterByCategory("beauty"))}

                    >
                        beauty
                    </button>
                    <button
                        className={`border px-4 py-2 ${filter==="fragrances"?"bg-gray-300":""}`}
                        onClick={() => dispatch(filterByCategory("fragrances"))}
                    >
                        fragrances
                    </button>
                    <button
                        className={`border px-4 py-2 ${filter==="furniture"?"bg-gray-300":""}`}
                        onClick={() => dispatch(filterByCategory("furniture"))}
                    >
                        furniture
                    </button>
                    <button
                        className='border px-4 py-2'
                        onClick={() => dispatch(clearFilter())}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className='relative mb-3'>
                <input
                    className='w-100 px-2 py-2 border rounded-lg'
                    placeholder='search....'
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <div className={`absolute bg-white max-h-110 overflow-x-hidden overflow-scroll ${searchResults.length===0 ? "hidden" : ""}`}>
                    {search &&
                        searchResults.map(item => (
                            <div
                                key={item.id}
                                className='w-100 px-2 py-2 border mb-1'
                            >
                                {item.title}
                            </div>
                        ))}
                </div>
            </div>

            {loading && <h1>loading....</h1>}

            <div className='flex flex-row flex-wrap w-[80%] mx-auto'>
                {products.slice(start, end).map(product => (
                    <div
                        className='w-60 h-120 border flex flex-col justify-center items-center m-auto p-2'
                        key={product.id}
                    >
                        <p className=''>{product.title}</p>
                        <img src={product.thumbnail} />
                        <p>{product.description}</p>
                        <div className='flex justify-between gap-4 mt-4 items-center'>
                            <p>{product.price}</p>
                            <button
                                onClick={() => onAddHandler(product)}
                                disabled={isInCart(product.id)}
                                className={`border px-4 py-2 text-white 
                                    ${isInCart(product.id) ? "bg-green-600 cursor-not-allowed" : "bg-gray-900"}`} >
                                {isInCart(product.id) ? "Added" : "Add"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex gap-4 pt-4'>
                <button
                    className='w-30 px-4 py-2 border'
                    onClick={onPreviousHandler}
                >
                    previous
                </button>

                {Array.from({ length: totalPage }, (_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 border ${currentPage === index + 1 ? "bg-green-200" : ""}`}
                    >
                        <p>{index + 1}</p>
                    </div>
                ))}

                <button
                    className='w-30 px-4 py-2 border'
                    onClick={onNextHandler}
                >
                    next
                </button>
            </div>
        </div>
    )
}

export default Home
