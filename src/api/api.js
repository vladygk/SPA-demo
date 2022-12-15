import { getUserData } from "../utils.js";

const host = "http://localhost:3030";


async function makeRequest(method, url, body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const user = getUserData();
  if(user){
    options.headers["X-Authorization"] = user.accessToken;
  }

  if(body !== undefined){
    options.body = JSON.stringify(body);
  }

  try{
    const response = await fetch(host + url, options);
    
    if(response.status === 204){
        return response;
    }

    const data = await response.json();

    if(response.ok === false){
        throw new Error(data);
    }

    return data;

  }catch(err){
    alert(err.message);
    throw err;
  }

}


export const get = makeRequest.bind(null,"get");
export const post = makeRequest.bind(null,"post");
export const put = makeRequest.bind(null,"put");
export const del = makeRequest.bind(null,"delete");
