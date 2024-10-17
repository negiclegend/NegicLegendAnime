"use strict"
import { $ } from './bind.js'
import animeList from '../../Storage/List/AnimeList.js'

(() => {
    const display = $('#quote')

    function checkLevel(lv) {
        if(lv[0] == 'S') return 'mythical'
        if(lv[0] == 'A') return 'legendary'
        return 'epic'
    }
    
    function error() {
       return 'onerror="this.src=\'https://thumbs.dreamstime.com/b/computer-screen-error-effect-glitch-binary-code-abstract-digital-matrix-background-noise-vector-228803972.jpg\'; this.parentNode.style.alignItems=\'center\'"'
    }

    const html = animeList.map((anm, i) => {
        return `
            <div class="anime-wrapper active">
                <div class="anime-level ${checkLevel(anm.level)}">${anm.level}</div>
                <div class="anime-img-wrap ${anm.imgP}">
                    <img src="../Storage/IMG/${i + 1}.jpg" class="anime-img" ${error()}>
                    <a href="${anm.link}" class="anime-link">${anm.name}</a>
                </div>
                <div class="anime-tag-wrap">
                    <p class="anime-tag">${anm.tags.join(', ')}</p>
                </div>
            </div>
        `
    })
    
    $('#number').innerHTML = html.length
    $('#main').innerHTML = html.join('\n')
    display.innerHTML = `${animeList[0].quote.content} - ${animeList[0].quote.author || `[${animeList[0].name}]`}`
    display.dataset.index = 0
})()