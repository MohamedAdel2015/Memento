import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

class FloatingActionButton extends Component {

    render() {
        return(
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.containerStyle}
            >
                <Image source={require('../images/add.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    imageStyle: {
        width: Dimensions.get('window').width/6,
        height: Dimensions.get('window').width/6
    }
};

export default FloatingActionButton;