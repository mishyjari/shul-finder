// Selected filter tab - rendered above search results as filters are selected from the filters menu
const createSelectedFilterTab = filterName => {    
    // Create the tab elemment
    const filterTab = document.createElement('span');
    filterTab.setAttribute('id', `filter-tab-${filterName}`);
    filterTab.setAttribute('class', 'filter-tab');
    filterTab.innerHTML = `<strong>${filterName}</strong>`
    
    // Create the X to remove filter
    const removeFilterButton = document.createElement('span');
    removeFilterButton.setAttribute('id', `remove-filter-${filterName}`);
    removeFilterButton.setAttribute('class', 'remove-button');
    removeFilterButton.innerHTML = '&times';
    
    filterTab.appendChild(removeFilterButton)    

    // Create event handler for filter being removed
    removeFilterButton.addEventListener('click', () => {
        // Remove DOM element
        filterTab.remove();
        // Uncheck box in filters menu
        document.getElementById(`filter-${filterName}`).checked = false;
        // Fetch data with new filters
        runSearch();
    })
    return filterTab;
};

// Filter options - as movement names are fetched from the DB, create input checkbox fields for the filters menu
const createFiltersChecbox = name => {
    const option = document.createElement('div');
    option.innerHTML = `
        <input type='checkbox' value='${name}' id='filter-${name}' name='${name}'/>
        <label for='filter-${name}'>${name}</label>
        <br />
    `;
    return option
};

// Results info tag
const createResultsInfo = ( search, limit, skip, count ) => {
    return count === 0 ?
        `<h5>No results found for ${search}.</h5>`
    : search.length > 0 ?
        `<h5>Showing ${limit+skip > count ? count : limit+skip} of ${count} results for <em>${search}</em></h5>`
    : 
        `<h5>Showing ${limit+skip > count ? count : limit+skip} of ${count} results</h5>`
};

// Reset search button
const createResetSearchButton = () => {
    const reset = document.createElement('span');
    reset.setAttribute('id', 'reset-search');
    reset.setAttribute('class', 'remove-button');
    reset.innerHTML = '&times';

    // Hide button if no search term is present
    if ( searchForm.value.length === 0 ) { reset.setAttribute('hidden', 'hidden') }

    // Handle click event
    reset.addEventListener('click', () => {
        searchForm.value = ''
        runSearch();
    });
    return reset;
};

// Create bootstrap card for synagogue results
const createSynagogueCard = ({ name, movement, address, city, state, url, _id }) => {
    const synagogueCard = document.createElement('div');
    synagogueCard.setAttribute('class', 'card')
    synagogueCard.innerHTML = `
        <div class='card-body'>
            <h5 class='card-title'>${name}</h5>
            <h6 class='card-title'>${movement}</h5>
            <p class='card=text'>
                ${address}, <br />
                ${city}, ${state}
            </p>
            <a href=${url} class='btn btn-outline-primary'>Website</a>
            <a href='/synagogues/${_id}' class='btn btn-outline-info'>Details</a>
        </div>
    `;
    return synagogueCard;
};

// Create 'Show More' Button for inline pagination
const createShowMoreButton = ( count, limit, skip, search=searchForm.value ) => {
    const moreButton = document.createElement('button');

    // Check if there is result overflow
    if ( count > limit && skip+limit < count ) {
        moreButton.setAttribute('class', 'btn btn-outline-info');
        moreButton.innerHTML = 'Load more results';
    
        moreButton.addEventListener('click', () => {
            buttonContainer.removeChild(moreButton)
            runSearch(search, true, skip+limit, limit)
        });
    }
    else {
        moreButton.setAttribute('class', 'btn btn-outline-secondary');
        moreButton.setAttribute('disabled', 'true');
        moreButton.innerText = 'End of Results'
    };
    return moreButton;
}
