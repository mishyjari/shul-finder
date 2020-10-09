const resultsInfo = document.getElementById('results-info');
const searchForm = document.getElementById('search-box');
const movementFilter = document.getElementById('movement-filter');

// Listen for change on the movements filter dropdown, run search
movementFilter.addEventListener('change', e => {
    console.log(searchForm)
    const search = searchForm.value.trim();
    runSearch(search)
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
    fetch('/synagogues')
        .then( res => res.json() )
        .then( data => {
            let movements = [];
            data.forEach(entry => {
                // Confirm uniqeness and push to array
                if ( !movements.includes(entry.movement) ){
                    movements.push(entry.movement);
                }
            });
            movements.forEach(type => {
                // Create option element and append to the dropdown
                let option = document.createElement('option');
                option.setAttribute('value', type);
                option.innerText = type
                movementFilter.appendChild(option);
            });
        });
});

// Search function. Accepts a string as a search term and check the filters element for its value.
const runSearch = search => {
    const filters = movementFilter.value;

    // Create query string
    let query = search ? `synagogues?search=${search}` : `synagogues`; 
    if ( filters && filters !== 'all' ) {
        query += search ? `&filters=${filters}` : `?filters=${filters}`;
    }

    // Use the URL class to create a properly formatted query
    const url = new URL(`${this.location.origin}/${query}`)

    try {
        fetch(url.pathname + url.search)
        .then( res => res.json() )
        .then( synagogues => {
            // Get results list DOM element and reset
            const resultsList = document.getElementById('search-results-list');
            resultsList.innerText = '';

            // Print number of results found
            if ( synagogues.length === 0 ) {
                return resultsInfo.innerHTML = `<h5>No results found.</h5>`
            } else {
                resultsInfo.innerHTML = `<h5>${synagogues.length} results.</h5>`
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
            })
        })
        .catch( console.log )
    }
    catch (err) {
        resultsInfo.innerHTML = `
        <h5>Error fetching data</h5>
        <p>${err}</p>
        `
    }
}