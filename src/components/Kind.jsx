import React,{Component} from 'react'
import kindApi from '@/api/kind.js'
import {Link,NavLink} from 'react-router-dom'
import tool from '@/tool/index.js'
import store from '@/store/index.js'
import Loading from '@/uicom/loading.jsx'

class Kind extends Component{
	constructor(props){
		super(props)
		this.getData= this.getData.bind(this)
		this.state={
			isloading:'none'
		}
		
	}
	componentDidMount (){
		kindApi.getMenuList ((data)=>{
			console.log(data)
			store.dispatch({
				type:'KIND_MENU_LIST',
				data
			})
		})
		var classID = this.props.match.params['classID']
		this.getData(classID)
		tool.backTop()
	}
	componentWillReceiveProps(nextProps){
		var classID = nextProps.match.params['classID']
		this.getData(classID)
	}
	
	getData (classID) {
		this.setState({
			isloading:'block'
		})
		kindApi.getListData (classID, (data) => {
			store.dispatch({
				type:'KIND_LIST',
				data
			})
			this.setState({
				isloading:'none'
			})
		})
	}
	
	render(){
		var arr = []
		if(store.getState().kinddata.kindlist==0){
			arr='暂无数据'
		}else{
				store.getState().kinddata.kindlist.map((item,index) => {
				arr.push(
					<Link key={item.goodsID} to={'/detail/' + item.goodsID}>
						<li>
							<img src={item.goodsListImg} />
							<div className='proinfo'>
								{item.goodsName}
				<p>价格:  {item.price}元  &nbsp;&nbsp;&nbsp;&nbsp;折扣:{item.discount}折</p>
							</div>									
						</li>			
					</Link>
				)
			})
		}
		return(
			<div className='container'>
				<div className= 'main'>
					<header>
						商品分类
					</header>
					<div className='content kindContent'>
						<ul className='kindMenu'>
							{
								store.getState().kinddata.kindMenuList.map((item,index)=>(
									<li className={store.getState().kinddata.activeIndex == index ? 'active' : ''}  key={item.classID}>
									<NavLink to={'/kind/'+item.classID}>{item.className}</NavLink>
									</li>
								))
							}				
						</ul>
						<Loading display={this.state.isloading}/>
						<div className='kindList'>
							<ul className = 'prolist'>
								{
									arr
								}
							</ul>
							<button id='backTop'>回到顶部</button>				
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Kind