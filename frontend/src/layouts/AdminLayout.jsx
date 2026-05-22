import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar/Sidebar'

import './AdminLayout.scss'


function AdminLayout() {

    return (

        <div className="admin-layout">

            <Sidebar />

            <div className="content">
                <Outlet />
            </div>

        </div>
    )
}

export default AdminLayout