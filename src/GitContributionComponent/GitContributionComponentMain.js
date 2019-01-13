import React, { Component } from "react";
import {GitWallContext} from '../AppContext/GitWallContext';
import moment from 'moment';

//CSS
import './css/GitContribution.css';

class GitContributionComponentMain extends Component {

  componentDidMount(){
    console.log(this.context);
  }

  render() {

    return (
      <section className="section">
          <div className="box">

            {this.context.gitWall.walls.map(
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
            )}
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
      console.log(this.state.tooltipX );
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
      console.log(tooltipStyle);
    }
    function getClassName(date){
      let today = moment();
      if(date > today){
        return 'wall';
      }
      return "has-background-grey-lighter wall";
    }
    return (
      <div className="column column-custom-padding">
        <div 
          className =   {getClassName(this.props.wallObject.date)}
          ref={ (divElement) => this.divElement = divElement}
          style={{height:this.state.contentHeight}}
          onMouseEnter = {(e)=>{
            if(this.props.wallObject.date > moment()){
              return null;
            }
            console.log(this.props.wallObject);
            console.log(`x: ${e.screenX}, y: ${e.screenY}`);
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

GitContributionComponentMain.contextType = GitWallContext;

export default GitContributionComponentMain;
