import { del, get, post, put } from "./api.js";

export async function getAllData() {
  const data = await get("/data/albums?sortBy=_createdOn%20desc");

  return data;
}

export async function createEntry(
  singer,
  album,
  imageUrl,
  release,
  label,
  sales
) {
  await post("/data/albums", {
    singer,
    album,
    imageUrl,
    release,
    label,
    sales,
  });
}


export async function getDataById(id){
  const data = await get(`/data/albums/${id}`);
  return data;
} 

export async function deleteById(id){
    await del(`/data/albums/${id}`);
}


export async function editById(id,singer,
    album, 
    imageUrl, 
    release, 
    label, 
    sales){

    await put(`/data/albums/${id}`,{singer,
        album, 
        imageUrl, 
        release, 
        label, 
        sales});
}