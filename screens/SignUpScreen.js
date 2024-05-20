import React from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import { useState } from 'react';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = () => {
        if (EMAIL_REGEX.test(email)) {
          navigation.navigate('SignIn');
        } else {
          setEmailError(true);
        }
      };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/SignUp.png')} style={styles.backgroundImage}>

              
              <View style={styles.titleContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>CARBY</Text>
                </View>
              </View>

                
                <KeyboardAvoidingView style={styles.inputContainer}behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  <View style={styles.inputsContainer}>
                      <View style={styles.inputWrapper}>
                          <Text style={styles.label}>Nom d'utilisateur</Text>
                          <TextInput style={styles.input}/>
                      </View>

                      <View style={styles.inputWrapper}>
                          <Text style={styles.label}>Email</Text>
                          <TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoComplete="email" onChangeText={(value) => setEmail(value)} value={email}/>
                          {emailError && <Text style={styles.error}>Invalid email address</Text>}
                      </View>

                      <View style={styles.inputWrapper}>
                          <Text style={styles.label}>Mot de passe</Text>
                          <TextInput style={styles.input} secureTextEntry/>
                      </View>
                  </View>
                </KeyboardAvoidingView>
                
                
                <View style={styles.btn1Flex}>
                  <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                      <Text style={styles.btnText}>C'est parti !</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.btn2Flex}>
                <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.btnText2}>J'ai déjà un compte</Text>
                </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: '45%',
        marginRight: '60%',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: 'black',
    },
    inputContainer: {
        flex: 5,
        justifyContent: 'center',
        width: '80%',
        borderRadius: 10,
        padding: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    inputsContainer: {
      marginTop: '30%',
    },
    inputWrapper: {
        marginBottom: 15,
    },
    label: {
        fontSize: 12,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
    },
    input: {
        height: 35,
        width: '100%',
        marginBottom: 1,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#FFDF3F',
    },
    btn1Flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white',
        width: '100%',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F5FFF',
        width: '30%',
        height: '60%',
        marginBottom: '5%',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },
    btn2Flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'grey',
        width: '100%',
    },
    btn2: {
        marginBottom: '10%',
        marginLeft: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText2: {
        color: 'black',
        fontSize: 12,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    error: {
        marginTop: 10,
        color: 'red',
      },
});
