"use strict"
import { $, $$ } from './bind.js'

export default(() => {
    let playing = {canPlay: false}
    let currentIndex
    let isPlaying = false
    const anms = $$('.anime-wrapper')
    const audio = $('#audio')

    anms.forEach((anm, i) => {
        anm.addEventListener('mouseenter', () => {
            if(!playing.canPlay) return
            isPlaying = true
            if (currentIndex !== i) {
                currentIndex = i
                audio.src = `../Storage/Music/${i + 1}.mp3`
            }
            audio.play()
        })
    })

    for (let anm of anms) anm.addEventListener('mouseleave', () => playing.canPlay && audio.pause())

    audio.addEventListener('ended', () => isPlaying && setTimeout(() => audio.play(), 1000))

    return playing
})()