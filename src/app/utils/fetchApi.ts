import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-key": "ed1270d33emsh2c8085a90fae152p1748b0jsn705958f7ca95",
      "x-rapidapi-host": "bayut.p.rapidapi.com",
    },
  });
  return data;
};
