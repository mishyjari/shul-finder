const resultsInfo = document.getElementById('results-info');

// Event handler for movement filter
const movementFilter = document.getElementById('movement-filter');
movementFilter.addEventListener('change', e => {
    console.log('Live update not implemented.')
});

// Event handler for search form
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const search = e.target.children['search-box'].value.trim();
    const filters = movementFilter.value;
    console.log(filters)

    let query = search ? `synagogues?search=${search}` : `synagogues`; 

    if ( filters && filters !== 'all' ) {
        query += search ? `&filters=${filters}` : `?filters=${filters}`;
    }

    const url = new URL(`${this.location}${query}`)
    console.log(url)

    try {
        fetch(url.pathname + url.search)
        .then( res => res.json() )
        .then( synagogues => {
            const resultsList = document.getElementById('search-results-list');
            resultsList.innerText = '';

            console.log(synagogues.length)

            if ( synagogues.length === 0 ) {
                return resultsInfo.innerHTML = `<h5>No results found.</h5>`
            } else {
                resultsInfo.innerHTML = `<h5>${synagogues.length} results.</h5>`
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
    
});

// Fetch all movements from db and populate filter dropdown
document.addEventListener('DOMContentLoaded', () => {
    fetch('/synagogues')
        .then( res => res.json() )
        .then( data => {
            let movements = [];
            data.forEach(entry => {
                if ( !movements.includes(entry.movement) ){
                    movements.push(entry.movement);
                }
            });
            movements.forEach(type => {
                let option = document.createElement('option');
                option.setAttribute('value', type);
                option.innerText = type
                movementFilter.appendChild(option);
            });
        });

});