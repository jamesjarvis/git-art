import React, { Component } from 'react';

class GitContributionComponentMain extends Component {


    render(){
        function DoAllWall(props){
            return null;
        }
        return(
            <section className="section">
                <DoAllWall 
                    gitWall = {this.props.gitWall}                
                />
            </section>
        )
    }

}

class GitContributionComponentWallBox extends Component{
    render(){
        return(
            <div class="box"></div>
        );
    }
}

export default GitContributionComponentMain;