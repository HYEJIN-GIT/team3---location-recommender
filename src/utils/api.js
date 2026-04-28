const API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const BASE_URL = "https://dapi.kakao.com/v2/local";

const createQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

const api = {
  async get(path, { params } = {}) {
    const response = await fetch(`${BASE_URL}${path}${createQueryString(params)}`, {
      headers: {
        Accept: "application/json",
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "카카오 API 요청에 실패했습니다.");
    }

    return { data };
  },
};

export default api;
