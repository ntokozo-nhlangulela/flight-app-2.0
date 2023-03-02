import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import '../dist/output.css';
import { flightApiCall$ } from "./api/api";


let listContainer = document.querySelector("#flight-list");

function flightHandler(coordinates: { lat: any; long: any; }) {
    console.log(coordinates);
    marker.setLatLng([coordinates.long, coordinates.lat]);
    //setFlightLocation(coordinates.lat, coordinates.long);
    map1.flyTo([coordinates.long, coordinates.lat], 11);
}
// let flights = [];

// flights = flightApiCall$;
// localStorage.setItem('flightData', JSON.stringify(flights));
// let test = localStorage.getItem('flightData');
// console.log(test);
// console.log('These are the flights:', flights);

const flights = await flightApiCall$();
localStorage.setItem('flightData', JSON.stringify(flights));
console.log(flights);

if (localStorage !== null)
    for (let i = 0; i < 20; i++) {
        let coordinates = {
            lat: 0,
            long: 0,
        };
        console.log('In ho')
        const flightTable = document.createElement("tr");
        const flightTableData = document.createElement("td");
        flightTableData.innerText = flights[i][1];
        const flightTableData2 = document.createElement("td");
        flightTableData2.innerText = flights[i][2];
        const flightTableData3 = document.createElement("td");
        flightTableData3.innerText = flights[i][9];

        flightTable.appendChild(flightTableData);
        flightTable.appendChild(flightTableData2);
        flightTable.appendChild(flightTableData3);
        flightTable.className = "flex-item";

        listContainer?.appendChild(flightTable);
        coordinates.lat = flights[i][5];
        coordinates.long = flights[i][6];
        flightTable.addEventListener("click", () => flightHandler(coordinates));
    }
else {
    console.log('No previous history')
}
// const flights=[];
// flightApiCall$.subscribe((flightResults) => {
//     const flights = flightResults;
//     // localStorage.setItem('flightData', JSON.stringify(flights));
//     // let test = localStorage.getItem('flightData');
//     // console.log(test);
//     localStorage.setItem('Test', 'This is a test.')
//     debugger;
//     (flights);

// });



for (let i = 0; i < 20; i++) {
    let coordinates = {
        lat: 0,
        long: 0,
    };
    const flightTable = document.createElement("tr");
    const flightTableData = document.createElement("td");
    flightTableData.innerText = flights[i][1];
    const flightTableData2 = document.createElement("td");
    flightTableData2.innerText = flights[i][2];
    const flightTableData3 = document.createElement("td");
    flightTableData3.innerText = flights[i][9];

    flightTable.appendChild(flightTableData);
    flightTable.appendChild(flightTableData2);
    flightTable.appendChild(flightTableData3);
    flightTable.className = "flex-item";

    listContainer?.appendChild(flightTable);
    coordinates.lat = flights[i][5];
    coordinates.long = flights[i][6];
    flightTable.addEventListener("click", () => flightHandler(coordinates));
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

