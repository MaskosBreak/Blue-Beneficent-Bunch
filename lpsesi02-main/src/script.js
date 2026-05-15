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
