import { create } from "zustand";

//연습용 
export const useStore = create((set) => ({
   examList : [
        {
          id: 1,
          name: "맛집 A",
          img: "🍽️ ",
          category:"식당",
          isFavorite: true,
          visitCount: 5,
          address:"서울시 마포구 땡떙로 143",
          memo: "깔끔해서 좋음",
          distance: 156
        },
        {
          id: 2,
          name: "카페 A",
          img: "☕️ ",
          category:"카페",
          isFavorite: true,
          visitCount: 3,
          address:"서울시 강남구 땡떙로 145",
          memo: "조용해서 독서하기 좋음",
          distance: 10
        },
        {
          id: 3,
          name: "보드게임",
          img: "🎯",
          category:"문화시설",
          isFavorite: true,
          visitCount: 1,
          address:"서울시 광진구 땡떙로 234",
          memo: "시간 보내기 좋음",
          distance: 234
        },
        {
          id: 4,
          name: "맛집 B",
          category: "식당",
          isFavorite: true,
          visitCount: 2,
          memo: "음식이 맛있음",
          distance: 34
        }, {
          id: 5,
          name: "카페 C",
          category: "카페",
          isFavorite: true,
          visitCount: 8,
          memo: "전망이 좋음",
          distance:340
        }
      
      ],
      deleteFavorite:(id)=>set((state)=>({
        examList: state.examList.filter((item)=>item.id !== id)
      }))
}));