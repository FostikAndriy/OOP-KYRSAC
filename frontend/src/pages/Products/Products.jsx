import { useEffect, useState } from 'react'
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from '../../api/product_api'
import {
    getCategories
} from '../../api/category_api'
import { toast } from 'react-toastify'
import './Products.scss'

function Products() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [brandFilter, setBrandFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [sortBy, setSortBy] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        category_id: '',
        name: '',
        brand: '',
        price: '',
        stock: '',
        description: '',
        image: null
    })
    const loadProducts = async () => {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            console.log(error)
            toast.error('Failed to load products')
        }
    }
    const loadCategories = async () => {
        try {
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            console.log(error)
            toast.error('Failed to load categories')
        }
    }
    useEffect(() => {
        loadProducts()
        loadCategories()
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingId) {
                await updateProduct(
                    editingId,
                    {
                        name: formData.name,
                        brand: formData.brand,
                        price: formData.price,
                        stock: formData.stock,
                        description: formData.description,
                        image_url: ''
                    }
                )
                toast.success('Product updated')
                setEditingId(null)
            } else {
                const sendData = new FormData()
                sendData.append(
                    'category_id',
                    formData.category_id
                )
                sendData.append(
                    'name',
                    formData.name
                )
                sendData.append(
                    'brand',
                    formData.brand
                )
                sendData.append(
                    'price',
                    formData.price
                )
                sendData.append(
                    'stock',
                    formData.stock
                )
                sendData.append(
                    'description',
                    formData.description
                )
                sendData.append(
                    'image',
                    formData.image
                )
                await createProduct(sendData)
                toast.success('Product created')
            }
            loadProducts()
            setFormData({
                category_id: '',
                name: '',
                brand: '',
                price: '',
                stock: '',
                description: '',
                image: null
            })
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Delete this product?'
        )
        if (!confirmed) {
            return
        }
        try {
            await deleteProduct(id)
            toast.success('Product deleted')
            loadProducts()
        } catch (error) {
            console.log(error)
            toast.error('Delete failed')
        }
    }
    const handleEdit = (product) => {
        setEditingId(product.id)
        setFormData({
            category_id: '',
            name: product.name,
            brand: product.brand,
            price: product.price,
            stock: product.stock,
            description: '',
            image: null
        })
        toast.info('Editing mode enabled')
    }
    const brands = [
        ...new Set(
            products.map(
                product => product.brand
            )
        )
    ]
    const filteredProducts = products

        .filter(product =>

            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        )

        .filter(product => {

            if (brandFilter === 'all') {
                return true
            }

            return (
                product.brand === brandFilter
            )
        })

        .filter(product => {

            if (categoryFilter === 'all') {
                return true
            }

            return (
                product.category_id ==
                categoryFilter
            )
        })

        .sort((a, b) => {

            switch (sortBy) {

                case 'price_asc':
                    return a.price - b.price

                case 'price_desc':
                    return b.price - a.price

                case 'stock_asc':
                    return a.stock - b.stock

                case 'stock_desc':
                    return b.stock - a.stock

                default:
                    return 0
            }
        })
    return (
        <div className="products-page">
            <h1>Products</h1>
            <input
                className="search-input"
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div className="product-filters">

                <div className="filter-group">

                   
                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="all">
                            Всі категорії
                        </option>

                        {
                            categories.map(category => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }

                    </select>

                </div>

                <select
                    value={brandFilter}
                    onChange={(e) =>
                        setBrandFilter(e.target.value)
                    }
                >
                    <option value="all">
                        All brands
                    </option>
                    {
                        brands.map(brand => (
                            <option
                                key={brand}
                                value={brand}
                            >
                                {brand}
                            </option>
                        ))
                    }
                </select>
                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                >
                    <option value="">
                        Default sorting
                    </option>
                    <option value="price_asc">
                        Price ↑
                    </option>
                    <option value="price_desc">
                        Price ↓
                    </option>
                    <option value="stock_asc">
                        Stock ↑
                    </option>
                    <option value="stock_desc">
                        Stock ↓
                    </option>
                </select>
            </div>
            <form
                className="product-form"
                onSubmit={handleSubmit}
            >
                <div className="form-grid">
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select category
                        </option>
                        {
                            categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                    <textarea
                        className="full-width"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="submit-btn"
                    type="submit"
                >
                    {
                        editingId
                            ? 'Update Product'
                            : 'Create Product'
                    }
                </button>
            </form>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img
                                        src={
                                            `http://127.0.0.1:5000${product.image_url}`
                                        }
                                        width="80"
                                    />

                                </td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td className="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(product.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Products