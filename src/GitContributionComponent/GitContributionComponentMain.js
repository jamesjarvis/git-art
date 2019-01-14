import React, { Component } from "react";
import moment from 'moment';
import {GitWallContext} from '../AppContext/GitWallContext';
//CSS
import './css/GitContribution.css';

class GitContributionComponentMain extends Component {

  componentDidMount(){
  }

  render() {

    return (
      <section className="section">
          <div className="box">
            <GitWallContext.Consumer>
              {
                (consumerProps)=>(
                  consumerProps.gitWallObject.walls.map(
                    (wallRow)=>{
                      return(
                        <div key={wallRow[0].date.format()+"-rowHeader" }className="columns">
                          {
                            wallRow.map(
                              (wallCol)=>{
                                return(
                                  <GitContributionComponentWallBox 
                                    key={wallCol.date.format()+"-col"}
                                    wallObject={wallCol}
                                  />
                                )
                              }
                            )
                          }
      
                        </div>
                      );
                    }
                  )   
                )
              }
            </GitWallContext.Consumer>

          </div>
      </section>
    );
  }
}

class GitContributionComponentWallBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      contentHeight:0,
      onHover:false,
      tooltipY:0,
      tooltipX:0,
    };
    console.log("CREATING!");
  }
  componentDidMount(){
    const width = this.divElement.clientWidth;
    window.addEventListener("resize", this.handleResize);
    //console.log(`Component size h: ${height}, w: ${width}`);
    this.setState({
      contentHeight:width,
    });
  }

  componentWillMount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = e => {
    const width = this.divElement.clientWidth;
    this.setState({
      contentHeight:width,
    })
  };

  render() {
    let tooltipStyle = {};
    if(this.state.onHover){
      let leftOffset = 60;
      if(window.innerWidth - this.state.tooltipX <= 180){
        leftOffset = 200;
      }
      if(this.state.tooltipX < 55){
        leftOffset = 30;
      }
      tooltipStyle={
        left:`${this.state.tooltipX- leftOffset}px`,
        top: `${this.state.tooltipY-45}px`,
        zIndex: 1
      }
    }

    return (
      <div className="column column-custom-padding">
        <div 
          className = {this.props.wallObject.getClassName()}
          ref={ (divElement) => this.divElement = divElement}
          style={{height:this.state.contentHeight}}
          onMouseEnter = {(e)=>{
            if(this.props.wallObject.date > moment()){
              return null;
            }
            // console.log(this.props.wallObject);
            // console.log(`x: ${e.screenX}, y: ${e.screenY}`);
            this.setState({
              onHover:true,
              tooltipY:e.clientY,
              tooltipX:e.clientX,
            })
          }}
          onMouseMove = {
            (e)=>{
              if(this.props.wallObject.date > moment()){
                return null;
              }
              this.setState({
                tooltipY:e.clientY,
                tooltipX:e.clientX,
              })
            }
          }
          onMouseLeave = {
            ()=>{
              if(this.props.wallObject.date > moment()){
                return null;
              }
              this.setState({
                onHover:false,
              });
            }
          }
        >
          <div className="tooltip" hidden={!this.state.onHover} 
          style={tooltipStyle}>
            Contributions on {this.props.wallObject.date.format('MMM D, YYYY')}
          </div>
        </div>
        
      </div>
    );
  }
}

export default GitContributionComponentMain;
