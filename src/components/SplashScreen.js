import React, { Component } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';

class SplashScreen extends Component {
    state = {
        show: true
    };

    componentDidMount() {
        let time = this.props.delay || 3;
        time = time * 1000;
        setTimeout(() => {
            this.setState({show: false})
        }, time)
    }

    render() {
        if (this.state.show) {
            return (
                <View style={styles.containerStyle}>
                    <Image source={this.props.img} style={styles.imageStyle}/>
                    <Image source={this.props.logo} style={styles.logoStyle}/>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.containerStyle}>
                    {this.props.children}
                </View>
            );
        }

    }
}
const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        flex: 1,
        position: 'absolute'
    },
    logoStyle: {
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').width/2
    },
    titleStyle: {
        color: '#005cb8',
        fontSize: 50,
        fontWeight: 'bold'
    }
};

export default SplashScreen;
