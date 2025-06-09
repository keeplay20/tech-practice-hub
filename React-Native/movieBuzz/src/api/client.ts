import axios, { AxiosRequestConfig } from "axios";

const client = async (options: AxiosRequestConfig) => {
  try {
    console.log(`[REQ] ${options.method} ${options.url}`);
    const response = await axios.request(options);
    console.log(`[RES]`, response.status);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "[AXIOS ERROR - Response]",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("[AXIOS ERROR - Request]", error.request);
    } else {
      console.error("[AXIOS ERROR - General]", error.message);
    }
    throw error;
  }
};

export default client;
