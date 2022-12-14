import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

function BottomSheetModel(props) {
  // const sheetRef = useRef(null);
  // const snapPoints = ["20%"];
    props.handleSnapPress = useCallback((index)=>{
    props.sheetRef.current?.snapToIndex(index)
  },[])

  if(props.id != null){
    console.log(props.handleSnapPress())
    return (
        <>
        <BottomSheet
        ref = {props.sheetRef}
        snapPoints={props.snapPoints}
        enablePanDownToClose={true}
        >
         <BottomSheetView>
           <Text>{props.id}</Text>
         </BottomSheetView>
  
        </BottomSheet>
        </>
    )
  }
 
}

export default BottomSheetModel