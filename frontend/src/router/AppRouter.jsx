import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Products from '../pages/Products/Products'
import Categories from '../pages/Categories/Categories'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import Orders from '../pages/Orders/Orders'

function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Dashboard />}
                    />
                    <Route
                        path="products"
                        element={<Products />}
                    />
                    <Route
                        path="categories"
                        element={<Categories />}
                    />
                    <Route
                        path="orders"
                        element={<Orders />}
                    />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter