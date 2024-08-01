import Matter from "matter-js";
import { getPipePair } from "./utils/random";
import { getWindowWidth } from "./utils/window";

const windowWidth = getWindowWidth()
const pipeSpeed = -2
const playerJumpVelocity = -8

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine

    //Player Movement
    touches.filter(t => t.type === 'press')
    .forEach(t => {

        //Whenever player touches screen, add upward Velocity
        Matter.Body.setVelocity(entities.Bird.body, {
            x:0,
            y:playerJumpVelocity 
        })

    });

    //Pipe Movement
    for (let i = 1; i <= 2; i++) {

        //When Player passes the pipes
        if (entities['PipeTop' + i].body.bounds.max.x <= windowWidth / 2 && !entities['PipeTop' + i].point) {

            //Stops player from scoring multiple points at a time
            entities['PipeTop' + i].point = true

            //Event call for scoring a point
            dispatch({ type: 'point'})
        }

        //If pipes are off screen 
        if (entities['PipeTop' + i].body.bounds.max.x <= 0) {

            //Generate new pipe positions
            const pipePair = getPipePair(windowWidth);
            
            //Set pipe position to off screen on the right side
            Matter.Body.setPosition(entities['PipeTop' + i].body, pipePair.pipeTop.pos)
            Matter.Body.setPosition(entities['PipeBottom' + i].body, pipePair.pipeBottom.pos)

            //Enables player to score points again
            entities['PipeTop' + i].point = false

        }

        //Pipe Movement
        Matter.Body.translate(entities['PipeTop' + i].body, {x: pipeSpeed, y: 0})
        Matter.Body.translate(entities['PipeBottom' + i].body, {x: pipeSpeed, y: 0})
    }

    //Update Engine
    Matter.Engine.update(engine, time.delta)

    //Any collision triggers a game over event
    Matter.Events.on(engine, 'collisionStart', () => {
        dispatch({type: 'gameOver'})
    })

    return entities;

}

export default Physics