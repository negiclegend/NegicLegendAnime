"use strict"
import { $, $$ } from './bind.js'
import playing from './audio.js'

(() => {
    function handleClick(clickE) {
        clickE.clickedElement.addEventListener('click', () => {
            (clickE.affectedElement||clickE.clickedElement).classList[clickE.type||'toggle'](clickE.addedClass||'active')
            clickE.callBack?.()
        })
    }

    handleClick({
        clickedElement: $('#menu'),
        affectedElement: $('#tag-menu-wrap'),
        type: 'add',
    })

    handleClick({
        clickedElement: $('#exit-menu'),
        affectedElement: $('#tag-menu-wrap'),
        type: 'remove'
    })

    window.matchMedia('(hover: hover)').matches && handleClick({
        clickedElement: $('#avt'),
        callBack: () => {
            if($('#avt.active')) {
                $('body').addEventListener('mousemove', () => {
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
        clickedElement: $('#negic-icon'),
        affectedElement: $('#self'),
        addedClass: 'hide'
    })

    handleClick({
        clickedElement: $('#theme'),
        addedClass: 'dark',
        callBack: () => {
            const theme = $('#theme-file')
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
        clickedElement: $('#volume'),
        addedClass: 'mute',
        callBack: () => playing.canPlay = !$('#volume').classList.contains('mute')
    })
})()