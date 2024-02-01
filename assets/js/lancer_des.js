const random_number = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const print_lumen = (results, max) => {
    const container = document.getElementById('results-lumen');
    const correspondance = [undefined, 'one', 'two', 'three', 'four', 'five', 'six']
    const cols = results.map(r => `<div class="col-md-1 col-6 text-center px-2"><div class="${r === max ? ' border border-white' : ''}"><img src="${window.location.protocol}//${window.location.hostname}:${window.location.port}/assets/images/des/dice-${correspondance[r]}-solid.svg" class="article-image"/></div></div>`).join('')
    container.innerHTML = cols
    const error = document.getElementById('error-lumen')
    error.textContent = ""
}

const lancer_lumen = (e) => {
    e.preventDefault()
    const input = document.getElementById('dice-lumen')
    if (/^[0-9]*$/.test(input.value) && +input.value > 0) {
        const numb = +input.value
        const results = [...new Array(numb)].map((_) => random_number(1, 6))
        const max = Math.max(...results)
        print_lumen(results, max)
    } else {
        const error = document.getElementById('error-lumen')
        error.textContent = "Une erreur est survenue."
    }

}