"use strict"
import { $, $$ } from './bind.js'
import { TagsList, rankList } from '../Storage/List/ActiveList.js'
import animeList from '../Storage/List/AnimeList.js'
import filterQuotes from './quote.js'

export default (() => {
   const btns = $$('.tag-menu-item')
   const all = $('#tag-menu-all')
   const quant = $('#quantity')
   const anms = $$('.anime-wrapper')
   const number = $('#number')

   function activeValue(index) {
      return TagsList.some(tag => animeList[index].tags.includes(tag.tagName) && tag.tagValue)
      && rankList.some(rank => animeList[index].level[0] == rank.level && rank.rankValue)
   }

   function filterAnime() {
      let activeCount = 0
      anms.forEach((anm, i) => {
         const isActive = activeValue(i)
         anm.style.display = isActive ? 'block' : 'none'
         isActive && activeCount++
      })
      number.innerText = activeCount
      filterQuotes()
   }

   btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
         TagsList[i].tagValue ^= true
         if (!TagsList[i].tagValue) all.classList.add('active')
         else if (TagsList.every(tag => tag.tagValue)) all.classList.remove('active')
         btn.classList.toggle('yes')
         filterAnime()
      })
   })


   quant.addEventListener('click', e => {
      if (!e.target.closest('.rank')) return quant.classList.toggle('active')
      const rankElement = e.target.classList.contains('rank') ? e.target : e.target.closest('.rank')
      rankElement.classList.toggle('active')
      rankList[getComputedStyle(rankElement).getPropertyValue('--i')].rankValue ^= true
      filterAnime()
   })

   all.addEventListener('click', () => {
      const isActive = !TagsList.every(tag => tag.tagValue)
      TagsList.forEach((tag, i) => {
         tag.tagValue = isActive
         btns[i].classList.toggle('yes', isActive)
      })
      filterAnime()
      all.classList.toggle('active')
   })

   return activeValue
})()