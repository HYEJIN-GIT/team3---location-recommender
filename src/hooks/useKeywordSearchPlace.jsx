import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchKeywordSearchPlace = ({keyword}) => {
  return api.get(`/search/keyword.json`, {
    params: { query: keyword }
  })
}

export const useKeywordSearchPlaceQuery = ({keyword}) => {
    return useQuery({
        queryKey: ['keyword-search-place', {keyword}],
        queryFn: () => fetchKeywordSearchPlace({keyword}),
        select: result => result.data.documents, 
        suspense: true,
        useErrorBoundary: true,
    })
}