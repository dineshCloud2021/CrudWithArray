import React, {Component} from 'react';
import {SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    StatusBar,
    TouchableOpacity,
    Alert,
    TextInput,
    Dimensions,
    ScrollView,} from 'react-native';
import {Colors,} from "react-native/Libraries/NewAppScreen";
import DialogInput from 'react-native-dialog-input';

const Customers = [
    {
      id: 1,
      name: "Ankaiah",
      poisition: "GitHub",
    },
    {
      id: 2,
      name: "Iyyanar",
      poisition: "GitHub",
    },
    {
      id: 3,
      name: "Bhanu",
      poisition: "Hr-NewJersey",
    },
    {
      id: 4,
      name: "Ram",
      poisition: "Recruiter",
    },
    {
      id: 5,
      name: "Dinesh",
      poisition: "React-Native",
    },
  ];

  function Item({id, name, poisition}){
  
    const handPress = (id) => {
      const customer = Customers.find((cust) => {
        return cust.id === id;
      });

    // Alert.alert("Customer Details",`Name : ${customer.name}\n\poisition : ${customer.poisition}`); 

     Alert.prompt("Update customer", `Updating Customer ${id}`,[
        {
           text: "Update",
           onPress: (text) => updateCustomer(id, text),
        },
        {
            text: "Cancle",
            style: "cancel",
            onPress: () => console.log("Canclled"),
        },
    ]);

     const updateCustomer = (id, name) => {
         let updateCustomer = {
             id, name: name, poisition,
         };

         Customers = Customers.map(cust => 
            cust.id === id ? {...cust, ...updateCustomer} : cust);

            navigation.reset({
                index: 0,
                routes: [{ name: 'mainScreen'}],
             });};
    };

    const deleteCustomer = (id) => {
      const customer = Customers.find((cust) => {
        return cust.id === id;
      });
      
      Customers = Customers.filter((cust) => {
        return cust.id !== customer.id;
      });

      navigation.reset({
          index: 0,
          routes: [{ name: 'mainScreen'}],
      });

      console.log(Customers);
  
    };
  
    return(
      <TouchableOpacity 
       onLongPress= {() => deleteCustomer(id)}
       onPress= {() => handPress(id)} 
       style={styles.listItem}>
  
        <Text style={styles.listName}>{name}</Text>
        <Text style={styles.listpoisition}>{poisition}</Text>
    
      </TouchableOpacity>
    );
  }

  export default class mainScreen extends Component{

    state = {
        name: '',
        poisition: 0,
    }
  
    addCustomer = () => {
        const {poisition,name} = this.state;
        if(name && poisition){
            Customers.push({
                id: Customers[Customers.length -1].id + 1,
                name: name, 
                poisition: poisition});
                  this.props.navigation.reset({
                      index: 0,
                      routes: [{name: 'mainScreen'}],
                  });
        } else{
            Alert.alert("Error", "Fields must be not empty!");
        }
    };

    render(){
    return (
        <View style={styles.SafeAreaView}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
           <Text style={styles.headerText}>React Native CRUD Application</Text>
           <FlatList data={Customers} renderItem= {({item}) => (
              <Item id={item.id} name={item.name} poisition={item.poisition}/>
            )}/>

           <View style={{alignItems: 'center'}}>
            <Text style= {styles.heatTittle} >Add New Employee</Text>
            <TextInput placeholder={"Add Name"} style= {styles.input}
             onChangeText= {(text) => this.setState({name: text})}/>
            <TextInput
              placeholder={"Add Poisition"}
              style= {styles.input}
              onChangeText= {(text) => this.setState({poisition: text})}
             />
  
            <TouchableOpacity onPress={() => this.addCustomer()}>
             <Text style={{}}>Submit</Text>
            </TouchableOpacity>
  
           </View>

        </View>

    )};

  };

  const {width} = Dimensions.get("screen");
  const {height} = Dimensions.get('window');
  
  const styles = StyleSheet.create({
  
    SafeAreaView:{
     
    },
    headerText: {marginTop: 15, textAlign: "center", fontWeight: "bold"
  },
    listItem: {
     backgroundColor: "#ddd",
     flexDirection: "row",
     marginVertical:5,
     padding:10,
  },
    listName: {
      textAlign: "center",
      flex: 0.5,
      alignItems: "flex-start",
  },
    listpoisition: {
      textAlign: "center",
      flex: 0.5,
      alignItems: "flex-end",
  },

  heatTittle:{
      margin: 10,
  },

  input: {
      width: width / 1.3,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 20,
      padding: 10,
      marginVertical: 5,
  },
  
  });