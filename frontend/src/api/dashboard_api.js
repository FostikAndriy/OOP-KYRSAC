import api from './axios'

export const getStatistics = async () => {

    const response = await api.get(
        '/dashboard/statistics'
    )

    return response.data
}