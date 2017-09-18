import React, { Component } from 'react';
import { Text, View, ToastAndroid, Dimensions, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Card, CardSection, Input, Button } from './common';
import { NavigationActions } from 'react-navigation';
import CheckBox from 'react-native-checkbox';
import RealmController from '../Database/Realm';

class TaskForm extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            date: new Date(),
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            hasDeadline: false,
            notifyMe: false
        };
        this.onButtonPress = this.onButtonPress.bind(this);
        this.handleDatePicked = this.handleDatePicked.bind(this);
        this.handleTimePicked = this.handleTimePicked.bind(this);
        this.onCheckboxStateChanged = this.onCheckboxStateChanged.bind(this);
        this.renderDateTimeText = this.renderDateTimeText.bind(this);
    }

    handleDatePicked(date) {
        this.setState({ date, isDatePickerVisible: false, isTimePickerVisible: true });
    }

    handleTimePicked(date){
        this.setState({ date, isDatePickerVisible: false, isTimePickerVisible: false });
    }

    onButtonPress() {
        if (this.state.title.length > 0) {
            if (this.state.hasDeadline) {
                RealmController.createTask({
                    title: this.state.title,
                    description: this.state.description,
                    taskDate: this.state.date
                });
            }
            else {
                RealmController.createTask({
                    title: this.state.title,
                    description: this.state.description
                });
            }
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Main'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
        else {
            ToastAndroid.show("You Must Enter a Valid Task Title", ToastAndroid.SHORT);
        }
    }

    onCheckboxStateChanged(checked) {
        if(!checked) {
            this.setState({ hasDeadline: !checked, isDatePickerVisible: true });
        }
        else {
            this.setState({ hasDeadline: !checked });
        }
    }

    renderDateTimeText() {
        if(this.state.hasDeadline) {
            return(
                <View>
                    <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true })}>
                        <CardSection>
                            <Input
                                label="Reminder Time"
                                placeholder="Time"
                                multiline={true}
                                numberOfLines = {2}
                                editable = {false}
                                value={this.state.date.toString()}
                            />
                        </CardSection>
                    </TouchableOpacity>
                    <CardSection>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <CheckBox
                                label='Notify Me At Reminder Time'
                                checked={this.state.notifyMe}
                                onChange={(checked) => this.setState({ notifyMe: !checked })}
                            />
                        </View>
                    </CardSection>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Image source={require('../images/background.png')} style={styles.imageStyle}/>

                <View style={{ flex: 1, marginTop: 5 }}>
                    <Card>
                        <CardSection>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.welcomeTextStyle}>
                                    Add Task
                                </Text>
                            </View>
                        </CardSection>

                        <CardSection>
                            <Input
                                label="Title"
                                placeholder="Task Title"
                                value={this.state.title}
                                onChangeText={(text) => this.setState({ title: text })}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                multiline={true}
                                numberOfLines = {3}
                                editable = {true}
                                label="Description"
                                placeholder="Task Description"
                                value={this.state.description}
                                onChangeText={(text) => this.setState({ description: text })}
                            />
                        </CardSection>

                        <CardSection>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <CheckBox
                                    label='Add Reminder Time for The Task'
                                    checked={this.state.hasDeadline}
                                    onChange={(checked) => this.onCheckboxStateChanged(checked)}
                                />
                            </View>
                        </CardSection>

                        {this.renderDateTimeText()}

                        <CardSection>
                            <Button onPress={this.onButtonPress}>
                                Add Task
                            </Button>
                        </CardSection>
                    </Card>
                </View>
                <DateTimePicker
                    date={this.state.date}
                    isVisible={this.state.isDatePickerVisible}
                    is24Hour={false}
                    mode={'date'}
                    onConfirm={this.handleDatePicked}
                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                />
                <DateTimePicker
                    date={this.state.date}
                    isVisible={this.state.isTimePickerVisible}
                    is24Hour={false}
                    mode={'time'}
                    onConfirm={this.handleTimePicked}
                    onCancel={() => this.setState({ isTimePickerVisible: false })}
                />
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
        width: Dimensions.get('window').width/3,
        height: Dimensions.get('window').width/3,
    },
    welcomeTextStyle: {
        fontSize: 18,
        color: '#005cb8',
        alignSelf: 'center',
        margin: 5,
        fontWeight: 'bold'
    }
};

export default TaskForm;


