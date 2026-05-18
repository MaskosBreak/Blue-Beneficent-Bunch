window.addEventListener('scroll', ()=> {
    const nav = document.querySelector('nav')

    if(window.scrollY > 0){
        nav.classList.add('sc')
        footer.classList.add('ft')
    }else{
        nav.classList.remove('sc')
        footer.classList.remove('ft')
    }
})
function navTo(id){
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}
const cards = document.querySelectorAll('#s2, .card')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible')
                }, index * 500)
            })
        }
    })
}, {threshold:0.2})

observer.observe(document.querySelector('#s2'))

function enviar(){
    const nome = document.getElementById('nome').value
    const assunto = document.getElementById('assunto').value

    const mensagem = `Would you like to contact us"\n\nNome ${nome}\nAssunto: ${assunto}`
    console.log(mensagem, 'normal string')
    
    const msg = encodeURIComponent(mensagem)
    window.open(`https://wa.me/51dd*******26?text=${msg}`)
}