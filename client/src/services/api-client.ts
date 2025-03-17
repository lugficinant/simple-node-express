import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "ec8534a169fe4161aa549fcfaa802cad",
  },
});
