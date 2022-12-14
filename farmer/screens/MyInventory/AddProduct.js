import React, { useEffect, useState } from 'react'
import { View,Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { useLogin } from '../../Context/LoginProvider'
import { Dropdown } from 'react-native-element-dropdown';
import AddDiaryProductsScreen from './AddProductsScreen';


function AddProduct({navigation}) {
    const date = new Date();
    var days=[
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ]
    var months=[
        "Jan", "Feb","March","April","May","June","July","Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    const [day] = useState(days[date.getDay()])
    const [dayInInt,setDayinInt] = useState('')
    const [month] = useState(months[date.getMonth()+1])
    const [hour,setHour] = useState()
    const [minute,setMinute] = useState(date.getMinutes())
    const [amPm,setamPm] = useState('')
    const [productName,setProductName] = useState('')
  
    var noon=new Date(date.getFullYear(),date.getMonth(),date.getDate(),12,0,0);
    useEffect(()=>{
     if(date.getDay().toString().length < 2){
            setDayinInt(`0${new Date().getDate()}`)
        }else{
            setDayinInt(new Date().getDate()) 
        }
       var hours = (date.getHours() <= 12 )? date.getHours():date.getHours()-12
        if(hours.toString().length < 2){
         setHour(`0${hours}`)
        }else{
         setHour(hours)
         
        }
        setamPm((date.getTime()<noon.getTime())?'AM':'PM');
     setInterval(()=>{
        var dateMinute = new Date()
        if(dateMinute.getMinutes().toString().length < 2)
        {
            setMinute(`0${dateMinute.getMinutes()}`)
        }else{
            setMinute(dateMinute.getMinutes())
        }
     },60000)
    
    },[])
    const products = [
        {productName:'Milk',key:1},
        {productName:'Eggs',key:2},
        {productName:'Fruits',key:3},
        {productName:'Vegetables',key:4},
        {productName:'Grains',key:5}
    ]
  return (
     <View style={styles.root}>
         <View style={styles.innerRoot}>
            <View style={styles.title}>
                <Text style={styles.txtTitle}>Add Products</Text>
                <View style={styles.date}>
                <Text style={styles.txtDate}>{day} {dayInInt} {month}</Text>
                <View style={styles.dropdown}>
                    <Dropdown 
                    style={styles.txtDropdown}
                    data={products}
                    labelField="productName"
                    valueField='productName'
                    onChange={item=>{
                        setProductName(item.productName)
                       
                    }}
                    value={productName}
                    
                />
             </View>
          </View>
          <View style={styles.time}>
            <Text style={styles.txtTime}>{hour}:{minute}</Text>
            <Text style={styles.amPm}>{amPm}</Text>
        </View>
       </View>
      </View>
       <View style={{alignItems: 'center'}}>
        <Text style={styles.pn}>{productName}</Text>
      </View>
    
         <AddDiaryProductsScreen title={productName}/>
      
     </View>
  )
}

export default AddProduct
const styles = StyleSheet.create({
    root:{flex:1,
    },
    innerRoot:{
        height: '25%',
        width: '100%',
        backgroundColor: '#003CFE'
    },
   title:{
    alignItems:'center',
   
   },
   txtTitle:{
    color:'white',
    fontSize:25,
    fontWeight:'bold',
   },
   date:{
    marginLeft:'5%',
    marginTop:'2%',
    flexDirection:'row'
   },
   txtDate:{
    color:'white',
    fontSize:22,
    marginRight:'5%'
   },
   time:{
    marginRight:'50%',
    flexDirection:'row'
   },
   txtTime:{
    color:'white',
    fontSize:35
   },
   amPm:{
    marginTop:'10%',
    color:'white',
    marginLeft:5,
    fontSize:18
   },
   dropdown:{
    justifyContent: 'flex-end',
    marginLeft:'auto',
    marginRight:20,
    width:'40%',
    
   },
   txtDropdown:{
    width:'100%',
    height: 50,
    backgroundColor: 'white',
    color:'black',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
   },
  form:{
    marginTop:5
  },
  pn:{
    fontSize:50,
    fontStyle:'italic',
    fontWeight:'bold',
  },
 
})