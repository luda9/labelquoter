const destino = document.getElementById("destino");
const alto = document.getElementById("alto");
const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const pesoSelect = document.getElementById("peso");
const form = document.getElementById("form");
const fedex = document.getElementById('fedex');
const fedexBox = document.getElementById("fedexBox");
const mensaje = '</br> </br> <span class="mensaje">Tu códido postal es extendido, los precios que te mostramos abajo son un aproximado, se te dara el precio exacto una vez echo la compra y con tu caja en la mano</span>';

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  let peso = pesoSelect.options[pesoSelect.selectedIndex].value;
  if ( destino.value.length === 5 && alto.value.length, largo.value.length, ancho.value.length >= 1 && alto.value, largo.value, ancho.value > '0' ) {
    fetchApi(destino.value, alto.value, largo.value, ancho.value, peso)
    zip(destino.value)
  }
})

var myHeaders = new Headers();
myHeaders.append("Weship-API-Version", "1.0");
var raw = "{\r\n    \"email\": \"ldms99@hotmail.com\",\r\n    \"password\": \"\"\r\n}";
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

// const tokenApi = await ("https://api.weship.com/user/login", requestOptions)
// .then(response => response.json())
// .then(result => {
//   respuesta = (result.token)});


function fetchingApiToken() {

  let respuesta = '';
  setInterval(async () => {
    const token = await fetch("https://api.weship.com/user/login", requestOptions)

    respuesta = await token.json();
    return respuesta
  }, 30000);
  console.log(respuesta)
  return respuesta
}



console.log(await fetchingApiToken())


function fetchApi(destino, alto, largo, ancho, peso, result) {

  console.log(result.token)

  var myHeaders = new Headers();
  myHeaders.append(token);
  myHeaders.append("Weship-API-Version", "1.0");
  var raw = `{\r\n    \"sender\": {\r\n        \"name\": \"Sender Name\",\r\n        \"email\": \"sender@email.com\",\r\n        \"companyName\": \"Sender Company\",\r\n        \"phone\": \"811111111111\",\r\n        \"country\": \"México\",\r\n        \"country_code\": \"MX\",\r\n        \"province\": \"Jalisco\",\r\n        \"province_code\": \"JA\",\r\n        \"city\": \"Jalisco\",\r\n        \"address1\": \"Mariano Jimenez 182\",\r\n        \"address2\": \"\",\r\n        \"optionalInfo\": \"\",\r\n        \"zip\": \"44360\"\r\n    },\r\n    \"recipient\": {\r\n        \"name\": \"Recipient Name\",\r\n        \"email\": \"recipient@email.com\",\r\n        \"companyName\": null,\r\n        \"phone\": \"211111111111\",\r\n        \"country\": \"Mexico\",\r\n        \"country_code\": \"MX\",\r\n        \"province\": \"\",\r\n        \"province_code\": \"\",\r\n        \"city\": \"\",\r\n        \"address1\": \"\",\r\n        \"address2\": \"\",\r\n        \"optionalInfo\": null,\r\n        \"zip\": \"${destino}\"\r\n    },\r\n    \"packages\": [\r\n        {\r\n            \"h\": ${alto},\r\n            \"w\": ${largo},\r\n            \"hh\": ${ancho},\r\n            \"weight\": ${peso},\r\n            \"sizeUnit\": \"CM\",\r\n            \"weightUnit\": \"KG\",\r\n            \"declaredValue\": 0\r\n        }\r\n    ],\r\n    \"courier\": [\r\n        \"fedex\"\r\n ]\r\n}`;
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
    const { data } = result
    if (peso == 20) {
      const muchoPeso = '<p class="muyPesado">Peso muy elevado, se necesita cotizar la caja fisicamente</p>'
      document.querySelector("ul").innerHTML = muchoPeso;
    } else {
      const primerResultado = data[0];
      const result = [primerResultado];
      const resultado = result.map(result => `<li class="resultItem"><img src="/img/fedex.png" alt="fedexlogo"> <span> $${price(result.amount, peso)} </span> ${result.serviceName}</li>`).join('\n');
      document.querySelector("ul").innerHTML = resultado;
    }
  }
}

function price(amount, weight) {
  let total = parseInt(amount);
  let peso = parseInt(weight);
  if (peso == 5) {
    (total <= 210) ? total = 210 : total += 20 ;
  } else if (peso == 10){
    (total <= 255) ? total = 255 : total += 20 ;
  } else if (peso == 15){
    (total <= 310) ? total = 310 : total += 20 ;
  }
  return(total);
}

function zip(code) {

  fedexBox.classList.remove("hidden");

  const url = `https://sistema.globalpaq.mx/api/v2/public/fedex/cobertura?cp_origen=44360&cp_destino=${code}`
  fetch(url, {
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njc4NTE3OTUsImV4cCI6MTY5OTM4Nzc5NSwiZGF0YSI6eyJpZCI6NzMwMTksIm5hbWUiOiJEYW5pZWwiLCJlbWFpbCI6ImxkbXM5OUBob3RtYWlsLmNvbSIsImV4Y2VkZW50ZSI6MCwic2VndXJvIjowLCJtdWx0aSI6MCwicmVjb2xlY2Npb24iOjB9fQ.0EwaHOF_9KZhv0SXa9HkC96Vgm6Z44N4Nxg0KbLFFJ0',
    }
  })
  .then(response => response.json())
  .then(data => {
    const { data: { message }} = data;
    fedex.innerHTML = message;
    if (fedex.innerText.includes('x')) {
      zonaExtendida()
      fedex.innerHTML = message + mensaje;
    } else {
      zonaExtendida();
      fedex.innerHTML = message;
    }
  })
}

function zonaExtendida() {
  (fedex.innerText.includes('x')) ? fedexBox.classList.add('extendida') : fedexBox.classList.remove('extendida');
  (!fedex.innerText.includes('x')) ? fedexBox.classList.add('normal') : fedexBox.classList.remove('normal');
}



// 21600
