import * as L from "leaflet";
import '../dist/output.css';

let map1 = L.map("map").setView([28.0473, 26.2041], 2);


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map1);