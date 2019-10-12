import React from "react";
import {StyleSheet, ActivityIndicator, ListView, Text, View, Alert, Platform, TouchableOpacity, FlatList, AsyncStorage, Modal, KeyboardAvoidingView, TextInput, TouchableHighlight} from 'react-native';
import { ListItem, Button, Header } from 'react-native-elements'
import PlantsDb from '../database/PlantsDb';

var gToken = ' ';
var db;
PlantsDbObj = new PlantsDb();
export default class Plants extends React.Component{
    

    static navigationOptions = {
        title: "Plantenlijst",
    }

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            modalVisible: false,
            name: '',
            strain: ''
        }

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    openDatabase(){
        console.log("Tyring to access DB OBJ")
       
        db = PlantsDbObj.openDatabase();
    }

    _createPlant = async () => {
        console.log("Trying to access Add DB");
        PlantsDbObj.add(db, this.state.name, this.state.strain);
    }

    getToken = async () => {
       
      try{
          gToken = await AsyncStorage.getItem('token');
          // alert(gToken);
          fetch('https://www.isyndix.com/isyndix_rest/activities/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + gToken
            }
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                
                this.setState({
                  isLoading: false,
                  
                  dataSource: responseJson,
                }, function() {
                  // In this block you can do something with new state.
                });
              })
              .catch((error) => {
                console.error(error);
              }); 
      }catch(error){
          alert(error);
      } 
    }

    componentDidMount(){
        console.log("Plants-Component Mounted");
        
        return this.openDatabase();
    }

    

    goPlant (id, title, description, buildingName) {
      this.props.navigation.navigate('Task', {
        title: title,
        taskID: id,
        description: description,
        buildingName: buildingName
    });
    }

    render() {
        if (this.state.isLoading) {
          return (
            <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
            </View>
            );
        }

        return (
            <View>
                <Button
                    title="NIEUW"
                    buttonStyle={{
                                    backgroundColor: 'blue',
                                }}
                    onPress={() => {
                    this.setModalVisible(true);
                    }}
                />
            <FlatList
                
                style={styles.MainContainer}
                data={this.state.dataSource}
                renderItem={({item}) => <TouchableOpacity onPress={this.goTask.bind(this, item.id, item.name, item.description, item.buildingName)} >
                                        <ListItem title={item.name}
                                                key={item.id}
                                                subtitle={
                                                    item.buildingName
                                                } 
                                        />
                                        </TouchableOpacity>
                                        
                            }
                keyExtractor={(item, index) => index.toString()}
            />
            <Modal
                keyboardShouldPersistTaps="always"
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <Header
                    centerComponent={{ text: 'Create New Plant', style: { color: '#fff' } }}
                    containerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0074D9'
                    }}
                />

                <View style={{marginTop: 22}}>
                    
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.container}>
                    <TextInput
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'Name'}
                        style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        }}
                    />
                    <TextInput
                        onChangeText={(strain) => this.setState({ strain })}
                        placeholder={'Strain'}
                        style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        }}
                    />
                    
                    <Button title="Create Plant" onPress={this._createPlant} />
            
                    </View>
                    </KeyboardAvoidingView>

                    <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                    </TouchableHighlight>
                    
                </View>
                </Modal>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    MainContainer :{
    
    // Setting up View inside content in Vertically center.
    // justifyContent: 'center',
    flex:1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#00BCD4',
    padding: 5,
    
    },
    
    textViewContainer: {
    
     textAlignVertical:'center', 
     padding:10,
     fontSize: 20,
     color: '#fff',
    
    }
    
    });