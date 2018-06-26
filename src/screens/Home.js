import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
//import CheckBox from 'react-native-checkbox';
import { CheckBox } from 'react-native-elements'
import { Button } from 'react-native';

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

// import AppWithStore from './src/AppWithStore'
// import StatusBarSelect from './src/components/StatusBarSelect'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      juniorYouthGroups:{}
    };
  }

  componentDidMount(){
    console.disableYellowBox = true;

    firebase.database().ref('/update').push('WE DID IT')
  }

  render() {
  
    return (
      <ScrollView contentContainerStyle={{ alignItems : 'center'}} style={styles.container}>
      <Image style={styles.companyLogo} source={require('../screens/bird-construction-logo.png')}/>
      <Text style = {styles.interventionText}>Observation Program</Text>
      <View style ={styles.alignTopCheckBoxes}>
      <View style={styles.leftAlignCheckBoxes}>
        <CheckBox
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Hazard Identification'
            checked={true}
            onChange={(checked) => console.log('I am checked', checked)}
          />
        <CheckBox
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Near Miss'
            checked={true}
            onChange={(checked) => console.log('I am checked', checked)}
          />
        </View>
        <View style={styles.rightAlignCheckBoxes}>
        <CheckBox
          size={10}
          checkedIcon='check'
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkBoxTextStyle}
          title='Behaviour Observation'
          checked={true}
          onChange={(checked) => console.log('I am checked', checked)}
        />
       <CheckBox
          size={10}
          checkedIcon='check'
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkBoxTextStyle}
          title='Improvement Suggestion'
          checked={true}
          onChange={(checked) => console.log('I am checked', checked)}
        />
      </View>
  </View>

        <TextInput multiline = {true} placeholder = {'Name:'} style={styles.textInputName}></TextInput>
        <TextInput multiline = {true} placeholder = {'Location:'} style={styles.textInputName}></TextInput>
        <TextInput multiline = {true} placeholder = {'Date:'} style={styles.textInputName}></TextInput>
        <TextInput multiline = {true} placeholder = {'Description of Observation/Hazard Identification:'} style={styles.textInputName}></TextInput>
        <Text style = {styles.interventionText}>Intervention</Text>
        <View style={styles.checkBoxView}>

        <CheckBox
          size={10}
          checkedIcon='check'
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkBoxTextStyle}
          title='Completed'
          checked={false}
          onChange={(checked) => console.log('I am checked', checked)}
        />
       <CheckBox
          size={10}
          checkedIcon='check'
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkBoxTextStyle}
          title='Required'
          checked={true}
          onChange={(checked) => console.log('I am checked', checked)}
        />
         <CheckBox
          size={10}
          checkedIcon='check'
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkBoxTextStyle}
          title='Not Applicable'
          checked={true}
          onChange={(checked) => console.log('I am checked', checked)}
        />
        </View>
         <TextInput multiline = {true} style={styles.textInputMultiLine}></TextInput>
       {/* <TouchableOpacity>
        <Icon name="square"  borderWidth={4} borderColor="red"  size={30} />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.submitButton}>
      <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      <Text style = {styles.footerText}>Thank you for doing your part to maintain a safe work environment!</Text>
      
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    padding: 5,
    //flexDirection:'column',
    //alignItems:'center'
  },
  companyLogo:{
    //alignSelf:'flex-start',
    //marginLeft:15 
    marginBottom:10
  },
  buttonText:{
    //alignSelf:'center',
    color:'white'
  },
  submitButton:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    //borderColor:'red',
    backgroundColor:'#195942',
    width:80,
    height:30,
    //borderRadius:50
  },
  leftAlignCheckBoxes:{
    flexDirection:'column'
  },
  interventionText:{
    marginVertical:10,
    alignSelf:'center'
  },

  footerText:{
    marginTop:20,
    fontSize: 10
  },
  rightAlignCheckBoxes:{
    flexDirection:'column'
  },
  alignTopCheckBoxes:{
    flexDirection:'row'
  },
  checkBoxTextStyle:{
    fontSize:12
  },
  checkboxStyle:{
    backgroundColor:'white',
    marginVertical:5,
    padding:5,
    marginHorizontal:0,
    borderWidth:0
    //size:15
   // width:2,
   // width: 5,
    //color:'blue'
  },
  checkBoxView:{
    flexDirection:'row'
  },
  location:{
    fontSize:17
  },
  animators:{
    fontSize:15,
    color:'#8E8E93'
  },
  groupContainer:{
    borderBottomWidth:1,
    borderBottomColor: '#8E8E93',
    margin:5,
    paddingVertical:5
  },
  textInputName:{
    borderColor:'grey',
    borderWidth:1,
    width:300,
    //margin:20
    marginVertical:10
    //flex:1
  },
  textInputMultiLine:{
    borderColor:'grey',
    borderWidth:1,
    width:300,
    //margin:20
    marginVertical:10,
    //flex:1
    height:80
  }
})

export default Home