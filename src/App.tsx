import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import { useAppSelector } from './components/Home'
import NotFound from './components/NotFound'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Cart from './components/Cart'

// const LazyCart = lazy(() => import('./components/Cart'))

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-4 text-red-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="border px-4 py-2 rounded bg-black text-white"
      >
        Try again
      </button>
    </div>
  )
}

function App() {
  const items = useAppSelector(state => state.cart.cart)

  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  )

  return (
    <BrowserRouter>
      <nav className="border py-4 flex gap-10 justify-between px-20">
        <Link to="/">Home</Link>

        <Link to="/cart">
          <div className="flex gap-3 items-center">
            Cart
            <p className="border w-6 p-1 text-sm rounded-full">
              {totalQuantity}
            </p>
          </div>
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Home />
            </ErrorBoundary>
          }
        />
        <Route
          path="/cart"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {/* <Suspense fallback={<div>Loading cart...</div>}> */}
                {/* <LazyCart /> */}
                <Cart/>
              {/* </Suspense> */}
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
