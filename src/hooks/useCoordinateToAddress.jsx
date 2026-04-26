import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchCoordinateToAddress = ({coordinate}) => {
  return api.get(`/geo/coord2address.json`, {
    params: {
      x: coordinate.lng,
      y: coordinate.lat,
    }})
}

export const useCoordinateToAddressQuery = ({coordinate}) => {
    return useQuery({
        queryKey: ['coordinate-to-address', {coordinate}],
        queryFn: () => fetchCoordinateToAddress({coordinate}),
        select: result => result.data.documents, 
        suspense: true,
        useErrorBoundary: true,
    })
}