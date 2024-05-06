// app.js

const API_URL = 'https://api.spacexdata.com/v3/launches';

async function getLaunches() {
  const response = await fetch(API_URL);
  const data = await response.json();

  displayLaunches(data);
}

function displayLaunches(launches) {
  let html = '';

  launches.forEach(launch => {
    html += `
    
      <div class="col-4 text-center g-5 " data-aos="zoom-in">
      
        <div class="card">
          <img src="${launch.links.mission_patch_small}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${launch.mission_name}</h5>
            <p class="card-text">${launch.launch_year}</p>
            <button type="button" onclick="displayLaunch('${launch.flight_number}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Detalles
            </button>
          </div>
        </div>  
        
      </div>
      
    `;
  });

  document.getElementById('launches').innerHTML = html;
}

async function displayLaunch(flightNumber) {
  const response = await fetch(`${API_URL}/${flightNumber}`);
  const data = await response.json();
  let modalHTML=document.querySelector(".modal-content")
  modalHTML.innerHTML=""
  modalHTML.innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${data.mission_name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/${data.links.youtube_id}" frameborder="0" allowfullscreen></iframe>
          <p>Cohete: ${data.rocket.rocket_name}</p>
          <p>Tipo: ${data.rocket.rocket_type}</p>
          <p>Éxito Misión: ${data.launch_success ? 'Sí' : 'No'}</p>
        </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
    </div>
  `;

  document.getElementById('launchModal').innerHTML = modalHTML;
}

getLaunches();