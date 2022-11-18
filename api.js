//  setInterval(() => {

//    function getToken() {
//      return 'hello'
//     }
//     export {getToken};


// }, 21600);


// fetch(url, {
//   method: "POST",
//   body:{
//       "email": "ldms99@hotmail.com",
//       "password": "Daniel007"
//   }.then(response => response.json()).then(data => console.log(data))
// })

// document.addEventListener('DOMContentLoaded', () => {
//   var myHeaders = new Headers();
//   myHeaders.append("Weship-API-Version", "1.0");

//   var raw = "{\r\n    \"email\": \"ldms99@hotmail.com\",\r\n    \"password\": \"Daniel007\"\r\n}";

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   fetch("https://api.weship.com/user/login", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result.token))
//     .catch(error => console.log('error', error));
// })
