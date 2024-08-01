import { Dimensions } from "react-native";

//Reference for the window size

export const getWindowWidth = () => {
    return Dimensions.get('window').width
}

export const getWindowHeight = () => {
    return Dimensions.get('window').height
}