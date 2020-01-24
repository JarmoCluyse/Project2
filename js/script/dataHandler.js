const handleData = function (url, callback, method = 'GET', body = null) {
  fetch(url, {
    method: method,
    body: body,
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
      } else {
        console.info('Er is een response teruggekomen van de server');
        return response.json();
      }
    })
    .then(function (jsonObject) {
      console.info('json object is aangemaakt');
      console.info('verwerken data');
      callback(jsonObject);
    })
    .catch(function (error) {
      console.error(`fout bij verwerken json ${error}`);
    });
};

const sendData = function (url, callback, method, body) {
  fetch(url, {
    method: method,
    body: JSON.stringify(body),
  })
  .then(function (jsonObject) {
    console.log(jsonObject);
    console.info('Response received');
    callback(jsonObject);
  })
  .catch(function (error) {
    console.error(`Error sending data: ${error}`);
  });
};

const idGenerator = function (type = "S") {
    let id = "";
    // if (type == "S"){
    //   id += "S";
    // }
    // else{
    //   id += "G";
    // }
    id += Math.random().toString(36).substr(2, 6);
    console.log(id);
    return id;

}

const logIn = function (email, password, callback) {
  let jsontext = `{
    "emailaddress": "${email}",
    "password": "${password}"
  }`
  let json = JSON.parse(jsontext);
  fetch(`${BASEURI}login?code=${key}`, {
    method: "POST",
    body: JSON.stringify(json),
  })
  .then(function (response) {
    if (!response.ok) {
      return JSON.parse(`{"userEmail": "undefined"}`);
    } else {
      console.info('Er is een response teruggekomen van de server');
      return response.json();
    }
  })
  .then(function (jsonObject) {
    console.info('json object is aangemaakt');
    console.info('verwerken data');
    callback(jsonObject);
  })
  // .catch(function (error) {
  //   console.error(`Error sending data: ${error}`);
  // });
};

const logOut = function(token, callback) {
  const proceed = function(data){
    console.log(data);
    if (data.ok){
      localStorage.removeItem('LoginToken');
      callback(data);
    }
  };
  sendData(`${BASEURI}logout?code=${key}`, proceed, "POST", token);
};