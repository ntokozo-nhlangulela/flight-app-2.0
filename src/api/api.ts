import { from, Observable } from 'rxjs';
import { Flight } from '../interfaces/flights';
import { backup } from "./dummydata";


export function flightData(): Observable<Flight[]> {
    const flightApi = 'https://opensky-network.org/api/states/all';

    return from(
        fetch(flightApi)
            .then((response) => response.json())
            .then((data) => {
                const flights: Flight[] = data.states.map((state: any) => {
                    return {
                        icao24: state[0],
                        callsign: state[1],
                        origin_country: state[2],
                        time_position: state[3],
                        last_contact: state[4],
                        longitude: state[6],
                        latitude: state[5],
                        baro_altitude: state[7],
                        on_ground: state[8],
                        velocity: state[9],
                        true_track: state[10],
                        vertical_rate: state[11],
                        sensors: state[12],
                        geo_altitude: state[13],
                        squawk: state[14],
                        spi: state[15],
                        position_source: state[16]
                    };
                }).slice(0, 20);
                localStorage.setItem('flights', JSON.stringify(flights)); // add to local storage
                return flights;
            })
            .catch(() => {

                const flightsbackup: Flight[] = backup.states.map((state: any) => {
                    return {
                        icao24: state[0],
                        callsign: state[1],
                        origin_country: state[2],
                        time_position: state[3],
                        last_contact: state[4],
                        longitude: state[6],
                        latitude: state[5],
                        baro_altitude: state[7],
                        on_ground: state[8],
                        velocity: state[9],
                        true_track: state[10],
                        vertical_rate: state[11],
                        sensors: state[12],
                        geo_altitude: state[13],
                        squawk: state[14],
                        spi: state[15],
                        position_source: state[16]
                    };
                }).slice(0, 20);

                const flights = JSON.parse(localStorage.getItem('flights') || JSON.stringify(flightsbackup));
                alert("Hi your current request did not go through we are using your last updated flight information ")
                return flights;
            })
    );
}


