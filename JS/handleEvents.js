"use strict"
import { $, $$ } from './bind.js'
import playing from './audio.js'

(() => {
    const menuBtn = $('#menu')
    const menu = $('#tag-menu-wrap')
    const avt = $('#avt')
    const body = $('body')
    const selfBtn = $('#negic-icon')
    const self = $('#self')
    const themeBtn = $('#theme')
    const theme = $('#theme-file')
    const audioBtn = $('#volume')
    const exit = $('#exit-menu')

    function handleClick({ clickedElement, affectedElement = clickedElement, type = 'toggle', addedClass = 'active', callBack = null }) {
        clickedElement.addEventListener('click', () => {
            affectedElement.classList[type](addedClass)
            callBack?.()
        })
    }

    handleClick({
        clickedElement: menuBtn,
        affectedElement: menu,
        type: 'add',
    })

    handleClick({
        clickedElement: exit,
        affectedElement: menu,
        type: 'remove'
    })

    window.matchMedia('(hover: hover) and (pointer: fine)').matches && handleClick({
        clickedElement: avt,
        callBack: () => {
            if(avt.classList.contains('active')) {
                body.addEventListener('mousemove', () => {
                    for(let eye of $$('.eye')) {
                        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2)
                        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2)
                        let radian = Math.atan2(event.pageX - x, event.pageY - y)
                        let rot = (radian * (180 / Math.PI) * -1 + 270)
                        eye.style.transform = 'rotate('+ rot + 'deg)'
                    }
                })
            }
        }
    })

    handleClick({
        clickedElement: selfBtn,
        affectedElement: self,
        addedClass: 'hide'
    })

    handleClick({
        clickedElement: themeBtn,
        addedClass: 'dark',
        callBack: () => {
            theme.href = theme.href.indexOf('dark') > -1 ? './CSS/theme/light.css' : './CSS/theme/dark.css'
            for(let anim of document.getAnimations()) {
                if(anim.animationName == 'grow' || anim.animationName == 'fadeOut') {
                    anim.cancel()
                    anim.play()
                }
            }
        }
    })

    handleClick({
        clickedElement: audioBtn,
        addedClass: 'mute',
        callBack: () => playing.canPlay ^= true
    })
})()