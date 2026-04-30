export const codeName = (name) => {
    if (!name) return null;
    if (name.includes("카페")) return "CE7";
    if (name.includes("음식점")) return "FD6";
    if (name.includes("관광,명소")) return "AT4";
    if (name.includes("문화")) return "CT1";
  };