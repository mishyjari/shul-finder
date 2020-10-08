// Event handler for movement filter
const movementFilter = document.getElementById('movement-filter');
movementFilter.addEventListener('change', e => {
    console.log('Live update not implemented.')
});

// Event handler for search form
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const query = e.target.children['search-box'].value;
    const filters = movementFilter.value;

    let url = query ? `/synagogues?search=${query}` : `/synagogues`; 

    if ( filters && filters !== 'all' ) {
        url += query ? '&filters=' : '?filters=';
        url+= filters
    }

    console.log(url)
    fetch(url)
        .then( res => res.json() )
        .then( synagogues => {
            const resultsList = document.getElementById('search-results-list');
            resultsList.innerText = '';

            if ( synagogues.length === 0 ) {
                return resultsList.innerHTML = `<h5>No Results</h5>`;
            }
            synagogues.forEach(synagogueData => {
                const synagogue = document.createElement('li');
                synagogue.innerHTML = `
                    <strong>${synagogueData.name}</strong>
                    <br />
                    ${synagogueData.address}
                    <br />
                    ${synagogueData.movement}
                `;
                resultsList.appendChild(synagogue)
            })
        })
        .catch( console.log )
});

