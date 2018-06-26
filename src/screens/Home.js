import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-modal-datetime-picker'

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

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible:false,
      name:'',
      location:'',
      date:'',
      observationDescription:'',
      interventionDescription:'',
      juniorYouthGroups:{},
      
      observationProgram: {HazardIdentification: false, BehaviourObservation:false, NearMiss: false, ImprovementSuggestion: false},
      intervention:{Completed:false, Required: false, NotApplicable: false},
      finalCheckboxes:["Access/Egress/Walkways", "Attention to Task", "Barricades", "Confined Space", "Defective Equipment", "Energy Isolation",
                        "Environmental", "Ergonomics", "Equipment & Tools", "Excavation", "Falling Objects", "Fire Hazard", "Ground Surface/Condition",
                        "Housekeeping", "Ladders/Plartforms,Scaffolds", "Lighting", "Line of Fire", "Mobile Equipment/Vehicles", "Pinch Points",
                      "PPE Use", "Rigging", "Signage", "Spill Containment", "Working At Heights" ],

        finalCheckboxIndexes:[]
    };

    
  }

  componentDidMount(){

  }

  checkOrUncheckObservationProgramBoxes(checkedValue, setOfCheckBoxes, type){
    let checkBoxes = setOfCheckBoxes
    
    if(checkBoxes[checkedValue] === true){
      checkBoxes[checkedValue] = false
      this.setState({
        [type]: checkBoxes
      })
    }else{
      checkBoxes[checkedValue] = true
      for(i in checkBoxes){
        if(i != checkedValue){
          checkBoxes[i] = false
        }
      }

      this.setState({
        [type]: checkBoxes
      })

    }
  }

  checkOrUncheckFinalCheckBoxes(index){
    let checkBoxes = this.state.finalCheckboxIndexes

    if(checkBoxes.indexOf(index) > -1){
      let indexToRemove = checkBoxes.indexOf(index)
      checkBoxes.splice(indexToRemove,1)
      
    }else{
      checkBoxes.push(index)
    }
    this.setState({
      finalCheckboxIndexes:checkBoxes
    })
  }

  displayFinalCheckboxes(){
    let arrayOfCheckboxes=[]

    arrayOfCheckboxes = this.state.finalCheckboxes.map((value, index) => {
      
      if(this.state.finalCheckboxIndexes.length > 0 && this.state.finalCheckboxIndexes.indexOf(index) > -1){
        return(
          <CheckBox
            key={index}
            onPress={() => this.checkOrUncheckFinalCheckBoxes(index)}
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title= {value}
            checked={true}
            onChange={(checked) => (this.checkOrUncheckObservationProgramBoxes('HazardIdentification'))}
          />
        )
      }else
      return(
        <CheckBox
          key={index}
          onPress={()=>this.checkOrUncheckFinalCheckBoxes(index)}
          size={10}
          checkedIcon='check'
          containerStyle={styles.checkboxStyle}
          textStyle={styles.checkBoxTextStyle}
          title= {value}
          checked={false}
          onChange={(checked) => (this.checkOrUncheckObservationProgramBoxes('HazardIdentification'))}
        />
      )
    })

    return  arrayOfCheckboxes
  }

  sendDataToDb(){
    let observationType = ''
    let interventionType= ''
    let finalCheckBoxList = []
    let date

    for(i in this.state.observationProgram){
      if(this.state.observationProgram[i]){

        switch (i) {
          case "HazardIdentification":
              observationType = "Hazard Identification"
            break;
        
          case "BehaviourObservation":
              observationType = "Behaviour Observation"
            break;

            case "NearMiss":
              observationType = "Near Miss"
            break;

            case "ImprovementSuggestion":
              observationType = "Improvement Suggestion"
            break;

            default:
            break;
        }
      }
    }

    for(i in this.state.intervention){
      if(this.state.intervention[i]){
        interventionType = i
      }
    }
    

    for(let i = 0; i < this.state.finalCheckboxIndexes.length; i++){
      
      finalCheckBoxList.push(this.state.finalCheckboxes[this.state.finalCheckboxIndexes[i]])
    }

    if(observationType != '' && this.state.name != '' &&  this.state.location != '' && this.state.date != '' && this.state.observationDescription != '' && 
       interventionType != '' && this.state.interventionDescription !== '' && finalCheckBoxList.length > 0){

        firebase.database().ref('/update').push({observationType:observationType, name: this.state.name, location: this.state.location,
          date: this.state.date, observationDescription:this.state.observationDescription,
         interventionType: interventionType, interventionDescription: this.state.interventionDescription, 
         interventionChecks: finalCheckBoxList})

         this.setState({
          isDatePickerVisible:false,
          name:'',
          location:'',
          date:'',
          observationDescription:'',
          interventionDescription:'',
          juniorYouthGroups:{},
          
          observationProgram: {HazardIdentification: false, BehaviourObservation:false, NearMiss: false, ImprovementSuggestion: false},
          intervention:{Completed:false, Required: false, NotApplicable: false},
          finalCheckboxes:["Access/Egress/Walkways", "Attention to Task", "Barricades", "Confined Space", "Defective Equipment", "Energy Isolation",
                            "Environmental", "Ergonomics", "Equipment & Tools", "Excavation", "Falling Objects", "Fire Hazard", "Ground Surface/Condition",
                            "Housekeeping", "Ladders/Plartforms,Scaffolds", "Lighting", "Line of Fire", "Mobile Equipment/Vehicles", "Pinch Points",
                          "PPE Use", "Rigging", "Signage", "Spill Containment", "Working At Heights" ],
    
            finalCheckboxIndexes:[]
         })

    }
    

  }

  render() {
  
    return (
      <ScrollView contentContainerStyle={{ alignItems : 'center'}} style={styles.container}>
        <Image style={styles.companyLogo} source={require('../screens/bird-construction-logo.png')}/>
        <Text style = {styles.interventionText}>Observation Program</Text>
        <View style ={styles.alignTopCheckBoxes}>
        <View style={styles.leftAlignCheckBoxes}>
          <CheckBox
              onPress={()=>this.checkOrUncheckObservationProgramBoxes('HazardIdentification',this.state.observationProgram,'observationProgram')}
              size={10}
              checkedIcon='check'
              containerStyle={styles.checkboxStyle}
              textStyle={styles.checkBoxTextStyle}
              title='Hazard Identification'
              checked={this.state.observationProgram.HazardIdentification}
              onChange={(checked) => (this.checkOrUncheckObservationProgramBoxes('HazardIdentification'))}
            />
          <CheckBox
              onPress={()=>this.checkOrUncheckObservationProgramBoxes('NearMiss', this.state.observationProgram,'observationProgram')}
              size={10}
              checkedIcon='check'
              containerStyle={styles.checkboxStyle}
              textStyle={styles.checkBoxTextStyle}
              title='Near Miss'
              checked={this.state.observationProgram.NearMiss}
              onChange={(checked) => this.checkOrUncheckObservationProgramBoxes('NearMiss',this.state.observationProgram)}
            />
          </View>
          <View style={styles.rightAlignCheckBoxes}>
          <CheckBox
            onPress={()=>this.checkOrUncheckObservationProgramBoxes('BehaviourObservation', this.state.observationProgram, 'observationProgram')}
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Behaviour Observation'
            checked={this.state.observationProgram.BehaviourObservation}
            onChange={(checked) => this.checkOrUncheckObservationProgramBoxes('BehaviourObservation',this.state.observationProgram)}
          />
        <CheckBox
            onPress={() =>this.props.navigation.navigate("Report")} //this.checkOrUncheckObservationProgramBoxes('ImprovementSuggestion',this.state.observationProgram, 'observationProgram')}
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Improvement Suggestion'
            checked={this.state.observationProgram.ImprovementSuggestion}
            onChange={(checked) => this.checkOrUncheckObservationProgramBoxes('ImprovementSuggestion')}
          />
        </View>
    </View>

          <TextInput value = {this.state.name} onChangeText={(text)=>{this.setState({name:text})}} multiline = {true} placeholder = {'Name:'} style={styles.textInputName}></TextInput>
          <TextInput value = {this.state.location} onChangeText={(text)=>{this.setState({location:text})}} multiline = {true} placeholder = {'Location:'} style={styles.textInputName}></TextInput>
          <TouchableOpacity onPress={() => {this.setState({isDatePickerVisible:true})}} style={styles.submitButton}>
           <Text style={styles.buttonText}>Select Date</Text>
          </TouchableOpacity>
          <DatePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={(date) => this.setState({date:date, isDatePickerVisible: false})
                }
                onCancel={() => this.setState({isDatePickerVisible: false})}
                titleIOS='Select your birthday'
              />
          <TextInput editable={false} placeholder = "Date" style={styles.textInputName}>{this.state.date.toString().split(" ").slice(0, 4).join(" ")}</TextInput>
          {/* <TextInput onFocus={()=>this.setState({isDatePickerVisible:true})} onChangeText={(text)=>{this.setState({date:text})}} multiline = {true} placeholder = {'Date: Month/Day/Year'} style={styles.textInputName}></TextInput> */}
          <TextInput value = {this.state.observationDescription} onChangeText={(text)=>{this.setState({observationDescription:text})}} multiline = {true} placeholder = {'Description of Observation/Hazard Identification:'} style={styles.textInputName}></TextInput>
          <Text style = {styles.interventionText}>Intervention</Text>
          <View style={styles.checkBoxView}>

          <CheckBox
          onPress={()=>this.checkOrUncheckObservationProgramBoxes('Completed',this.state.intervention,'intervention')}
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Completed'
            checked={this.state.intervention.Completed}
            onChange={(checked) => console.log('I am checked', checked)}
          />
        <CheckBox
        onPress={()=>this.checkOrUncheckObservationProgramBoxes('Required',this.state.intervention,'intervention')}
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Required'
            checked={this.state.intervention.Required}
            onChange={(checked) => console.log('I am checked', checked)}
          />
          <CheckBox
          onPress={()=>this.checkOrUncheckObservationProgramBoxes('NotApplicable',this.state.intervention, 'intervention')}
            size={10}
            checkedIcon='check'
            containerStyle={styles.checkboxStyle}
            textStyle={styles.checkBoxTextStyle}
            title='Not Applicable'
            checked={this.state.intervention.NotApplicable}
            onChange={(checked) => console.log('I am checked', checked)}
          />
          </View>
          <TextInput value = {this.state.interventionDescription} onChangeText={(text)=>{this.setState({interventionDescription:text})}}  multiline = {true} style={styles.textInputMultiLine}></TextInput>
          <View style={styles.finalCheckboxes}>
            {this.displayFinalCheckboxes()}
          </View>
        <TouchableOpacity onPress={() => {this.sendDataToDb()}} style={styles.submitButton}>
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
  },
  companyLogo:{
    marginBottom:10
  },
  buttonText:{
    color:'white'
  },
  finalCheckboxes:{
    flexDirection:'column',
    flexWrap:'wrap',
    width:400,
    margin:15,
    height:300,
    alignItems:'flex-start'
  },
  submitButton:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    backgroundColor:'#195942',
    width:80,
    height:30,
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
    fontSize: 10,
    marginBottom: 10
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
    borderWidth:0,
    marginRight:10
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
    marginVertical:10,
    padding:5
  },
  textInputMultiLine:{
    borderColor:'grey',
    borderWidth:1,
    width:300,
    marginVertical:10,
    height:80
  }
})

export default Home