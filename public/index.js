function getUuid(){
    fetch('http://localhost:3000/api/get-uuid')
    .then( resp => resp.json() )
    .then(({ codigo }) => {
        const respuesta = document.getElementById("result")
        respuesta.innerText = codigo
    })
    .catch(err => { console.log("Error: ", err) })
}