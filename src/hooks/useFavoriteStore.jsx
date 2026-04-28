import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (place) => {
        const placeId = String(place.id)
        const favorites = get().favorites

        const isExisting = favorites.some(
          (fav) => String(fav.id) === placeId
        )

        let newFavorites

        if (isExisting) {
          newFavorites = favorites.filter(
            (fav) => String(fav.id) !== placeId
          )
          console.log("즐겨찾기 삭제")
        } else {
          newFavorites = [
            ...favorites,
            {
                id: place.id,
                place_name: place.place_name,
                address_name: place.address_name,
                road_address_name: place.road_address_name,
                phone: place.phone,
                category_name: place.category_name,
                x: place.x,
                y: place.y,
                place_url: place.place_url
            }
          ]
          console.log("즐겨찾기 추가")
        }

        set({ favorites: newFavorites })

        console.table(newFavorites)
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
)