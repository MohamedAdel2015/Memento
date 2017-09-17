import React from 'react';
import { Picker, Text, View, Platform } from 'react-native';

const PickerInput = ({ label, items, selectedValue, onValueChange }) => {

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.pickerLabelStyle}>{label}</Text>
            <Picker
                style={styles.pickerStyle}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                {items.map(value => <Picker.Item key={value} label={value} value={value} />)}
            </Picker>
        </View>
    );
};

const styles = {
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 10,
        flex: 1
    },
    containerStyle: {
        height: (Platform.OS === 'ios') ? 180 : 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        flex: 2
    }
};

export { PickerInput };