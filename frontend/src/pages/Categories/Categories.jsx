import { useEffect, useState } from 'react'

import {
    getCategories,
    createCategory,
    deleteCategory
} from '../../api/category_api'

import { toast } from 'react-toastify'

import './Categories.scss'


function Categories() {

    const [categories, setCategories] =
        useState([])

    const [search, setSearch] =
        useState('')

    const [name, setName] =
        useState('')

    const loadCategories = async () => {

        try {

            const data =
                await getCategories()

            setCategories(data)

        } catch (error) {

            console.log(error)

            toast.error(
                'Failed to load categories'
            )
        }
    }

    useEffect(() => {

        loadCategories()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await createCategory({
                name
            })

            toast.success(
                'Category created'
            )

            setName('')

            loadCategories()

        } catch (error) {

            console.log(error)

            toast.error(
                'Create failed'
            )
        }
    }

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            'Delete category?'
        )

        if (!confirmed) {
            return
        }

        try {

            await deleteCategory(id)

            toast.success(
                'Category deleted'
            )

            loadCategories()

        } catch (error) {

            console.log(error)

            toast.error(
                'Delete failed'
            )
        }
    }

    const filteredCategories =
        categories.filter(category =>

            category.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        )

    return (
        <div className="categories-page">
            <h1>Categories</h1>
            <div className="top-bar">
                <input
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                    <button type="submit">
                        Add Category
                    </button>
                </form>
            </div>
            <table className="categories-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredCategories.map(
                            category => (

                                <tr
                                    key={category.id}
                                >
                                    <td>
                                        {category.id}
                                    </td>
                                    <td>
                                        {category.name}
                                    </td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    category.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Categories