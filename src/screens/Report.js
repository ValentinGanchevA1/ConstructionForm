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

class Report extends Component {

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
      
      observationProgram: {HazardIdentification: false, BeaviourObservation:false, NearMiss: false, ImprovementSuggestion: false},
      intervention:{Completed:false, Required: false, NotApplicable: false},
      finalCheckboxes:["Access/Egress/Walkways", "Attention to Task", "Barricades", "Confined Space", "Defective Equipment", "Energy Isolation",
                        "Environmental", "Ergonomics", "Equipment & Tools", "Excavation", "Falling Objects", "Fire Hazard", "Ground Surface/Condition",
                        "Housekeeping", "Ladders/Plartforms,Scaffolds", "Lighting", "Line of Fire", "Mobile Equipment/Vehicles", "Pinch Points",
                      "PPE Use", "Rigging", "Signage", "Spill Containment", "Working At Heights" ],

        finalCheckboxIndexes:[]
    };

    
  }

  componentDidMount(){
    firebase.database().ref('/update').limitToLast(10).once('value').then(value =>{
        console.log(this.snapshotToArray(value.val()).sort((a,b)=>{return new Date(a.date) - new Date(b.date)}));
        this.setState({
            reportData: this.snapshotToArray(value.val()).sort((a,b)=>{return new Date(a.date) - new Date(b.date)})
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

  render() {
    if (this.state.reportData) {
        return (
            <FlatList
              data={this.state.reportData} // this.state.reportData
              renderItem={ item  => this._renderReport(item)} //rendering each card
              keyExtractor={item => item.name + item.date} //needs to be unique
            
              initialListSize={5} //how many cards get loaded at first
            />
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
  companyLogo:{
    marginBottom:10
  },
  buttonText:{
    color:'white'
  },
  reportView:{
    //   flex:1,
    // borderWidth:1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  reportText:{
      margin:5
  },

  interventionText:{
    marginVertical:10,
    marginLeft: 5,
    alignSelf:'flex-start'
  },

})

export default Report