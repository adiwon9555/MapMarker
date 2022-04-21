import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const BUTTON_STATE = {
  START: "Start",
  RESUME: "Resume",
  STOP: "Stop",
};
export default function App() {
  const [buttonState, setButtonState] = useState(BUTTON_STATE.START);
  const [time, setTime] = useState(0)
  const interValRef = useRef(null)

  const onStartStopResume = () => {
    if(buttonState === BUTTON_STATE.START || buttonState === BUTTON_STATE.RESUME ){
      resumeTimer()
    }else{
      stopTimer()
    }
  };

  const resetTimer = () => {
    setButtonState(BUTTON_STATE.START)
    clearInterval(interValRef.current)
    setTime(0)
  }

  const resumeTimer = () => {
    setButtonState(BUTTON_STATE.STOP)
    interValRef.current = setInterval(()=>{
      setTime(time=>time+1)
    },1000)
  }

  const stopTimer = () => {
    setButtonState(BUTTON_STATE.RESUME)
    clearInterval(interValRef.current)
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 100 }}>
        <Text>{time}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ width: 100, height: 40, backgroundColor: "blue", justifyContent: 'center',alignItems: 'center' }}
          onPress={onStartStopResume}
        >
          <Text style={{ color: "white" }}>{buttonState}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            backgroundColor: "blue",
            marginLeft: 20,
            justifyContent: 'center',alignItems: 'center'
          }}
          onPress={resetTimer}
        >
          <Text style={{ color: "white" }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
