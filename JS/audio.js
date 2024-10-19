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
                audio.src = `./Storage/Music/${i + 1}.mp3`
            }
            audio.play()
            anm.addEventListener('mouseleave', () => playing.canPlay && (isPlaying = false, audio.pause()))
        })
    })

    audio.addEventListener('ended', () => (isPlaying && playing.canPlay) && setTimeout(() => audio.play(), 1000))

    return playing
})()