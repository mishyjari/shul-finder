const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const query = e.target.children['search-box'].value;
    const url = `/synagogues?city=${query}`
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
                `;
                resultsList.appendChild(synagogue)
            })
        })
        .catch( console.log )
});