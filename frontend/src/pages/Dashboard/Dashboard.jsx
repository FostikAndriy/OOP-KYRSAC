import { useEffect, useState } from 'react'

import {
    getStatistics
} from '../../api/dashboard_api'

import './Dashboard.scss'


function Dashboard() {

    const [stats, setStats] = useState({
        products_count: 0,
        categories_count: 0,
        orders_count: 0
    })

    const loadStatistics = async () => {

        try {

            const data = await getStatistics()

            setStats(data)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        loadStatistics()

    }, [])

    return (

        <div className="dashboard">

            <h1>Dashboard</h1>

            <div className="stats-grid">

                <div className="stat-card">

                    <h2>Products</h2>

                    <p>
                        {stats.products_count}
                    </p>

                </div>

                <div className="stat-card">

                    <h2>Categories</h2>

                    <p>
                        {stats.categories_count}
                    </p>

                </div>

                <div className="stat-card">

                    <h2>Orders</h2>

                    <p>
                        {stats.orders_count}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Dashboard