export async function flightApiCall() {
    const flightApi = "https://opensky-network.org/api/states/all";
    const flights = await fetch(flightApi)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data.states.slice(0, 20);
            //console.log(apiResult);
        });

    return flights;
}



//import { fromFetch } from "rxjs/fetch"

// export const fetchFlights$ = fromFetch('https://opensky-network.org/api/states/all', {
//     selector: (response) => response.json()
// })