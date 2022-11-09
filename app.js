const destino = document.getElementById("destino").innerText;
const alto = document.getElementById("alto").innerText;
const largo = document.getElementById("largo").innerText;
const ancho = document.getElementById("ancho").innerText;
const peso = document.getElementById("peso").innerText;


var myHeaders = new Headers();
myHeaders.append("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1MiwiYSI6MywibyI6MTYyOSwiaWF0IjoxNjY4MDI5MTAxLCJleHAiOjE2NjgwNDcxMDF9.BGHuZFb5tV_YjM6sHgockidXsdK1B9DiLQw6RngwrEU");
myHeaders.append("Weship-API-Version", "1.0");

var raw = "{\r\n    \"sender\": {\r\n        \"name\": \"Sender Name\",\r\n        \"email\": \"sender@email.com\",\r\n        \"companyName\": \"Sender Company\",\r\n        \"phone\": \"811111111111\",\r\n        \"country\": \"México\",\r\n        \"country_code\": \"MX\",\r\n        \"province\": \"Puebla\",\r\n        \"province_code\": \"PU\",\r\n        \"city\": \"Puebla\",\r\n        \"address1\": \"Cuauhtémoc 28\",\r\n        \"address2\": \"Agrícola Ignacio Zaragoza\",\r\n        \"optionalInfo\": \"\",\r\n        \"zip\": \"72100\"\r\n    },\r\n    \"recipient\": {\r\n        \"name\": \"Recipient Name\",\r\n        \"email\": \"recipient@email.com\",\r\n        \"companyName\": null,\r\n        \"phone\": \"211111111111\",\r\n        \"country\": \"Mexico\",\r\n        \"country_code\": \"MX\",\r\n        \"province\": \"\",\r\n        \"province_code\": \"\",\r\n        \"city\": \"\",\r\n        \"address1\": \"Valle del Mezquite 1431\",\r\n        \"address2\": \"Palo Blanco\",\r\n        \"optionalInfo\": null,\r\n        \"zip\": \"38400\"\r\n    },\r\n    \"packages\": [\r\n        {\r\n            \"h\": 10,\r\n            \"w\": 10,\r\n            \"hh\": 2,\r\n            \"weight\": 1,\r\n            \"sizeUnit\": \"CM\",\r\n            \"weightUnit\": \"KG\",\r\n            \"declaredValue\": 0\r\n        }\r\n    ],\r\n    \"courier\": [\r\n        \"fedex\",\r\n        \"estafeta\",\r\n        \"99minutos\",\r\n        \"redpack\",\r\n        \"ups\"\r\n   ]\r\n}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.weship.com/orders/quoteOrder", requestOptions)
  .then(response => response.json())
  .then(result => fetchedApi(result))
  .catch(error => console.log('error', error));

function fetchedApi(result) {
  const div = document.querySelector(".result2")
  const { data } = result
  paqueterias = [];
  for (let i = 0; i < data.length; i++) {
    paqueterias.push(data[i]);
  }

  const resultado = paqueterias.map(paqueteria => `<li>${paqueteria.alias} $${paqueteria.amount} ${paqueteria.serviceName}</li>`).join('\n');
  document.querySelector("ul").innerHTML = resultado;
}
