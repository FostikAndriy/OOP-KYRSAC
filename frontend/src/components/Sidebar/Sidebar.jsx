import {
    NavLink,
    useNavigate
} from 'react-router-dom'

import './Sidebar.scss'


function Sidebar() {

    const navigate = useNavigate()

    const logout = () => {

        localStorage.removeItem('token')

        navigate('/login')
    }

    return (

        <div className="sidebar">

            <h2>PC Store</h2>

            <nav>

                <NavLink
                    to="/"
                    end
                >
                    Dashboard
                </NavLink>

                <NavLink to="/products">
                    Products
                </NavLink>

                <NavLink to="/categories">
                    Categories
                </NavLink>

                <NavLink to="/orders">
                    Orders
                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </div>
    )
}

export default Sidebar