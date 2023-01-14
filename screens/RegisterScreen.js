import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import {Input, Button, Text, Image} from 'react-native-elements'
import {auth} from '../firebase'
import { Assets } from '@react-navigation/stack'

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const signUp = () => {
    if (fullName && email && password) {
      setSubmitLoading(true)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          clearInputFields() &
            authUser.user.updateProfile({
              displayName: fullName,
              photoURL:
                imageUrl ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
            })
        })
        .catch((err) => alert(err.message) & setSubmitLoading(false))
    } else {
      alert('All fields are mandatory!')
      setSubmitLoading(false)
    }
  }
  const clearInputFields = () => {
    alert('Successfully Created your Account')
    navigation.replace('Home')
    setSubmitLoading(false)
    setFullName('')
    setEmail('')
    setPassword('')
    setImageUrl('')
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('../assets/logo.png')}
        style={{width: 500, height: 100, marginBottom: 20}}
      />
      <Text h4 style={{marginBottom: 50}}>
        Create an account for SpenDees
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          type='text'
          autoFocus
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <Input
          placeholder='Email'
          type='text'
          
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='text'
          
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder='Profile Picture Url (Optional)'
          type='text'
         
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={signUp}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title='Register'
        onPress={signUp}
        loading={submitLoading}
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#65BCBF',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
})
