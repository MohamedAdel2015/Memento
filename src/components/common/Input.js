import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines, editable, onFocus }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    let height = 45;
    if (multiline) {
        height = 85;
    }
    return(
        <View style={{ ...containerStyle, height: height }}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                multiline={multiline}
                editable = {editable}
                numberOfLines={numberOfLines}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        flex: 5
    },
    labelStyle: {
        fontSize: 16,
        paddingLeft: 10,
        flex: 2
    },
    containerStyle: {
        height: 45,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };