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
        // reportData : [],
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

//     let returnData
// if(this.state.reportData.length > 0){
    console.log(this.state.reportData);
    console.log('value...', value);
    
//    returnData = this.state.reportData.map((value, index) => {
//        console.log(new Date(value.date).toString().split(" ").slice(0, 4).join(" "));
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


           /*
           name; hakhdfh;adl;h
           hjashjdkf ; asd;f;ash;df
           sdakhjlfhjklakjhdfkhjahk
           lkjashdlfkjahsldk l'jk'lasdkjf

           --------------------------

           name; hakhdfh;adl;h
           hjashjdkf ; asd;f;ash;df
           sdakhjlfhjklakjhdfkhjahk
           lkjashdlfkjahsldk l'jk'lasdkjf  

           --------------------------

           name; hakhdfh;adl;h
           hjashjdkf ; asd;f;ash;df
           sdakhjlfhjklakjhdfkhjahk
           lkjashdlfkjahsldk l'jk'lasdkjf  

           --------------------------

           name; hakhdfh;adl;h
           hjashjdkf ; asd;f;ash;df
           sdakhjlfhjklakjhdfkhjahk
           lkjashdlfkjahsldk l'jk'lasdkjf  
           */

       } else {
           return <View/>
       }
       
    // })
// }

// return returnData
  
  }

  formatExtraDetails(value){
      let returnString = ''
    // if(value.length > 0){
    //     returnString.con
    // }
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
            //   ListHeaderComponent={() => this.renderTitle()} //render the BIRD is the word
            //   ListFooterComponent={<View style={{ height: 80 }} />} //just spacing on the bottom
              initialListSize={5} //how many cards get loaded at first
            />
          );  
    } else {
        return <View/>;
    }
    
  
    // return (
    //   <ScrollView contentContainerStyle={{ alignItems : 'flex-start'}} style={styles.container}>
    //     <Image style={styles.companyLogo} source={require('../screens/bird-construction-logo.png')}/>
    //     {this._renderReport()}
    //     {/* <View style = {styles.reportView}>
    //         <Text style = {styles.interventionText}>Observation Program</Text>
    //         <Text style = {styles.reportText}>Date: Monday Novemer 23, 1978</Text>
    //         <Text style = {styles.reportText}>Observation Type: Hazards</Text>
    //         <Text style = {styles.reportText}>Name: Bill james</Text>
    //         <Text style = {styles.reportText}>Location: 14-11 Jowel street</Text>
    //         <Text style = {styles.reportText}>Description of Observation: We to the place and there was a lot of work to do</Text>
    //     </View> */}
    //   </ScrollView>
    // )
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
    // borderColor: 'black',
    //borderTop:1
  },
  reportText:{
      margin:5
  },
//   finalCheckboxes:{
//     flexDirection:'column',
//     flexWrap:'wrap',
//     width:400,
//     margin:15,
//     height:300,
//     alignItems:'flex-start'
//   },
//   submitButton:{
//     alignItems:'center',
//     justifyContent:'center',
//     borderWidth:1,
//     backgroundColor:'#195942',
//     width:80,
//     height:30,
//   },
//   leftAlignCheckBoxes:{
//     flexDirection:'column'
//   },
  interventionText:{
    marginVertical:10,
    marginLeft: 5,
    alignSelf:'flex-start'
  },

//   footerText:{
//     marginTop:20,
//     fontSize: 10,
//     marginBottom: 10
//   },
//   rightAlignCheckBoxes:{
//     flexDirection:'column'
//   },
//   alignTopCheckBoxes:{
//     flexDirection:'row'
//   },
//   checkBoxTextStyle:{
//     fontSize:12
//   },
//   checkboxStyle:{
//     backgroundColor:'white',
//     marginVertical:5,
//     padding:5,
//     marginHorizontal:0,
//     borderWidth:0,
//     marginRight:10
//   },
//   checkBoxView:{
//     flexDirection:'row'
//   },
//   location:{
//     fontSize:17
//   },
//   animators:{
//     fontSize:15,
//     color:'#8E8E93'
//   },
//   groupContainer:{
//     borderBottomWidth:1,
//     borderBottomColor: '#8E8E93',
//     margin:5,
//     paddingVertical:5
//   },
//   textInputName:{
//     borderColor:'grey',
//     borderWidth:1,
//     width:300,
//     marginVertical:10,
//     padding:5
//   },
//   textInputMultiLine:{
//     borderColor:'grey',
//     borderWidth:1,
//     width:300,
//     marginVertical:10,
//     height:80
//   }
})

export default Report