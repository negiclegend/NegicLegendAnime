"use strict"

import { $, $$ } from './bind.js'
import animeList from '../../Storage/List/AnimeList.js'
import activeValue from './filter.js'

export default (() => {
    const display = $('#quote')
    const nextBtn = $('#next-quote i')
    const prevBtn = $('#prev-quote i')
    let activeIndex = 0

    function displayQuote(index) {
        display.dataset.index = activeIndex = index
        display.innerText = `${animeList[index].quote.content} - ${animeList[index].quote.author || `[${animeList[index].name}]`}`
    }

    function showFooterButtons(value) {
        nextBtn.style.display = value ? 'flex' : 'none'
        prevBtn.style.display = value ? 'flex' : 'none'
    }

    function filterQuotes() {
        if (!activeValue(display.dataset.index)) {
            for (let i = activeIndex + 1;; i++) {
                if (i >= animeList.length) i = 0
                if (animeList[i].quote !== undefined && activeValue(i)) {
                    displayQuote(i)
                    break
                }
                if (i === activeIndex) {
                    display.dataset.index = activeIndex = 0
                    display.innerText = ''
                    break
                }
            }
        } else if (!display.innerText) {
            displayQuote(activeIndex)
        }
        showFooterButtons(animeList.filter((anm, i) => anm.quote !== undefined && activeValue(i)).length > 2)
        $('#footer').style.display = display.innerText ? 'flex' : 'none'
    }

    function findNextQuote(step) {
        for (let i = activeIndex + step;; i += step) {
            if (i >= animeList.length) i = 0
            if (i < 0) i = animeList.length - 1
            if (animeList[i].quote !== undefined && activeValue(i)) {
                displayQuote(i)
                break
            }
        }
    }

    display.addEventListener('click', () => $$('.anime-wrapper')[activeIndex].scrollIntoView({ behavior: "smooth", block: "center" }))
    nextBtn.addEventListener('click', () => findNextQuote(1))
    prevBtn.addEventListener('click', () => findNextQuote(-1))

    return filterQuotes
})()