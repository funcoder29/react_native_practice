import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";

const resetImage = require("./assets/reset.png");
const skipImage = require("./assets/skip.png");

export default function App() {
  const [isFocusTime, setIsFocustime] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const TOTAL_TIME = 25 * 60; // 1500 seconds
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const SECOND_BREAK_TIME = 20 * 60; // 1200 seconds

  const FIRST_BREAK_TIME = 5 * 60; // 300 seconds
  const [isFirstBreak, setIsFirstBreak] = useState(false);
  const [firstBreakTimeLeft, setFirstBreakTimeLeft] =
    useState(FIRST_BREAK_TIME);
  const firstBreakMinutes = Math.floor(firstBreakTimeLeft / 60);
  const firstBreakSeconds = firstBreakTimeLeft % 60;
  const [isFirstBreakPaused, setIsFirstBreakPaused] = useState(true);

  const [secondBreakTimeLeft, setSecondBreakTimeLeft] =
    useState(SECOND_BREAK_TIME);
  const secondBreakMinutes = Math.floor(secondBreakTimeLeft / 60);
  const secondBreakSeconds = secondBreakTimeLeft % 60;
  const [isSecondBreak, setIsSecondBreak] = useState(false);
  const [isSecondBreakPaused, setIsSecondBreakPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft >= 0) {
      const id = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);

      return () => clearInterval(id);
    }
  }, [isPaused]);
  useEffect(() => {
    if (isFirstBreakPaused) return;
    if (firstBreakTimeLeft >= 0) {
      const id = setInterval(() => {
        setFirstBreakTimeLeft((t) => t - 1);
      }, 1000);

      return () => clearInterval(id);
    }
  }, [isFirstBreakPaused]);

  useEffect(() => {
    if (isSecondBreakPaused) return;
    if (secondBreakTimeLeft >= 0) {
      const id = setInterval(() => {
        setSecondBreakTimeLeft((t) => t - 1);
      }, 1000);

      return () => clearInterval(id);
    }
  }, [isSecondBreakPaused]);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const formattedFirstBreakTime = `${firstBreakMinutes}:${firstBreakSeconds < 10 ? "0" : ""}${firstBreakSeconds}`;
  const formattedSecondBreakTime = `${secondBreakMinutes}:${secondBreakSeconds < 10 ? "0" : ""}${secondBreakSeconds}`;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isFocusTime && (
        <View style={styles.container}>
          <Text style={styles.timeBox}>{formattedTime}</Text>

          <View style={{ flexDirection: "row" }}>
            {timeLeft < 25 * 60 && (
              <Pressable
                onPress={() => {
                  setTimeLeft(TOTAL_TIME);
                  setIsPaused(true);
                }}
              >
                <Image
                  source={resetImage}
                  style={{ width: 25, height: 25, marginTop: 8 }}
                />
              </Pressable>
            )}

            <Button
              title={timeLeft == 25 * 60 ? "Play" : "Pause"}
              onPress={() => {
                console.log(isPaused);
                setIsPaused(!isPaused);
              }}
            />
            {timeLeft < 25 * 60 && (
              <Pressable
                onPress={() => {
                  setTimeLeft(TOTAL_TIME);
                  setIsFirstBreak(true);
                  setIsFocustime(false);
                  setIsPaused(true);
                }}
              >
                <Image
                  source={skipImage}
                  style={{ width: 25, height: 25, marginTop: 8 }}
                />
              </Pressable>
            )}
          </View>
        </View>
      )}
      {isFirstBreak && (
        <View style={styles.container}>
          <Text style={styles.timeBox}>{formattedFirstBreakTime}</Text>

          <View style={{ flexDirection: "row" }}>
            {firstBreakTimeLeft < FIRST_BREAK_TIME && (
              <Pressable
                onPress={() => {
                  setFirstBreakTimeLeft(FIRST_BREAK_TIME);
                  setIsFirstBreakPaused(true);
                }}
              >
                <Image
                  source={resetImage}
                  style={{ width: 25, height: 25, marginTop: 8 }}
                />
              </Pressable>
            )}

            <Button
              title={
                firstBreakTimeLeft == FIRST_BREAK_TIME || isFirstBreakPaused
                  ? "Start break"
                  : "Pause"
              }
              onPress={() => {
                setIsFirstBreakPaused(!isFirstBreakPaused);
              }}
            />
            {firstBreakTimeLeft < FIRST_BREAK_TIME && (
              <Pressable
                onPress={() => {
                  setFirstBreakTimeLeft(FIRST_BREAK_TIME);
                  setIsSecondBreak(true);
                  setIsFirstBreak(false);
                  setIsFocustime(false);
                  setIsFirstBreakPaused(true);
                }}
              >
                <Image
                  source={skipImage}
                  style={{ width: 25, height: 25, marginTop: 8 }}
                />
              </Pressable>
            )}
          </View>
        </View>
      )}

      {isSecondBreak && (
        <View style={styles.container}>
          <Text style={styles.timeBox}>{formattedSecondBreakTime}</Text>

          <View style={{ flexDirection: "row" }}>
            {secondBreakTimeLeft < SECOND_BREAK_TIME && (
              <Pressable
                onPress={() => {
                  setSecondBreakTimeLeft(SECOND_BREAK_TIME);
                  setIsPaused(true);
                }}
              >
                <Image
                  source={resetImage}
                  style={{ width: 25, height: 25, marginTop: 8 }}
                />
              </Pressable>
            )}

            <Button
              title={
                secondBreakTimeLeft == SECOND_BREAK_TIME || isPaused
                  ? "Start break"
                  : "Pause"
              }
              onPress={() => {
                setIsPaused(!isPaused);
              }}
            />
            {secondBreakTimeLeft < SECOND_BREAK_TIME && (
              <Pressable
                onPress={() => {
                  setSecondBreakTimeLeft(SECOND_BREAK_TIME);
                  setIsFocustime(true);
                  setIsSecondBreak(false);
                  setIsPaused(true);
                }}
              >
                <Image
                  source={skipImage}
                  style={{ width: 25, height: 25, marginTop: 8 }}
                />
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  timeBox: {
    borderColor: "black",
    borderWidth: 2,
    padding: 20,
    borderRadius: 0,
    marginBottom: 20,
    fontSize: 30,
  },
});
