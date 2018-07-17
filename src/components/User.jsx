import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { DatePicker, List } from 'antd-mobile';


const CustomChildren = ({ extra, onClick, children }) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  >
    {children}
    <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  </div>
);
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class User extends Component{
	constructor(props){
		super(props)
		this. state = {
			date: now,
			time: now,
			
			dpValue: null,
			customChildValue: null,
			visible: false,
		  }
	}
	
	render(){
		var str =''
		if(localStorage.getItem('isLogin')==1){
			str=<div>欢迎您,{localStorage.getItem('userID')}</div>
		}else{
			str=<div>
				<Link to='/login'><button>登录</button></Link>
				<Link to='/register'><button>注册</button></Link>
			</div>
		}
		return(
			<div className='container'>
				<div className= 'main'>
					<header>
						用户头部
					</header>
					<div className='content'>
						{str}
						
					<DatePicker
					  value={this.state.date}
					  onChange={date => this.setState({ date })}
					>
					  <List.Item arrow="horizontal">Datetime</List.Item>
					</DatePicker>
						
					</div>
					
					
				</div>
				
			
			</div>
		)
	}
}
export default User