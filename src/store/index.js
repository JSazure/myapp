import {createStore,combineReducers} from 'redux'
import homedata from './home.js'
import kinddata from './kind.js'
import cartdata from './cart.js'
const reducer = combineReducers({
	homedata,
	kinddata,
	cartdata
})
const store = createStore(reducer)
 
 export default store