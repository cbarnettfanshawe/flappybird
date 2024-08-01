import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {

  //useStates
  const [titleScreen, setTitleScreen]= useState(true)
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)

  return (
    <View style={{flex: 1, backgroundColor: '#00BFFF'}}>
      
      {/*GAME ENGINE*/}
      <GameEngine
        ref={(ref) => {setGameEngine(ref)}}
        systems={[Physics]}
        entities={entities()}
        running={running} 
        onEvent={(e) => {
          switch(e.type) {
            case 'gameOver':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0 
        }}
      >
        <StatusBar style="auto" hidden={true}/>
      </GameEngine>

      {/*SCORE*/}
      {!titleScreen ?
        <Text style={{
          textAlign: 'center', 
          fontSize: 40, 
          fontWeight: 'bold', 
          margin: 20, color: 'white', 
          textShadowColor: 'black', 
          textShadowRadius: 5, 
          textShadowOffset: {width: 2, height: 2
        }}}>
          Score: {currentPoints}
        </Text> : null
      }
      

      {/*GAME OVER SCREEN*/}
      {!running && !titleScreen ? 
        <View style={{flex: 1, justifyContent: "center", alignItems: 'center', gap: 25}}>

          {/*RESTART BUTTON*/}
          <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, elevation: 5}} onPress={() => {
            setCurrentPoints(0)
            setRunning(true)
            gameEngine.swap(entities())
          }}>
            <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', padding: 20}}>
              RESTART
            </Text>
          </TouchableOpacity>

          {/*TITLE SCREEN BUTTON*/}
          <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, elevation: 5}} onPress={() => {
            setCurrentPoints(0)
            setRunning(false)
            setTitleScreen(true)
            gameEngine.swap(entities())
          }}>
            <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', padding: 20}}>
              TITLE
            </Text>
          </TouchableOpacity>

        </View> : null
      }

      {/*TITLE SCREEN*/}
      {titleScreen ?
        <View style={{flex: 1, justifyContent: "center", alignItems: 'center', gap: 50}}>

          <Text style={{
            textAlign: 'center', 
            fontSize: 40, 
            fontWeight: 'bold', 
            color: 'yellow', 
            textShadowColor: 'black', 
            textShadowRadius: 5, 
            textShadowOffset: {width: 2, height: 2}
          }}>
            Flappy Bird
          </Text>

          <TouchableOpacity style={{backgroundColor: 'darkgreen', borderRadius: 10, elevation: 5}} onPress={() => {
            setCurrentPoints(0)
            setTitleScreen(false)
            setRunning(true)
            gameEngine.swap(entities())
          }}>
            <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', padding: 20, color: 'white'}}>
              START
            </Text>
          </TouchableOpacity>

          <Text style={{
            textAlign: 'center', 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: 'yellow', 
            textShadowColor: 'black', 
            textShadowRadius: 5, 
            textShadowOffset: {width: 2, height: 2}
          }}>
            By Constance Barnett
          </Text>
          
        </View> : null
      }
      
    </View>
  );
}
