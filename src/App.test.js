import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/** 
 This is not designed for Test Driven Development or BDD. 
 
**/

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})


