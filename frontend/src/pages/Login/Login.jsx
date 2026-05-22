import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { login } from '../../api/auth_api'

import './Login.scss'


function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const [password, setPassword] =
        useState('')

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const data = await login({
                email,
                password
            })

            localStorage.setItem(
                'token',
                data.token
            )

            toast.success(
                'Login successful'
            )

            navigate('/')

        } catch (error) {

            toast.error(
                'Invalid credentials'
            )
        }
    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>
                    PC Store Admin
                </h1>

                <p>
                    Sign in to continue
                </p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Login