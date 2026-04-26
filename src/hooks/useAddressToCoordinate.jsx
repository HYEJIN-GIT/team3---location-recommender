import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchAddressToCoordinate = ({address}) => {
  return api.get(`/search/address.json`, { params: {query : address}}) 
}

export const useAddressToCoordinateQuery = ({address}) => {
    return useQuery({
        queryKey: ['address-to-coordinate', {address}],
        queryFn: () => fetchAddressToCoordinate({address}),
        select: result => result.data.documents, 
        suspense: true,
        useErrorBoundary: true,
    })
}