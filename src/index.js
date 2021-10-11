import React from "react";
import ReactDOM from 'react-dom';
import { Row, Col,Image,Modal } from 'antd';

import 'antd/dist/antd.css';
import './style.css';

// import ybbImg from './img/ybb.jpg'
import ybbShark from './img/ybb_shark.jpg'
import levelOfXianMp3 from './mp3/我真的怀疑有些人闲的程度啊.mp3'
import ybbMp3 from './mp3/ybb.mp3'



var ybb=new Audio(ybbMp3)
var levelOfXian=new Audio(levelOfXianMp3)
var ybbloop=null

const PercentileDistance=(elem,mouseX,mouseY)=>{
  return Math.abs(Math.pow(mouseX-(elem.left+elem.width/2),2)+Math.pow(mouseY-(elem.top+elem.height/2),2))/(Math.pow(window.innerWidth,2)+Math.pow(window.innerHeight,2))
}

const ybbLoader=(event) =>{
  var nana7mi =document.getElementById("yourImg").getBoundingClientRect();
  var distance_t=1-2*PercentileDistance(nana7mi,event.clientX,event.clientY)
  ybb.volume=Math.abs(distance_t)<1?Math.abs(distance_t):1;
}



const SuitableRange=()=>{
  var kRange=Math.random();
  if(kRange<0.05){
    kRange+=0.1
  }else if(kRange>0.89){
    kRange-=0.1
  }
  return kRange
}

const ybbPath=()=>{
  var nana7mi=document.getElementById("yourImg")
  nana7mi.style.position="absolute"
  nana7mi.style.left=(window.innerWidth*SuitableRange())+"px";
  nana7mi.style.top=(window.innerHeight*SuitableRange())+"px";
}

class Welcom extends React.Component{
    render(){
      return (
        <>
        <Row>
          <Col span={24} >
            <p style={{"fontSize":"20px"}}>
            welcome to 七海nana7mi's room<br/>
            can you find the invisible ybb nana7mi?
            </p>
          </Col>
        </Row>
        </>
      )
    }
}

class Finded extends React.Component{
  render(){
    return(
      <div style={{"minWidth":"200px"}}>
        <Row>
          <Col span={24} offset={6}>
          <p style={{"fontSize":"20px"}}>
              you find ybb!
          </p>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={6}>
          <Image 
            width={100}
            height={100}
            alt={"ybb!"}
            preview={false}
            src={ybbShark}
            />
            </Col>
        </Row>
      </div>
    )
  }
}

class Ybb extends React.Component{
  
  componentDidMount(){
    
    ybbPath()
    // console.log(nana7mi.style)
    ybbloop=setInterval(()=>{
      ybb.play();
    },1)
    window.addEventListener('mousemove',ybbLoader)
  }
  
  componentWillUnmount(){
    window.removeEventListener('mousemove',ybbLoader)
  }

  render(){
    return(
      <div>
        <div id={'yourImg'}></div>
      </div>
    )
  }
}

class Game extends React.Component{
  constructor(props){
    super(props)
    this.hasClickWelcome=this.hasClickWelcome.bind(this)
    this.hasFindYbb=this.hasFindYbb.bind(this)
    this.playAgain=this.playAgain.bind(this)
    this.state={
      welcomPage:false,
      isFinded:false
    }
  }
  
  hasClickWelcome(){
    this.setState({
      welcomPage:true
    })
  }

  hasFindYbb(){
    var ybb_cp=document.getElementById("yourImg");
    ybb_cp.style.opacity="1.0";
    ybb_cp.style.width="10%";
    clearInterval(ybbloop);
    this.setState({
      isFinded:true
    })
    levelOfXian.play();
    
  }

  playAgain(){
    this.setState({
      isFinded:false
    })
    var ybb_cp=document.getElementById("yourImg");
    ybb_cp.style.opacity="0.0";
    ybb_cp.style.width="80px"; 
    ybbPath()
    ybbloop=setInterval(()=>{
      ybb.play();
    },10)
    
  }



  render(){
    const welcomPage=this.state.welcomPage
    const isFinded=this.state.isFinded
    if(welcomPage){
      return (
        <div>
          {isFinded&&
          <Modal 
          visible={true} 
          centered={true}
          onOk={this.playAgain}
          okText={"Play again!"}
          cancelText={"ybb!"}
          closable={false}
          cancelButtonProps={{ disabled: true }}
          width={"max-content"}
          >
            <Finded/>
          </Modal>
          }
          <div onMouseOver={this.hasFindYbb}>
              <Ybb />
          </div>
        </div>
      )
    }else{
      // 欢迎页面
      return (
      <>
      <Modal 
      visible={true} 
      centered={true}
      onOk={this.hasClickWelcome}
      okText={"Play!"}
      cancelText={"ybb!"}
      closable={false}
      cancelButtonProps={{ disabled: true }}
      keyboard={false}
      width={"max-content"}
      >
      <Welcom />
      </Modal>
      </>
      )
    }
  }
  

}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

