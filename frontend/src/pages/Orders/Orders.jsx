import { useEffect, useState } from 'react'
import {
    getOrders,
    updateOrderStatus
} from '../../api/order_api'
import './Orders.scss'

function Orders() {
    const [orders, setOrders] = useState([])
    const [statusFilter, setStatusFilter] =
        useState('all')
    const [statusChanges, setStatusChanges] = useState({})
    const loadOrders = async () => {
        try {
            const data = await getOrders()
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatusChange = (
        orderId,
        status
    ) => {

        setStatusChanges({
            ...statusChanges,
            [orderId]: status
        })
    }

    const saveStatus = async (orderId) => {

        const status =
            statusChanges[orderId]

        if (!status) {
            return
        }

        try {

            await updateOrderStatus(
                orderId,
                status
            )

            toast.success(
                'Status updated'
            )

            loadOrders()

        } catch (error) {

            console.log(error)

            toast.error(
                'Status update failed'
            )
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const filteredOrders = orders.filter(
        order => {

            if (statusFilter === 'all') {
                return true
            }

            return (
                order.status === statusFilter
            )
        }
    )
    return (
        <div className="orders-page">
            <h1>Orders</h1>
            <div className="filters">
                <button
                    className={
                        statusFilter === 'all'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setStatusFilter('all')
                    }
                >
                    All
                </button>
                <button
                    className={
                        statusFilter === 'new'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setStatusFilter('new')
                    }
                >
                    New
                </button>
                <button
                    className={
                        statusFilter === 'processing'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setStatusFilter('processing')
                    }
                >
                    Processing
                </button>
                <button
                    className={
                        statusFilter === 'shipped'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setStatusFilter('shipped')
                    }
                >
                    Shipped
                </button>
                <button
                    className={
                        statusFilter === 'completed'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setStatusFilter('completed')
                    }
                >
                    Completed
                </button>
                <button
                    className={
                        statusFilter === 'cancelled'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setStatusFilter('cancelled')
                    }
                >
                    Cancelled
                </button>
            </div>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td className="order-id">
                                    #{order.id}
                                </td>
                                <td className="user-id">
                                    User #{order.user_id}
                                </td>
                                <td>
                                    <div className="status-wrapper">

                                        <span
                                            className={`status ${order.status}`}
                                        >
                                            {order.status}
                                        </span>

                                        <select
                                            value={
                                                statusChanges[order.id]
                                                || order.status
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="new">
                                                New
                                            </option>

                                            <option value="processing">
                                                Processing
                                            </option>

                                            <option value="shipped">
                                                Shipped
                                            </option>

                                            <option value="completed">
                                                Completed
                                            </option>

                                            <option value="cancelled">
                                                Cancelled
                                            </option>

                                        </select>

                                        <button
                                            className="save-btn"
                                            onClick={() =>
                                                saveStatus(order.id)
                                            }
                                        >
                                            Save
                                        </button>

                                    </div>
                                </td>
                                <td className="price">
                                    {order.total_price} ₴
                                </td>
                                <td>
                                    <div className="items-list">
                                        {
                                            order.items.map(
                                                item => (
                                                    <div
                                                        className="item"
                                                        key={
                                                            item.product_id
                                                        }
                                                    >
                                                        <span className="item-name">
                                                            {
                                                                item.product_name
                                                            }
                                                        </span>
                                                        <span className="item-qty">
                                                            x{item.quantity}
                                                        </span>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Orders