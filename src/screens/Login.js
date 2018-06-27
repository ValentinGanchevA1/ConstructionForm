import React, { Component } from 'react'
import firebase from 'react-native-firebase'

import {
    FlatList,
    Text,
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native'

class Login extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
        
          username: '',
          password:'',
          errorText:''
        };
    
        
      }

   

      signIn(){
          if(this.state.username === ''|| this.state.password === ''){
            this.setState({
                errorText: 'Fields cannot be blank'
            })
          }else{
          firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.username,this.state.password).then((value) => {
            console.log(value);
            
            }).catch((error) => {
            console.log(error);

            this.setState({
                errorText: 'Incorrect username or password'
            })

            })
        }
      }

    render(){
        return(
            <View style = {styles.container}>
             <Image style={styles.companyLogo} source={require('../screens/bird-construction-logo.png')}/>
             <TextInput autoCapitalize="none" style={styles.textInputName} onChangeText={(text)=>{this.setState({username:text})}} placeholder = "Username"></TextInput>
             <TextInput autoCapitalize="none" style={styles.textInputName} onChangeText={(text)=>{this.setState({password:text})}} placeholder = "Password"></TextInput>
             <Text style={styles.errorText}>{this.state.errorText}</Text>
             <TouchableOpacity onPress ={() => {this.signIn()}} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      padding: 5,
    },
    textInputName:{
        borderColor:'grey',
        borderWidth:1,
        width:300,
        marginVertical:10,
        padding:5
      },
      submitButton:{
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        backgroundColor:'#195942',
        width:80,
        height:30,
      },
      buttonText:{
        color:'white'
      },
  
  })
  
  export default Login