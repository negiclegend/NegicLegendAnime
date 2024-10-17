"use strict";
import { $ } from './bind.js'

(() => {
    const header = $('#header')
    const menu = $('#menu')
    let lastScrollTop = 0
    $('#scroll').addEventListener('click', () => window.scrollY > screen.height * 2.5 ? window.scrollTo({ top: 0, behavior: "smooth" }) : window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }))
    window.addEventListener('scroll', () => {
        $('#scroll i').style.transform = window.scrollY > screen.height * 2.5 ? 'rotate(180deg)' : 'rotate(0deg)'
        header.classList.toggle('fly', window.scrollY > header.offsetHeight)
        const currentScrollTop = document.documentElement.scrollTop
        const isScrollingDown = currentScrollTop > lastScrollTop && window.scrollY > header.offsetHeight
        if(isScrollingDown) {
            menu.style.opacity = 0
            setTimeout(() => menu.style.display = 'none', 300)   
        }
        else {
            menu.style.display = 'flex'
            setTimeout(() => menu.style.opacity = 1)
        }
        lastScrollTop = Math.max(0, currentScrollTop)
    })
})()