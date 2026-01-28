import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {
    COLORS,
    SIZES,
} from '../../constants';

import React from 'react';


const FromInput = ({

    // containerStyle,
    // label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = 'default',
    // autoCompleteType = "off",
    autoCapitalize = 'none',
    // errorMsg = "",
    value = '',
    maxLength,
}: any) => {
    return (

        <View style={styles.container}>
            {prependComponent}

            <TextInput
                style={{
                    ...styles.input,
                    ...inputStyle,
                }}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={COLORS.gray}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                onChangeText={(text) => onChange(text)}
            />
            {appendComponent}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: SIZES.responsiveScreenWidth(11.5),
        marginTop: 15,
        borderRadius: 7,
        backgroundColor: COLORS.lightBlue2,
        width: SIZES.responsiveScreenWidth(90),
        alignItems: 'center',
        elevation: 1,
        marginHorizontal: 1,
    },
    input: {
        flex: 1,
        fontSize: SIZES.responsiveScreenFontSize(1.6),
        fontWeight: '700',
        marginLeft: 10,
        color: COLORS.primary,
    },
});

export default FromInput;
