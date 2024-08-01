import { getWindowWidth, getWindowHeight } from "./window";

const windowHeight = getWindowHeight()
const windowWidth = getWindowWidth()
const pipeGap = 300

//Random Numer within Range
export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Generate two pipes with a random y position
export const getPipePair = (xPosOffset = 0) => {

    //Random top pipe position
    let yPosTop = -getRandom(400, windowHeight - 100)

    //Position and Size objects for the pipes
    const pipeTop = {pos: {x: windowWidth + xPosOffset, y: yPosTop}, size: {height: windowHeight * 2, width: 75}}
    const pipeBottom = {pos: {x: windowWidth + xPosOffset, y: windowHeight * 2 + pipeGap + yPosTop}, size: {height: windowHeight * 2, width: 75}}

    return {pipeTop, pipeBottom}
}