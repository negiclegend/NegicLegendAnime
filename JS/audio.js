"use strict"
import { $, $$ } from './bind.js'

export default (() => {
    let playing = { canPlay: false }
    let playable = false
    let currentIndex
    const anms = $$('.anime-wrapper')
    const audio = $('#audio')

    const playablePromise = new Promise(resolve => {
        audio.addEventListener('canplaythrough', () => {
            playable = true
            resolve()
        }, { once: true })
    })

    anms.forEach((anm, i) => {
        anm.addEventListener('mouseenter', async () => {
            if (!playing.canPlay) return
            if (currentIndex !== i) {
                playable = false
                currentIndex = i
                audio.src = `./Storage/Music/${i + 1}.mp3`
            }
            await playablePromise
            playable && audio.play()
        })

        anm.addEventListener('mouseleave', () => !audio.paused && audio.pause())
    })

    audio.addEventListener('ended', () => playing.canPlay && setTimeout(() => audio.paused && audio.play(), 1000))

    return playing
})()