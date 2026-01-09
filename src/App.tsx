import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import { useAppSelector } from './components/Home'
import Cart from './components/Cart'
// import { useAppDispatch } from './components/Home'

function App() {
  const items = useAppSelector(state => state.cart.cart)
  console.log(items)
  return (
    <div className=''>
      <BrowserRouter>
        <nav className='border py-4 flex gap-10 justify-between px-20'>
          <Link to={"/"}>Home</Link>
          <Link to={"/cart"}><div className='flex gap-3 items-center'>Cart <p className='border w-6 p-1 text-sm rounded-full'>{items.length}</p></div></Link>
          {/* <Link to={"/"}>Home</Link> */}
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
