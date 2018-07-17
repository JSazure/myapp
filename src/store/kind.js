const kinddata = (state ={
	kindMenuList:[],
	kindlist:[]
},{type,data}) =>{
	switch(type){
		case 'KIND_MENU_LIST':
		state.kindMenuList = data
		return state;
		case 'KIND_LIST':
		state.kindlist = data
		return state;	
		default:
		return state
	}
}
	
export default kinddata