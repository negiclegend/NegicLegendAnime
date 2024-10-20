"use strict";
import { $ } from './bind.js'

(() => {
    const header = $('#header')
    const menu = $('#menu')
    const scroll = $('#scroll')
    let lastScrollTop = 0
    scroll.addEventListener('click', () => window.scrollY > screen.height * 2.5 ? window.scrollTo({ top: 0, behavior: "smooth" }) : window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }))
    window.addEventListener('scroll', () => {
        scroll.classList.toggle('up', window.scrollY > screen.height * 2.5)
        header.classList.toggle('fly', window.scrollY > header.offsetHeight)
        const currentScrollTop = document.documentElement.scrollTop
        if(currentScrollTop > lastScrollTop && window.scrollY > header.offsetHeight) {
            menu.style.opacity = 0
            setTimeout(() => (window.scrollY > header.offsetHeight) && (menu.style.display = 'none'), 300)   
        } else {
            menu.style.display = 'flex'
            setTimeout(() => menu.style.opacity = 1)
        }
        lastScrollTop = Math.max(0, currentScrollTop)
    })
})()