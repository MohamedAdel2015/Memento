import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import RealmController from '../Database/Realm';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', password: '', confirmPassword: '', error: '', current: 'user' };
        this.renderForm = this.renderForm.bind(this);
        this.onContinuePressed = this.onContinuePressed.bind(this);
        this.onRegisterPressed = this.onRegisterPressed.bind(this);
    }

    onContinuePressed() {
        if (this.state.name.length > 0) {
            RealmController.createSetting({key: 'user', value: this.state.name});
            this.setState({ current: 'password' });
        }
        else {
            this.setState({ error: 'You must enter a valid name' });
        }
    }

    onRegisterPressed() {
        if(this.state.password.length > 0) {
            if (this.state.password === this.state.confirmPassword) {
                this.setState({error: ''});
                RealmController.createSetting({key: 'password', value: this.state.password});
                this.props.onLoginSuccess();
            }
            else {
                this.setState({ confirmPassword: '', error: 'Passwords Don\'t Match, Please Try Again' });
            }
        }
        else {
            this.setState({ error: 'You must enter a valid password' });
        }
    }

    renderForm() {
        if (this.state.current === 'user') {
            return(
                <Card>
                    <CardSection>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.welcomeTextStyle}>Welcome to Memento</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        <Input
                            label = "Your Name"
                            placeholder= "Please Enter Your Name"
                            value = {this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />
                    </CardSection>
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    <CardSection>
                        <Button onPress={this.onContinuePressed}>Continue</Button>
                    </CardSection>
                </Card>
            );
        }
        if (this.state.current === 'password') {
            const welcomeText = 'Welcome ' + this.state.name;
            return(
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
                  <CardSection>
                      <Input
                          label = "Confirm Password"
                          placeholder= "******"
                          secureTextEntry
                          value = {this.state.confirmPassword}
                          onChangeText={confirmPassword => this.setState({ confirmPassword })}
                      />
                  </CardSection>
                  <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                  <CardSection>
                      <Button onPress={this.onRegisterPressed}>Register</Button>
                  </CardSection>
              </Card>
            );
        }
    }

    render() {
        return(
            <View style={styles.containerStyle}>
                <Image source={require('../images/background.png')} style={styles.imageStyle}/>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/todo.png')} style={styles.logoStyle}/>
                    <Text style={styles.titleStyle}>Memento</Text>
                </View>
                <View style={{ flex: 4 }}>
                    {this.renderForm()}
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
        fontSize: 40,
        fontWeight: 'bold',
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
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
};

export default SignUpForm;