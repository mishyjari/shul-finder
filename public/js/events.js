// Listen for change on the movements filter dropdown, run search
movementFilter.addEventListener('change', e => {
    if ( e.target.checked ){
        selectedFilters.appendChild(createSelectedFilterTab(e.target.value))
    }
    else {
        selectedFilters.removeChild(document.getElementById(`filter-tab-${e.target.value}`))
    }
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

// Listen for change in results per page box
resultsPerPage.addEventListener('change', e => {
    runSearch(searchForm.value)
});

// On page load, find all movement names listed in the database and populate the filters dropdown with that info
// This would be best moved to static data in production which updates only occasionally
document.addEventListener('DOMContentLoaded', () => {
    resultsInfo.innerHTML = `
        <h5>Enable location services or use the search bar to find shuls anywhere in the US</h5>
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
            movements.forEach(name => {
                movementFilter.appendChild(createFiltersChecbox(name))
            })
        });

    // Try using browser geoloaction to determine user's current location
    navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
        const { latitude, longitude } = coords;
        geocode({ latitude, longitude })
    });
});