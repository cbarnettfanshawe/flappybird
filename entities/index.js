import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Pipe from "../components/Pipe";
import Ceiling from "../components/Ceiling";
import { getPipePair } from "../utils/random";
import { getWindowWidth, getWindowHeight } from "../utils/window";

const windowHeight = getWindowHeight()
const windowWidth = getWindowWidth()

export default game => {
    let engine = Matter.Engine.create({enableSleeping: false})
    let world = engine.world
    engine.gravity.y = 0.8

    //Randomly Generated Pipe Positions
    const pipePairA = getPipePair(100)
    const pipePairB = getPipePair(windowWidth + 100)
    
    return {

        //Physics
        physics: {engine, world},

        //Player
        Bird: Bird(world, 'yellow', {x: windowWidth / 2, y:windowHeight / 2}, {height: 40, width: 40}),

        //Pipes
        PipeTop1: Pipe(world, 'PipeTop1', 'darkgreen', pipePairA.pipeTop.pos, pipePairA.pipeTop.size),
        PipeBottom1: Pipe(world, 'PipeBottom1', 'darkgreen', pipePairA.pipeBottom.pos, pipePairA.pipeBottom.size),
        PipeTop2: Pipe(world, 'PipeTop2', 'darkgreen', pipePairB.pipeTop.pos, pipePairB.pipeTop.size),
        PipeBottom2: Pipe(world, 'PipeBottom2', 'darkgreen', pipePairB.pipeBottom.pos, pipePairB.pipeBottom.size),

        //Floor
        Floor: Floor(world, 'green', {x: windowWidth / 2, y:windowHeight}, {height: 50, width: windowWidth}),

        //Invisible Ceiling
        Ceiling: Ceiling(world, {x: windowWidth / 2, y: 0}, {height: 1, width: windowWidth})
    }
}