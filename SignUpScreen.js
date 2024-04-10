import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import app from './firebaseConfig';
import { validateEmail, validatePassword, validateName } from './utils/validation';

const SignUpScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const isValid =
        validateName(firstName) &&
        validateName(lastName) &&
        validateEmail(email) &&
        validatePassword(password) &&
        password === confirmPassword;

    const handleSignUp = async () => {
        if (!isValid) {
            Alert.alert('Validation Error', 'Please ensure all fields are filled correctly.');
            return;
        }
        setIsLoading(true);
        setError(null);
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        const db = getFirestore(app);
                        const userRef = doc(db, 'users', user.uid);
                        setDoc(userRef, {
                            firstName,
                            lastName,
                            email,
                        })
                            .then(() => {
                                Alert.alert('Verify Your Email', 'A verification link has been sent to your email. Please verify your account to log in.');
                                navigation.navigate('Welcome');
                            })
                            .catch((error) => {
                                setError('Failed to save user data. Please try again later.');
                                console.error('Firestore Error:', error);
                            });
                    })
                    .catch((error) => {
                        setError('Failed to send verification email. Please try again later.');
                        console.error('Email Verification Error:', error);
                    });
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('The email address is already in use by another account.');
                } else {
                    setError(error.message);
                }
                console.error('SignUp Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up to Trip Tracker</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#333333" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
                style={[styles.button, !isValid && styles.disabledButton]}
                onPress={handleSignUp}
                disabled={!isValid || isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    showPasswordButton: {
        padding: 10,
    },
    button: {
        backgroundColor: '#007bff',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    disabledButton: {
        backgroundColor: '#badcff',
    },
});

export default SignUpScreen;