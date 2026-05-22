import AppRouter from './router/AppRouter'

import {
    ToastContainer
} from 'react-toastify'


function App() {

    return (

        <>

            <AppRouter />

            <ToastContainer
                position="top-right"
                autoClose={2500}
            />

        </>
    )
}

export default App