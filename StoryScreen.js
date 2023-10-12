import React, { Component, useState,useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image, ScrollView, Dimensions, Alert } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from 'expo-speech';

SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default function StoryScreen({route}) {
  const[fontsLoaded,setFontsLoaded] = useState(false);

  // crie os estados  

  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }
  
  useEffect(() =>{
  loadFontsAsync();
  })

  const initiateTTS = async (title, author, story, moral) => {
    const current_color = speakerColor;
    setSpeakerColor(current_color === 'gray' ? '#ee8249' : 'gray');
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`,{language:'pt-br'});
      if(Platform.OS ==='ios'){Speech.pause();}
      Speech.speak(story,{language:'pt-br'});
      if(Platform.OS ==='ios'){Speech.pause();}
      Speech.speak("A moral da história é!",{language:'pt-br'});
      Speech.speak(moral,{language:'pt-br'});
    } else {
      Speech.stop();
    }
  }

  
  if (!route.params) {
    navigation.navigate("Home");
  } else if(fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>App Narração de Histórias</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Image
                source={require("../assets/story_image_1.png")}
                style={styles.image}
              ></Image>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {route.params.story.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {route.params.story.author}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {route.params.story.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>

                    <TouchableOpacity
                      
                      // complete o código

                      <Ionicons
                        name={speakerIcon}
                        size={RFValue(30)}
                        color={speakerColor}
                        style={{ margin: RFValue(15) }}
                      />
                    </TouchableOpacity>

                </View>
              </View>
              <View style={styles.storyTextContainer}>
                <Text style={styles.storyText}>
                  {route.params.story.story}
                </Text>
                <Text style={styles.moralText}>
                  Moral - {route.params.story.moral}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>12k</Text>
                </View>
              </View>
            </ScrollView>
          </View>   
        </View>
      );
    }
  else {
    return <Text> Carregando.. </Text>
  }  
    
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15193c",
    height: "100%"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    height: "15%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  appIcon: {
    width: 50,
    height: 50
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    marginLeft: 20
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});