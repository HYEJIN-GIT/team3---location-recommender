import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (place) => {
        const favorites = get().favorites

        const isExisting = favorites.some(
          (fav) => String(fav.id) === String(place.id)
        )

        if (isExisting) {
          return
        }

        const newFavorites = [
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

        set({ favorites: newFavorites })
        console.table(newFavorites)
      },

      removeFavorite: (id) => {
        const newFavorites = get().favorites.filter(
          (fav) => String(fav.id) !== String(id)
        )

        set({ favorites: newFavorites })
        console.table(newFavorites)
      },      

      toggleFavorite: (place) => {
        const placeId = String(place.id)
        const favorites = get().favorites

        const isExisting = favorites.some(
          (fav) => String(fav.id) === placeId
        )

        if (isExisting) {
          get().removeFavorite(placeId)
        } else {
          get().addFavorite(place)
        }
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
)