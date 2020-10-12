const resultsInfo = document.getElementById('results-info');
const searchForm = document.getElementById('search-box');
const movementFilter = document.getElementById('filters');
const resultsList = document.getElementById('search-results-list');
const buttonContainer = document.getElementById('load-more');
const resultsPerPage = document.getElementById('results-per-page');
const resetSearch = document.getElementById('reset-search');
const selectedFilters = document.getElementById('selected-filters');

// Search function. Accepts a string as a search term and check the filters element for its value.
const runSearch = (
        search=searchForm.value, 
        persist=false, 
        skip=0, 
        limit=parseInt(resultsPerPage.value)
    ) => {

    /* Create Query String */

    // Check if search has a value and append
    let query = search ? `synagogues?search=${search}` : `synagogues?`; 

    // Read selected filters from filters menu and create a string from their names for query
    let filters = [];
    Array.from(movementFilter.children).forEach(option => {
        if ( option.firstElementChild.checked ) {
            filters.push(option.firstElementChild.name)
        }
    });
    filters = filters.join(',');

    // Check if filters has value and append
    if ( filters ) { query += search ? `&filters=${filters}` : `filters=${filters}`; };
    
    // Append pagination params
    if ( !filters && !search ) { query += `skip=${ parseInt(skip) }&limit=${ parseInt(limit) }` }
    else { query += `&skip=${ parseInt(skip) }&limit=${ parseInt(limit) }` };

    // Make query URI safe
    const url = encodeURI(`${this.location.origin}/${query}`)

    try {
        fetch(url)
        .then( res => res.json() )
        .then( ({synagogues,count}) => {

            // Persist previous results if using 'show more', else reset
            if (!persist) {
                // Get results list DOM element and reset
                resultsList.innerText = '';
            };

            // Reset show more button
            buttonContainer.innerText = '';
            
            // Render results info
            resultsInfo.innerHTML = createResultsInfo( search, limit, skip, count );

            // Create button to reset search;
            resultsInfo.appendChild( createResetSearchButton() );

            // Append card for each result
            synagogues.forEach(synagogueData => {
                resultsList.appendChild(createSynagogueCard(synagogueData));
            });

            // If results overflow limit, append 'show more' button
            buttonContainer.appendChild(createShowMoreButton( count, limit, skip ))
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

