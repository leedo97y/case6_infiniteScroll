;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let page = 1
  const limit = 10 
  const $posts = get('.posts')
  const end = 100
  let total = 10
  // 첫번째 페이지 부터 시작이므로 1지정
  // limit 설정 -> 10
  // $posts를 만들어준다. ==> get 함수를 이용해서 posts라는 클래스에 붙여줌
  // 총 컨텐츠 개수는 100개
  // total은 한페이지당 보이는 컨텐츠 개수

  const getPost = async () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('에러')
    }
    return await response.json()
  }
  // async 와 await를 써준다.
  // response.ok가 아닐때, Error를 만들어서 throw 해준다.

  const showPosts = (posts) => {
    posts.forEach((post) => {
      // posts를 각각 하나씩 바꿔줘야 하므로 forEach를 쓴다.
      const $post = document.createElement('div')
      // post를 div 태그로 만들어서 붙여준다.
      $post.classList.add('post')
      // post에 post라는 클래스를 만들어주고
      // html을 추가해준다.
      $post.innerHTML = `
        <div class="header">
          <div class="id">${post.id}</div>
          <div class="title">${post.title}</div>
        </div>
        <div class="body">
          ${post.body}
        </div>
      `
      $posts.appendChild($post)
      // posts에 post를 append 해준다.
    });
  }

  const loadPost = async () => {
    const response = await getPost()
    showPosts(response)
    // load해온 post를 보여준다.
  }

  const onScroll = () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if (total == end) {
      // total이 100이 되면 그냥 반환해준다.
      return
    }
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      page++
      total += 10
      // 페이지를 하나씩 늘려준다.
      // total을 10개씩 보여주기 위해 10개씩 더해가는 것으로 표현
      loadPost()
      // loadPost 함수를 리로딩
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    loadPost()
    window.addEventListener('scroll', onScroll())
  })
})()
