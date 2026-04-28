import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchCategorySearchPlace = ({category}) => {
  return api.get(`/search/category.json`, {
    params: { category_group_code: category },
  })
}

export const useCategorySearchPlaceQuery = ({category}) => {
    return useQuery({
        queryKey: ['address-to-coordinate', {category}],
        queryFn: () => fetchCategorySearchPlace({category}),
        select: result => result.data.documents, 
        suspense: true,
        useErrorBoundary: true,
    })
}