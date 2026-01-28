import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import FromInput from '../../components/FromInput';
import SingleImageHeader from '../../components/SingleImageHeader';
import TextButton from '../../components/TextButton';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const navigation = useNavigation() as any;



    function renderBodyTop() {
        return (
            <View >

                <View
                    style={styles.bodyTopContainer}

                >

                    <FromInput
                        label="Current Password"
                        autocomplete="password"
                        containerStyle={styles.inputContainer}
                        inputContentStyle={styles.inputContent}

                        inputStyle={styles.input}
                        value={currentPassword}
                        onChange={(value: any) => {
                            setCurrentPassword(value);
                        }}
                    />

                    <FromInput
                        label="New Password"
                        containerStyle={styles.inputContainer}

                        autocomplete="password"
                        inputContentStyle={styles.inputContent}
                        height={50}
                        inputStyle={styles.input}
                        value={newPassword}
                        onChange={(value: any) => {
                            setNewPassword(value);
                        }}
                    />





                    <FromInput
                        label="Retype New Password"
                        containerStyle={styles.inputContainer}

                        autocomplete="password"
                        inputContentStyle={styles.inputContent}
                        height={50}
                        inputStyle={styles.input}
                        value={confirmPassword}
                        onChange={(value: any) => {
                            setConfirmPassword(value);
                        }}
                    />






                    <View style={styles.marginBottom20} />



                </View>


            </View>


        );
    }




    function renderFooter() {
        return (
            <View
                style={styles.footerContainer}

            >
                <TextButton

                    buttonContainerStyle={styles.buttonContainer}
                    label={'Change Password'}

                    onPress={() => {

                        navigation.navigate('Home');

                    }}


                />


            </View>


        );
    }




    return (
        <View
            style={styles.mainContainer}
        >


            <SingleImageHeader
                name={'Change Password'}

            />


            <ScrollView
                style={styles.scrollView}

            >

                {/* My Cards */}
                {renderBodyTop()}
                <View style={styles.marginBottom50} />



                {/* Add New Card */}
                {/* {renderComment()} */}





            </ScrollView>

            {renderFooter()}

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    bodyTopContainer: {
        paddingHorizontal: 10,
        marginTop: SIZES.base,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
    },
    inputContainer: {
        marginTop: 10,
    },
    inputContent: {
        paddingHorizontal: 0,
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    marginBottom20: {
        marginBottom: 20,
    },
    footerContainer: {
        paddingTop: SIZES.radius,
        paddingBottom: SIZES.padding,
        paddingHorizontal: SIZES.padding,
    },
    buttonContainer: {
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
    },
    scrollView: {
        flexGrow: 1,
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        paddingBottom: SIZES.radius,
    },
    marginBottom50: {
        marginBottom: 50,
    },
});

export default ChangePassword;
