import React, { Component } from 'react';
import App from './App';
import { MenuContext } from 'react-native-popup-menu';

class Main extends Component {
    render() {
        return(
            <MenuContext>
                <App navigation={this.props.navigation}/>
            </MenuContext>
        );
    }
}

Main.router = App.router;

export default Main;