import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
import type { TypedUseSelectorHook } from "react-redux"
import { pageSize } from '../constants'
import {
    fetchProducts,
    searchProducts,
    filterByCategory,
    clearFilter,
    clearSearchResults
} from "../slices/productSlice"
import { addItem } from "../slices/cartSlice"
import type { Product } from "../slices/productSlice"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

const Home = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.cart)
    const { products, loading, searchResults, filter } =
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
        if (!search.trim()) {
            dispatch(clearSearchResults())
            return
        }

        const timeoutId = setTimeout(() => {
            dispatch(searchProducts(search))
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [search,])


    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

    useEffect(() => {
        setCurrentPage(1)
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
    const getCartQuantity = (id: number) => {
        const item = cartItems.find(item => item.id === id)
        return item ? (item.quantity || 1) : 0
    }

    // console.log(searchResults.length)
    const onchangeHandler = (value: string) => {
        const value2 = value.replace(/[^a-zA-Z0-9 ]/g, "")
        setSearch(value2)
    }
    return (
        <div className='flex flex-col justify-center items-center mb-5'>
            <div>
                <h2 className=''>Products</h2>
                <div className='flex gap-3 mb-4'>
                    <button
                        className={`border px-4 py-2 ${filter === "beauty" ? "bg-gray-300" : ""}`}
                        onClick={() => {
                            setSearch("")
                            dispatch(filterByCategory("beauty"))
                        }}
                    >
                        beauty
                    </button>
                    <button
                        className={`border px-4 py-2 ${filter === "fragrances" ? "bg-gray-300" : ""}`}
                        onClick={() => {
                            setSearch("")
                            dispatch(filterByCategory("fragrances"))
                        }}
                    > fragrances
                    </button>
                    <button
                        className={`border px-4 py-2 ${filter === "furniture" ? "bg-gray-300" : ""}`}
                        onClick={() => {
                            setSearch("")
                            dispatch(filterByCategory("furniture"))
                        }}
                    >
                        furniture
                    </button>
                    <button
                        className='border px-4 py-2 hover:scale-95 active:bg-green-300'
                        onClick={() => {
                            setSearch("")
                            dispatch(clearFilter())
                        }}

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
                    onChange={(e) => onchangeHandler(e.target.value)}
                    value={search}
                />
                <div className={`absolute bg-white max-h-110 overflow-x-hidden overflow-scroll ${searchResults.length === 0 ? "hidden" : ""}`}>
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
                            <div className='flex items-center gap-2'>
                                {getCartQuantity(product.id) > 0 && <span className='text-sm'>Qty: {getCartQuantity(product.id)}</span>}
                                <button
                                    onClick={() => onAddHandler(product)}
                                    className='border px-4 py-2 text-white bg-gray-900'>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex gap-4 pt-4'>
                <button
                    disabled={currentPage === 1}
                    className={`w-30 px-4 py-2 border hover:scale-95 active:bg-green-300 ${currentPage === 1 ? "text-gray-300 hidden" : ""}`}
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
                    disabled={currentPage === totalPage}
                    className={`w-30 px-4 py-2 border hover:scale-95 active:bg-green-300 ${currentPage === totalPage ? "text-gray-300 hidden" : ""}`}
                    onClick={onNextHandler}
                >
                    next
                </button>
            </div>
        </div>
    )
}

export default Home
