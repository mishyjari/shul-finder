const resultsInfo = document.getElementById('results-info');
const searchForm = document.getElementById('search-box');
const movementFilter = document.getElementById('filters');
const resultsList = document.getElementById('search-results-list');
const buttonContainer = document.getElementById('load-more');


// Listen for change on the movements filter dropdown, run search
movementFilter.addEventListener('change', e => {
    runSearch(searchForm.value)
});

// Listen for change on the search box, run search
searchForm.addEventListener("input", e => {
    const search = e.target.value
    runSearch(search)
});

// Prevent page refresh on form submit
document.getElementById('search-form')
    .addEventListener('submit', e => e.preventDefault());

// On page load, find all movement names listed in the database and populate the filters dropdown with that info
// This would be best moved to static data in production which updates only occasionally
document.addEventListener('DOMContentLoaded', () => {
    resultsInfo.innerHTML = `
        <h5>Enable location services or use the search bar to find shuls anywhere in the US (RoWr coming soon!)</h5>
    `
    searchForm.value = '';
    fetch('/synagogues?limit=all')
        .then( res => res.json() )
        .then( ({synagogues}) => {

            // Fetch movement names from db and populate array
            let movements = [];
            synagogues.forEach(entry => {
                // Confirm uniqeness and push to array
                if ( !movements.includes(entry.movement) ){
                    movements.push(entry.movement);
                }
            });
            
            // Loop over movement names and create a checkbox for each
            movements.forEach(type => {
                const option = document.createElement('div');
                option.innerHTML = `
                    <input type='checkbox' value='${type}' name = '${type}'/>
                    <label for='${type}'>${type}</label>
                    <br />
                `;
                movementFilter.appendChild(option)
            })
        });

    // Try using browser geoloaction to determine user's current location
    navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
        const { latitude, longitude } = coords;
        geocode({ latitude, longitude })
    })
});

// Search function. Accepts a string as a search term and check the filters element for its value.
const runSearch = (search, persist=false, skip=0, limit=10) => {
    let filters = [];
    Array.from(movementFilter.children).forEach(option => {
        if ( option.firstElementChild.checked ) {
            filters.push(option.firstElementChild.name)
        }
    });
    filters = filters.join(',');
    console.log(filters)

    // Create query string
    let query = search ? `synagogues?search=${search}` : `synagogues?`; 
    
    if ( filters && filters !== 'all' ) {
        query += search ? `&filters=${filters}` : `filters=${filters}`;
    }
    
    if ( !filters && !search ) {
        query += `skip=${ parseInt(skip) }&limit=${ parseInt(limit) }`
    }
    else {
        query += `&skip=${ parseInt(skip) }&limit=${ parseInt(limit) }`
    }


    // Use the URL class to create a properly formatted query
    const url = new URL(`${this.location.origin}/${query}`)
    console.log(url)


    try {
        fetch(url.pathname + url.search)
        .then( res => res.json() )
        .then( ({synagogues,count}) => {

            if (!persist) {
                // Get results list DOM element and reset
                resultsList.innerText = '';
            };
            buttonContainer.innerText = '';

            
            // Print number of results found
            if ( synagogues.length === 0 ) {
                return resultsInfo.innerHTML = `<h5>No results found in ${search}.</h5>`
            } else {
                resultsInfo.innerHTML = search.length > 0 ? 
                    `<h5>${count} results in ${search}.</h5>` :
                    `<h5>Showing ${count} results</h5>`
            };

            // Create a bootstrap card element for each result and append
            synagogues.forEach(synagogueData => {
                const synagogueCard = document.createElement('div');
                synagogueCard.setAttribute('class', 'card')
                synagogueCard.innerHTML = `
                    <div class='card-body'>
                        <h5 class='card-title'>${synagogueData.name}</h5>
                        <h6 class='card-title'>${synagogueData.movement}</h5>
                        <p class='card=text'>
                            ${synagogueData.address}, <br />
                            ${synagogueData.city}, ${synagogueData.state}
                        </p>
                        <a href=${synagogueData.url} class='btn btn-outline-primary'>Website</a>
                        <a href='/synagogues/${synagogueData._id}' class='btn btn-outline-info'>Details</a>
                    </div>
                `;
                resultsList.appendChild(synagogueCard)
            });

            // If results overflow limit, append 'show more' button
            if ( count > limit && skip+limit < count ) {
                const moreButton = document.createElement('button');
                moreButton.setAttribute('class', 'btn btn-outline-secondary');
                moreButton.innerHTML = 'Load more results';
                buttonContainer.appendChild(moreButton)
                moreButton.addEventListener('click', () => {
                    buttonContainer.removeChild(moreButton)
                    runSearch(search, true, skip+limit, limit)
                })
            } else (
                buttonContainer.innerHTML = `<h6>End of results</h6>`
            )
        })
        .catch( console.log )
    }
    catch (err) {
        resultsInfo.innerHTML = `
        <h5>Error fetching data</h5>
        <p>${err}</p>
        `
    }
};

// Use the browser geocode api to send user's coords to local server
const geocode = ( coords, callback ) => {
    fetch(`http://localhost:3000/location?lat=${coords.latitude}&lon=${coords.longitude}`)
        .then( res => res.json() )
        .then( ({city, state}) => {
            runSearch(city);
        })
};