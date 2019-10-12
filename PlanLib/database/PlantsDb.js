import React from "react";
import {StyleSheet, ActivityIndicator, ListView, Text, View, Alert, Platform, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import { ListItem } from 'react-native-elements';
import { SQLite } from 'expo-sqlite';


export default class PlantsDb extends React.Component{
    
    openDatabase(){
        console.log("Trying to open Database");
        const db = SQLite.openDatabase('plantsdb');

        var sqlStatement = "create table if not exists plants (id integer primary key not null AUTO_INCREMENT, name text, strain text)";
        db.transaction(tx => {
            tx.executeSql(sqlStatement);
        });
        
        return db;
    }

    add(db, name, strain){
        console.log("Trying to add to db");
        db.transaction(
            tx => {
              tx.executeSql('insert into plants (name, text) values ('+name+', '+strain+')');
              tx.executeSql('select * from plants', [], ({rowz}, { rows }) =>
                console.log(JSON.stringify(rowz))
              );
            },
            null,
            this.update
          );
    }

    select(db){
        console.log("Trying to add to db");
        db.transaction(
            tx => {

              tx.executeSql('select * from plants', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
              );
            },
            null,
            this.update
          );
    }

    
}