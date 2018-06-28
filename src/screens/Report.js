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
  Image,
  Picker,
  PickerIOS
} from 'react-native'

class Report extends Component {

  constructor(props) {
    super(props);

    this.state = {
      observationProgram: {HazardIdentification: false, BehaviourObservation:false, NearMiss: false, ImprovementSuggestion: false},
      intervention:{Completed:false, Required: false, NotApplicable: false},
     pickerValue:'',
      isDatePickerVisible:false,
      name:'',
      location:'',
      date:'',
      observationDescription:'',
      interventionDescription:'',
      juniorYouthGroups:{},
      
      observationProgram: {HazardIdentification: false, BeaviourObservation:false, NearMiss: false, ImprovementSuggestion: false},
      intervention:{Completed: false, Required: false, NotApplicable: false},
      finalCheckboxes:["Access/Egress/Walkways", "Attention to Task", "Barricades", "Confined Space", "Defective Equipment", "Energy Isolation",
                        "Environmental", "Ergonomics", "Equipment & Tools", "Excavation", "Falling Objects", "Fire Hazard", "Ground Surface/Condition",
                        "Housekeeping", "Ladders/Plartforms,Scaffolds", "Lighting", "Line of Fire", "Mobile Equipment/Vehicles", "Pinch Points",
                      "PPE Use", "Rigging", "Signage", "Spill Containment", "Working At Heights" ],

        finalCheckboxIndexes:[]
    };

    
  }

  componentDidMount(){
    firebase.database().ref('/update').limitToLast(10).once('value').then(value =>{
        console.log(this.snapshotToArray(value.val()).sort((b,a)=>{return new Date(a.date) - new Date(b.date)}));
        this.setState({
            reportData: this.snapshotToArray(value.val()).sort((b,a)=>{return new Date(a.date) - new Date(b.date)})
        })
    }).catch(error =>{
        console.log(error);
        
    })
}

  snapshotToArray(snapshot) {
    var returnArr = [];
    Object.entries(snapshot).forEach((childSnapshot) => {
        var item = childSnapshot[1];
        item.id = childSnapshot[0];
  
        returnArr.push(item);
    });
  
    return returnArr;
  };


  _renderReport(item){

    let value = item.item;
       if (value) {
        return(
            <View style = {styles.reportView}>
                <Text style = {styles.reportText}>Name: {value.name}</Text>
                <Text style = {styles.reportText}>Date: {new Date(value.date).toString().split(" ").slice(0, 4).join(" ")}</Text>
                <Text style = {styles.reportText}>Observation Type: {value.observationType}</Text>
                <Text style = {styles.reportText}>Location: {value.location}</Text>
                <Text style = {styles.reportText}>Description of Observation: {value.observationDescription}</Text>
                <Text style = {styles.reportText}>Intervention Type: {value.interventionType}</Text>
                <Text style = {styles.reportText}>Extra Details: {this.formatExtraDetails(value.interventionChecks)}</Text>
            </View>
           )

       } else {
           return <View/>
       }
       

  
  }

  formatExtraDetails(value){
      let returnString = ''
   
    return value.join(", ")
  }

//   emailPressed() {
//     var subject;
//     subject = "Adding My Location to Spectrum";
//     var mailURI = "mailto:support@spectrum.md?subject=" + subject + "&body=";

//     Linking.canOpenURL(mailURI).then(supported => {
//       if (supported) {
//         // SpectrumAnalytics.logEvent("email");
//         Linking.openURL(mailURI);
//       } else {
//         Alert.alert("This device is unable to send email.");
//       }
//     });
//   }
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
    },()=>{})

  }
}

  render() {
    let observationType = ''
    let interventionType = ''
    let sortedArray = []

    if (this.state.reportData) {
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
        switch (i) {
          case "Completed":
          interventionType = "Completed"
            break;
        
          case "Required":
          interventionType = "Required"
            break;

            case "NotApplicable":
            interventionType = "Not Applicable"
            break;
  
            default:
            break;
        }
      }
    }

    if(observationType !== '' && interventionType !== ''){
      for(let i = 0; i < this.state.reportData.length; i++){
        if(this.state.reportData[i].observationType === observationType && this.state.reportData[i].interventionType === interventionType){
          sortedArray.push(this.state.reportData[i])
          sortedArray.sort((b,a)=>{return new Date(a.date) - new Date(b.date)})
        }
      }
    }

    else if(observationType !== '' || interventionType !== ''){
      for(let i = 0; i < this.state.reportData.length; i++){
        if(this.state.reportData[i].observationType === observationType || this.state.reportData[i].interventionType === interventionType){
          sortedArray.push(this.state.reportData[i])
          sortedArray.sort((b,a)=>{return new Date(a.date) - new Date(b.date)})
        }
      }
    }else{
      sortedArray = this.state.reportData
    }
   
        return (
          
        <View style = {styles.container}>
          <Text style = {styles.interventionText}>Observation</Text>
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
                onPress={() =>this.checkOrUncheckObservationProgramBoxes('ImprovementSuggestion',this.state.observationProgram, 'observationProgram')}
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

        <FlatList
          data={sortedArray} // this.state.reportData
          renderItem={ item  => this._renderReport(item)} //rendering each card
          keyExtractor={item => item.name + item.date} //needs to be unique
          initialListSize={5} //how many cards get loaded at first
        /> 
      </View>
          );  
    } else {
        return <View/>;
    }
    

  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor:'white',
    padding: 5,
  },
  alignTopCheckBoxes:{
    flexDirection:'row'
  },
  leftAlignCheckBoxes:{
    flexDirection:'column'
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
    marginRight:5
  },
  companyLogo:{
    marginBottom:10
  },
  buttonText:{
    color:'white'
  },
  submitButton:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    backgroundColor:'#195942',
    width:80,
    height:30,
  },  
  reportView:{
    //   flex:1,
     borderWidth:1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  reportText:{
      margin:5
  },
  checkBoxView:{
    flexDirection:'row'
  },

  interventionText:{
    marginVertical:10,
    marginLeft: 5,
    alignSelf:'flex-start'
  },

})

export default Report