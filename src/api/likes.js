import { get, post } from "./api.js";

export async function like(albumId) {
  await post("/data/likes", { albumId });
}

export async function getLikesCount(albumId) {
  const count = await get(
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
  );
  return count;
}

export async function getOwnLikes(albumId, userId) {
  const count = await get(
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
  return count;
}
