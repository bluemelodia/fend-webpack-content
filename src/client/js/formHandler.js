export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })

    fetch(`/pokemon/${formText}`)
    .then(res => res.json())
    .then(function(res) {
        console.log('Returned Pokemon cards: ', res);
        document.getElementById('results').innerHTML = ''
        if (res && res.cards) {
            let gallery = document.createElement('div')
            for (let pokemon of res.cards) {
                console.log("Pokemon: ", pokemon)
                if (pokemon.imageUrl) {
                    let card = document.createElement('div');
                    card.innerHTML = `<img src="${pokemon.imageUrl}">`
                    gallery.appendChild(card);
                    console.log("Add card: ", card)
                }
            }
            document.getElementById('results').appendChild(gallery)
        }
    })
}
