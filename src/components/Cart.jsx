import React,{Component} from 'react'
import cartapi from '@/api/cart.js'
import store from '@/store/index.js'
class Cart extends Component{
	constructor(props){
		super(props)
		
	}
	componentDidMount(){
		 if(localStorage.getItem('isLogin') == 1){
			 const userID=localStorage.getItem('userID')
		     cartapi.getData(userID,(data)=>{
				 store.dispatch({
					 type:'CART_LIST',
					 data
				 })
			 })
		
		    }else {
		      this.props.history.push('/login')
		    }
	}
	addNum(goodsID,index){
		const userID = localStorage.getItem('userID')
		var number=this.refs['item'+goodsID].value * 1 + 1
		cartapi.updataCar({userID,goodsID,number},(data)=>{
			if(data == 1){
				this.refs['item'+goodsID].value=number
				store.dispatch({
					type:'UPDATE_CART_LIST',
					data:{
						index,number
					}
				})
				
			}else{
				alert('添加失败')
			}
		})	
	}
	subNum(goodsID,index){
		const userID = localStorage.getItem('userID')
		var number=this.refs['item'+goodsID].value * 1 - 1
		if(number<1){
			number = 1
		}
		cartapi.updataCar({userID,goodsID,number},(data)=>{
			if(data == 1){
				this.refs['item'+goodsID].value=number
				store.dispatch({
					type:'UPDATE_CART_LIST',
					data:{
						index,number
					}
				})
				
			}else{
				alert('添加失败')
			}
		})	
	}
	
	render(){
		var arr=[]
		var cartlist = store.getState().cartdata.cartlist
		if(cartlist==0){
			arr='暂无数据'
		}else{
			cartlist.map((item,index)=>{
				arr.push(
					<li key={item.goodsID}>
						<img src={item.goodsListImg}/>
						<div className='proinfo'>
						{item.goodsName}
						<br/>
						<button onClick = {this.subNum.bind(this, item.goodsID,index)}>-</button>
						<input ref={'item'+item.goodsID} defaultValue ={item.number}/>
						<button onClick = {this.addNum.bind(this, item.goodsID,index)}>+</button>
						
						<p>数量:{item.number}------总价:{item.number*item.price}
						
						</p>
						
						</div>		
					</li>
				)
			})
		}
		return(
			<div className='container'>
				<div className= 'main'>
					<header>
						购物车头部
					</header>
					<div className='content'>
						<ul className='prolist'>
						{arr}						
						</ul>
						<p>总数量:{store.getState().cartdata.totalNum}</p>
						<p>总价:{store.getState().cartdata.totalPrice}</p>
					</div>
				</div>
				
			
			</div>
		)
	}
}
export default Cart