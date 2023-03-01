import { fromFetch } from "rxjs/fetch"

export const fetchFlights$ = fromFetch('https://opensky-network.org/api/states/all', {
    selector: (response) => response.json()
})


