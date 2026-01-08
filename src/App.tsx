import { BrowserRouter, Routes,Link, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
function App() {
  return (
   <div className=''>
    <BrowserRouter>
    <nav className='border py-4 flex gap-10 justify-between px-20'>
      <Link to={"/"}>Home</Link>
      <Link to={"/cart"}>Cart</Link>
      {/* <Link to={"/"}>Home</Link> */}
    </nav>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </BrowserRouter>
   </div>
  )
}
export default App
