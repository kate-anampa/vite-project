import axios from 'axios' ;
import './style.css'


listenerLoad();


//CARGAR LA DATA AL INICIAR LA PAG.

function listenerLoad (){
  document.addEventListener('DOMContentLoaded',readUsers);
}

//lEER / OBTENER LA DATA (JSON)
async function readUsers(){
  const data = await fetch('http://localhost:3000/users');
  const json = await data.json();
  const tbody = document.querySelector('#table-users tbody')

 json.forEach((element,index) => {
  
  const fila = document.createElement('tr');

  const celdaNro = document.createElement ('th');
  celdaNro.textContent = index;
  fila.appendChild(celdaNro);

  const celdaNombre = document.createElement ('td');
  celdaNombre.textContent = element.nombre;
  fila.appendChild(celdaNombre);

  const celdaApellido = document.createElement ('td');
  celdaApellido.textContent = element.apellido;
  fila.appendChild(celdaApellido);


  const celdaPais = document.createElement ('td');
  celdaPais.textContent = element.pais;
  fila.appendChild(celdaPais);

  const celdaId = document.createElement ('td');
  celdaId.textContent = element.id;
  fila.appendChild(celdaId);

  const celdaBtn = document.createElement('td');
  const btnEliminar =document.createElement('button');
  btnEliminar.textContent="Eliminar"
  btnEliminar.id = `delete-${element.id}`;
  btnEliminar.addEventListener('click',() => deleteUser(element.id));
  celdaBtn.appendChild(btnEliminar);
  fila.appendChild(celdaBtn);


//Agregar al tbody

tbody.appendChild(fila)

 });
}
async function addUser(object){
  const data = await axios.post('http://localhost:3000/users',object);
}

async function deleteUser(idUser){

  const data = await axios.delete(`http://localhost:3000/users/${idUser}`);
  location.reload();
}
document.getElementById('form-users').addEventListener('submit', function(event){ 
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const pais = document.getElementById('pais').value;


const user = {
  nombre : nombre,
  apellido: apellido,
  pais: pais
}

addUser(user)

location.reload();

})