import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import {
  FlatList,
  Text,
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity
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
    // read data in from firebse
    // firebase.database().ref(`/juniorYouthGroups`).once('value',
    //                                               (groups)=>{this.setState({
    //                                                 juniorYouthGroups:groups.val()
    //                                               })},
    //                                               (errors)=>{console.log(errors);
    //                                               })

    firebase.database().ref('/update').push('WE DID IT')
  }

//    snapshotToArray(snapshot) {
//     var returnArr = [];
//     Object.entries(snapshot).forEach((childSnapshot) => {
//         var item = childSnapshot[1];
//         item.id = childSnapshot[0];
  
//         returnArr.push(item);
//     });
  
//     return returnArr;
//   };

//   displayGroups(item,index){
//     console.log(item);
//    return (<View style={styles.groupContainer}>
//             <TouchableOpacity onPress={()=>{this.props.navigation.navigate("IndividualGroup",{content:item.content})}}>
//               <Text style={styles.location}>{item.location}</Text>
//               <Text style={styles.animators}>{item.animator}</Text>
//               <Text style={styles.animators}>{item.groupTime}</Text>
//             </TouchableOpacity>
//           </View>
//     )
//   }

//   _renderGroups(){
//     return(
//       <FlatList
//       data={this.snapshotToArray(this.state.juniorYouthGroups)}
//       keyExtractor={(item, index) => index}
//       renderItem={({ item, index }) => this.displayGroups(item, index)}
//       ListEmptyComponent={() => (
//         <View >

//         </View>
//       )}
//       initialNumToRender={1}
//     />
//     )
//   }

  render() {
    console.log(this.state.juniorYouthGroups);
    return (
      <View style={styles.container}>
      <Text style={styles.chooseGroupText}>Choose Your Group</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
  chooseGroupText:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:5,
    marginTop:50,
    marginBottom:15
  }
})

export default Home