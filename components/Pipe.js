import Matter from "matter-js";
import React from "react";
import { View } from 'react-native';

//Pipe obstacle that player has to avoid

const Pipe = props => {
    
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;

    return(
        <View style={{
            backgroundColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}/>
    )
}

export default (world, label, color, pos, size) => {
    const thePipe = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true
        }
    )
    Matter.World.add(world, thePipe)

    return {
        body: thePipe,
        color,
        pos,
        renderer: <Pipe/>
    }
}