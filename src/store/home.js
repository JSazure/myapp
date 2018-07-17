const homedata = (state ={
	homelist:[]
},{type,data}) =>{
	if(type == 'HOME_LIST'){
		state.homelist=data
	}
	return state
	
}
	
export default homedata