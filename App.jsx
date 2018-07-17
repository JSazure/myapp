import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import MainFooter from '@/components/MainFooter.jsx'
import Home from '@/components/Home.jsx'
import Cart from '@/components/Cart.jsx'
import User from '@/components/User.jsx'


class App extends Component {
  constructor (props) {
    super(props)
		
  }
  
  render () {
    
    return (
      <div className = 'container'>
			hellohellohellohello!
			
			
        <Switch>
          <Route path='/home' component = {Home} />
            
          <Route path='/cart' component = {Cart} />
          <Route path='/user' component = {User} />
          <Redirect to = {{pathname: '/home'}} />
        </Switch>
        <MainFooter />
      </div>
    )
  }
}

export default App
