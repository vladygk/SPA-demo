export function getUserData() {
  const data = JSON.parse(sessionStorage.getItem("userData"));
  return data;
}

export function setUserData(data) {
  sessionStorage.setItem(
    "userData",
    JSON.stringify({ _id: data._id, accessToken: data.accessToken })
  );
}

export function removeUserData(data){
    sessionStorage.removeItem("userData");
}


export function createSubmitHandler(callback){
    return function(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data);
    }
}