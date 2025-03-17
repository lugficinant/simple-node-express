import axios from "axios";
//
interface LoginResponse {
  success: boolean;
  message: string | null;
}

//to backend
const backendClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 6000,
  headers: { "Content-Type": "application/json" },
});

export const toServer = {
  testPost: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await backendClient.post("/test", { email, password });
      console.log("Server Response:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error:", err);
      throw new Error("Failed to fetch response");
    }
  },
};

//to API
