import { headers } from "next/headers";

const fetchData = async (
  path: string,
  method: string,
  body?: BodyInit,
  cache?: RequestCache
) => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  try {
    if (method === "GET") {
      const res = await fetch(`${protocol}://${host}/api${path}`, {
        cache: cache ? cache : "default",
      });
      const data = await res.json();
      return data;
    } else {
      const res = await fetch(`${protocol}://${host}/api${path}`, {
        method: method,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    }
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

export default fetchData;
