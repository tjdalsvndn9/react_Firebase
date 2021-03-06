import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAPI,pushAPI,removeAPI} from '../actions'
import {bindActionCreators} from 'redux';
 class App extends Component {
   constructor(props){
     super(props)
     this.state = {input1:'',input2:''};
     this.onSubmit = this.onSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.renderingDom = this.renderingDom.bind(this);

   }
   componentWillMount() {
    this.props.fetchAPI()
   }
   renderingDom(){
    return Object.values(this.props.users).map(value => {
      return (
        <div key={value.key}>
          <h3>{value.username}</h3>
          <p>{value.text}</p>
        <button onClick={this.removeText.bind(this,value)}>Remove</button>
        </div>
      )
    })
   }
   removeText(value){
     console.log(value)
     this.props.removeAPI(value)
   }
   handleChange(e){
     this.setState({[e.target.name]:e.target.value})
   }
   onSubmit(e){
     e.preventDefault();
     this.props.pushAPI(this.state.input1,this.state.input2)
     this.setState({input1:'',input2:''})
   }

  render() {
    if(!this.props.users){
      return <div>Loading...</div>
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <input
        placeholder='type username'
        value={this.state.input1}
        onChange={this.handleChange}
        name='input1'
        />
        <input
        placeholder='type'
        value={this.state.input2}
        onChange={this.handleChange}
        name='input2'
        />
        <button type='submit'>Click me</button>
      </form>
        <div>
          {this.renderingDom()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({users}) {
  return{users}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchAPI,pushAPI,removeAPI},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
