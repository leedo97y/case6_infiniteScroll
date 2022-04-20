;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const getPost = async () => {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('에러')
    }
    return await response.json()
  }

  const loadPost = async () => {
    const response = await getPost()
    console.log(response)
  }

  window.addEventListener('DOMcontentLoaded', () => {
    loadPost()
  })
})()
