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
                        <a href=${synagogueData.url} class='btn btn-outline-secondary'>Website</a>
                    </div>
                `;
                resultsList.appendChild(synagogueCard)
            })
        })
        .catch( console.log )
});

