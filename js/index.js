document.addEventListener('DOMContentLoaded', () => {  
    createMonsterInputs()
    createMonster() 
    getAllMonsters()     
  })
  
  //adding input elements to DOM
  function createMonsterInputs() {  
    document.querySelector('#create-monster').innerHTML = `
    <form method='post'>
      <input id='name' placeholder='name...'>
      <input id='age' placeholder='age...'>
      <input id='description' placeholder='description...'>
      <input type='submit' value='Create'>
    </form>`    
  }
  
  //creating a monster from inputs
  function createMonster() {
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault()
      let monsterObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
      }
      renderOneMonster(monsterObj)
      addMonsterToDB(monsterObj)
    })
  }
  
  //render monsters with limit of 50 onto DOM
  function getAllMonsters() {
    let limit = 50
    let page = 1
    getData(limit, page)
    displayMonstersByPage(limit, page)
  }
  
  //creating DOM element for monster
  function renderOneMonster(monster) {
    const div = document.createElement('div')
    div.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>`  
    document.querySelector('#monster-container').appendChild(div)
  }
  
  function addMonsterToDB(obj) {
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Connect-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
  
  //handle back/forth buttons 
  function displayMonstersByPage(limit, page) {
    const forward = document.querySelector('#forward')
    const backward = document.querySelector('#back')
    
    backward.addEventListener('click', () => {
      if(page > 1) {
        page -= 1
        getData(limit, page)  
      }
    })
  
    forward.addEventListener('click', () => {
      if(page < 21) {
        page += 1
        getData(limit, page)
      }
    })
  }
  
  //GET method from database
  function getData(num1, num2) {
    document.querySelector('#monster-container').innerText = ''
    fetch(`http://localhost:3000/monsters/?_limit=${num1}&_page=${num2}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => {
      renderOneMonster(monster)
    }))
  }
  