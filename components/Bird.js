import Matter from "matter-js";
import React from "react";
import { View } from 'react-native';

//Player avatar

const Bird = props => {

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
            height: heightBody,
            borderRadius: widthBody / 2
        }}/>
    )
}

export default (world, color, pos, size) => {
    const theBird = Matter.Bodies.circle(
        pos.x,
        pos.y,
        size.width / 2,
        {label: 'Bird'}
    )
    Matter.World.add(world, theBird)

    return {
        body: theBird,
        color,
        pos,
        renderer: <Bird/>
    }
}