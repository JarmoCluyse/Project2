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

const idGenerator = function (type) {
    let id = "";
    if (type == "S"){
      id += "S";
    }
    else{
      id += "G";
    }
    id += Math.random().toString(36).substr(2, 6);
    console.log(id);
    return id;

}