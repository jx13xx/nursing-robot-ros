import React,  {Component} from 'react';
import {Button} from 'react-bootstrap';
import Connection from "./Connection";

class Home extends Component{
    state = {
        counter: 1,
    };

    // increment_counter() {
    //     // this.state.counter = this.state.counter +1;
    //     this.setState({ counter: this.state.counter + 1});
    //     console.log(this.state.counter);
    // }
    render(){
        return (
            <main>
               <h1 className="text-center mt-3">Nursing Robot Control Page</h1>

                <Connection />
            </main>

        );
    }


}

export default Home;