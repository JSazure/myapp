import React, {Component} from 'react'
import homeApi from '@/api/home.js'
import {Link} from 'react-router-dom'
import tool from '@/tool/index.js'
import store from '@/store/index.js'
import Loading from '@/uicom/loading.jsx'
import { Carousel, WingBlank ,SearchBar} from 'antd-mobile';



class Home extends Component {
  constructor (props) {
    super(props)
		this.state={
			isloading:'none',
			data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
			imgHeight: 176,
		}
  }
	componentDidMount () {
		this.setState({
			isLoading:'block'
		})
		homeApi.getList(data => {
			console.log(data)
			store.dispatch({
				type:'HOME_LIST',
				data
			})
			this.setState({
				isLoading:'none'
			})
		})
		tool.backTop()
	}
  goPage () {
    console.log(this.props.history)
    // this.props.history.push('/detail')
    this.props.history.push({
      pathname: '/detail/2',
//       state: {
//         flag: '/home'
//       }
    })
  }
  render () {
    
    return (
      <div className = 'main'>
        <header>
           <SearchBar placeholder="Search" maxLength={8} />
        </header>
        <div className = 'content'>
          <WingBlank>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
					
					
					
          {/* <button onClick={this.goPage.bind(this)}>去详情页面</button>  */} 
          <ul className = 'prolist'>
            {
              store.getState().homedata.homelist.map((item,index) => (
              <Link key={item.goodsID} to={'/detail/' + item.goodsID}>
                <li>
                	<img src={item.goodsListImg} />
                	<div className='proinfo'>
                		{item.goodsName}
						<p>价格:  {item.price}元  &nbsp;&nbsp;&nbsp;&nbsp;折扣:{item.discount}折</p>
                	</div>
                
                </li>
              
              </Link>
               
              ))
            }
          </ul>
					<button id='backTop'>回到顶部</button>
					<Loading display={this.state.isloading}/>
        </div>
      </div>
    )
  }
  
}

export default Home
