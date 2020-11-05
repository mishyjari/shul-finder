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
const createSynagogueCard = ({ name, movement, address, city, state, url, _id, phone }) => {
    const synagogueCard = document.createElement('div');
    Object.assign(synagogueCard, {
        class: 'accordion',
        id: `card-${_id}`
    });

    synagogueCard.innerHTML = `
        <div class='card'>
            <div class='card-header' id='card-header-${_id}' data-toggle='collapse' data-target='#card-details-${_id}' aria-expanded='false' aria-controls='card-details-${_id}'>
                <h5>${name}</h5>
                <h6><em>${city}, ${state}</em> - <strong>${movement}</strong></h6>
            </div>

            <div class='collapse' data-toggle='collapse' id='card-details-${_id}' aria-labelledby='card-header=${_id}' data-parent='#card-header-${_id}'>
                <div class='card-body'>
                    <div class='row'>
                        <div class='col card-details-property-col'>
                            Address:
                        </div>
                        <div class='col card-details-info-col'>
                            ${address}<br />
                            ${city}, ${state}
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col card-details-property-col'>
                            Phone:
                        </div>
                        <div class='col card-details-info-col'>
                            ${phone}
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col card-details-property-col'>
                            Website:
                        </div>
                        <div class='col card-details-info-col'>
                            <a href='${url}' target='_blank'>link</a>
                        </div>
                    </div>
                    <a href='http://localhost:3000/synagogues/${_id}/coords'>Coordinates</a>
                </div>
            </div>
        </div>
    `

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

// Create modal for synagogue details view
const createSynagogueModal = data => {
    console.log(data)
}