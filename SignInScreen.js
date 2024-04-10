import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebaseConfig';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchRememberedUser = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('rememberedEmail');
                const storedPassword = await AsyncStorage.getItem('rememberedPassword');
                if (storedEmail && storedPassword) {
                    setEmail(storedEmail);
                    setPassword(storedPassword);
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Error retrieving remembered user:', error);
            }
        };

        fetchRememberedUser();
    }, []);

    const handleRememberMe = async (email, password) => {
        try {
            if (rememberMe) {
                await AsyncStorage.setItem('rememberedEmail', email);
                await AsyncStorage.setItem('rememberedPassword', password);
            } else {
                await AsyncStorage.removeItem('rememberedEmail');
                await AsyncStorage.removeItem('rememberedPassword');
            }
        } catch (error) {
            console.error('Error storing remembered user:', error);
        }
    };

    const isValid = email.length > 0 && password.length >= 6;

    const handleSignIn = async () => {
        if (!isValid) {
            Alert.alert('Invalid Input', 'Please enter a valid email and a password with at least 6 characters.');
            return;
        }
        setIsLoading(true);
        setError(null);
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user.emailVerified) {
                    handleRememberMe(email, password);
                    navigation.navigate('Dashboard');
                } else {
                    Alert.alert("Email Verification Required", "Please verify your email before signing in.");
                }
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setError('Invalid email format. Please enter a valid email.');
                        break;
                    case 'auth/user-disabled':
                        setError('This account has been disabled. Please contact support.');
                        break;
                    case 'auth/user-not-found':
                        setError('No user found with this email. Please sign up first.');
                        break;
                    case 'auth/wrong-password':
                        setError('Incorrect password. Please try again.');
                        break;
                    case 'auth/invalid-credential':
                        setError('Invalid credentials. Please make sure you are using the correct sign-in method.');
                        break;
                    case 'auth/operation-not-allowed':
                        setError('Sign-in with email and password is not enabled. Please contact support.');
                        break;
                    case 'auth/too-many-requests':
                        setError('Too many unsuccessful login attempts. Please try again later or reset your password.');
                        break;
                    default:
                        setError('An error occurred. Please try again.');
                        console.error('SignIn Error:', error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trip Tracker Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
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
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconContainer}
                >
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                    style={styles.rememberMeButton}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <Ionicons
                        name={rememberMe ? 'checkbox' : 'square-outline'}
                        size={24}
                        color={rememberMe ? '#007bff' : '#ccc'}
                    />
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
                style={[styles.button, !isValid && styles.disabledButton]}
                onPress={handleSignIn}
                disabled={!isValid || isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                )}
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpButton}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
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
        padding: 10,
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
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeButton: {
        marginRight: 10,
    },
    rememberMeText: {
        fontSize: 16,
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
    disabledButton: {
        backgroundColor: '#badcff',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 16,
        marginRight: 5,
    },
    signUpButton: {
        fontSize: 16,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default SignInScreen;