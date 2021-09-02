import React, {Component} from React

import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
class Sample extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                 <Route path="/" render={
                     ()=>{
                         return ( <h1>Welcome Home</h1>);
                     }
                 }/>   
                </div>
            </Router>
        );
    }
}

export default Sample;