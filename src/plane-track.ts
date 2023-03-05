import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import '../dist/output.css';
import { flightData } from "./api/api";
import { Flight } from "./interfaces/flights";

let listContainer = document.querySelector("#flight-list");

const loader = document.getElementById("loader");
//const flightTable = document.getElementById("flight-list");
// Show the loader
loader!.style.display = "flex";
//flightTable!.style.display = "none";

let flights: Flight[] = [];

flightData().subscribe((data) => {
    flights = data;
    loader!.style.display = "none";
    renderFlightTable(flights);
});


function renderFlightTable(flights: Flight[]) {
    for (let i = 0; i < flights.length; i++) {
        let coordinates = {
            lat: 0,
            long: 0,
        };
        const flightTable = document.createElement("tr");
        const flightTablerow = document.createElement("td");
        flightTablerow.innerText = flights[i].callsign;
        const countryName = document.createElement("td");
        countryName.innerText = flights[i].origin_country;
        const flightSpeed = document.createElement("td");
        flightSpeed.innerText = flights[i].velocity?.toString();

        flightTable.appendChild(flightTablerow);
        flightTable.appendChild(countryName);
        flightTable.appendChild(flightSpeed);
        flightTable.className = "h-12 hover:bg-primary-500";
        flightTablerow.className = "h-12 px-4";
        countryName.className = "h-12 px-4";
        flightSpeed.className = "h-12 px-4";

        listContainer?.appendChild(flightTable);
        coordinates.lat = flights[i].latitude;
        coordinates.long = flights[i].longitude;
        flightTable.addEventListener("click", () => flightHandler(coordinates));
    }
}

function flightHandler(coordinates: { lat: number; long: number; }) {
    console.log(coordinates);
    marker.setLatLng([coordinates.long, coordinates.lat]);
    //setFlightLocation(coordinates.lat, coordinates.long);
    map1.flyTo([coordinates.long, coordinates.lat], 11);
}

let greenIcon = L.icon({
    iconUrl: "./src/assets/black-plane.png",
    iconSize: [25, 25],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

let map1 = L.map("map").setView([28.0473, 26.2041], 2);
let marker = L.marker([28.0473, 26.2041], { icon: greenIcon }).addTo(map1);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map1);

