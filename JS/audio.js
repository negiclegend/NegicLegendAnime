"use strict"
import { $, $$ } from './bind.js'

export default(() => {
    let playing = {canPlay: false}
    let currentIndex
    const anms = $$('.anime-wrapper')
    const audio = $('#audio')

    anms.forEach((anm, i) => {
        anm.addEventListener('mouseenter', () => {
            if (!playing.canPlay) return
            if (currentIndex !== i) {
                currentIndex = i
                audio.src = `./Storage/Music/${i + 1}.mp3`
            }
            audio.play()
        })
        anm.addEventListener('mouseleave', () => !audio.paused && audio.pause())
    })

    audio.addEventListener('ended', () => playing.canPlay && setTimeout(() => audio.paused && audio.play(), 1000))

    return playing
})()