import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import RealmController from '../Database/Realm';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        const name = RealmController.findSetting('user')[0].value;
        this.state = { name: name, password: '', error: '' };
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }

    onLoginPressed() {
        if(this.state.password.length > 0) {
            const password = RealmController.findSetting('password')[0].value;
            if (password === this.state.password) {
                this.setState({ error: '' });
                this.props.onLoginSuccess();
            }
            else {
                this.setState({ error: 'Incorrect Password' });
            }
        }
        else {
            this.setState({ error: 'You must enter a valid password' });
        }
    }

    render() {
        const welcomeText = 'Welcome ' + this.state.name;
        return(
            <View style={styles.containerStyle}>
                <Image source={require('../images/background.png')} style={styles.imageStyle}/>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/todo.png')} style={styles.logoStyle}/>
                    <Text style={styles.titleStyle}>Memento</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <Card>
                        <CardSection>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.welcomeTextStyle}>{welcomeText}</Text>
                            </View>
                        </CardSection>
                        <CardSection>
                            <Input
                                label = "Password"
                                placeholder= "******"
                                secureTextEntry
                                value = {this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </CardSection>
                        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                        <CardSection>
                            <Button onPress={this.onLoginPressed}>
                                <Icon name="login" style={{ fontSize: 16 }}/> Login
                            </Button>
                        </CardSection>
                    </Card>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        flex: 1,
        position: 'absolute'
    },
    titleStyle: {
        color: '#005cb8',
        fontWeight: 'bold',
        fontSize: 40,
        alignSelf: 'center'
    },
    logoStyle: {
        width: Dimensions.get('window').width/2.5,
        height: Dimensions.get('window').width/2.5,
    },
    errorTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red'
    },
    welcomeTextStyle: {
        color: '#007aff',
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'center'
    }
};

export default LoginForm;