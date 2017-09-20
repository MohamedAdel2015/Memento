import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, Dimensions, ScrollView } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { NavigationActions } from 'react-navigation';
import RealmController from '../Database/Realm';

class ReminderForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            value: '',
            isEdit: false
        };
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentWillMount() {
        let name = '', value = '', isEdit = false;
        const { params } = this.props.navigation.state;
        console.log("Params ", params);
        if (params) {
            if (params.item) {
                name = params.item.name;
                value = params.item.value;
                isEdit = true;
                this.setState({ name, value, isEdit });
            }
        }
    }

    onButtonPress() {
        if (this.state.name.length > 0 && this.state.value.length > 0) {
            if (this.state.isEdit) {
                const { item } = this.props.navigation.state.params;
                let newItem = { key: item.key, name: this.state.name, value: this.state.value };
                RealmController.updateReminder(newItem);
            }
            else {
                RealmController.createReminder({name: this.state.name, value: this.state.value});
            }
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Reminders', params: {activeTab: 'CurrentTasks'}})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
        else if (this.state.name.length === 0) {
            ToastAndroid.show("You Must Enter a Valid Name", ToastAndroid.SHORT);
        }
        else if (this.state.value.length === 0) {
            ToastAndroid.show("You Must Enter a Valid Value", ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Image source={require('../images/background.png')} style={styles.imageStyle}/>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/todo.png')} style={styles.logoStyle}/>
                    <Text style={styles.titleStyle}>Memento</Text>
                </View>
                <View style={{ flex: 7 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Card>
                                <CardSection>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.welcomeTextStyle}>
                                            {this.state.isEdit ? "Edit Forgettable Thing" : "Add Your Forgettable Things"}
                                        </Text>
                                        <Text style={styles.secureTextStyle}>
                                            Completely Secure (All Data Saved Locally)
                                        </Text>
                                    </View>
                                </CardSection>

                                <CardSection>
                                    <Input
                                        label="Name"
                                        placeholder="Name of the Thing"
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({ name: text })}
                                    />
                                </CardSection>

                                <CardSection>
                                    <Input
                                        label="Value"
                                        placeholder="Value to Remember"
                                        value={this.state.value}
                                        onChangeText={(text) => this.setState({ value: text })}
                                    />
                                </CardSection>

                                <CardSection>
                                    <Button onPress={this.onButtonPress}>
                                        {this.state.isEdit ? "Edit Thing" : "Add Thing"}
                                    </Button>
                                </CardSection>
                            </Card>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        flex: 1,
        position: 'absolute'
    },
    titleStyle: {
        color: '#005cb8',
        fontSize: 40,
        alignSelf: 'center'
    },
    logoStyle: {
        width: Dimensions.get('window').width/5,
        height: Dimensions.get('window').width/5,
        marginRight: 5
    },
    welcomeTextStyle: {
        fontSize: 18,
        color: '#005cb8',
        alignSelf: 'center',
        margin: 5,
        fontWeight: 'bold'
    },
    secureTextStyle: {
        fontSize: 14,
        color: '#ff001a',
        alignSelf: 'center',
        margin: 5
    }
};

export default ReminderForm;


