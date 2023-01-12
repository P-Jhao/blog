import request from "./request";

export default async function getBanner() {
  return await request.get("/api/banner");
}
