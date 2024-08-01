import Matter from "matter-js";
import React from "react";
import { View } from 'react-native';

//Invisible ceiling to stop player from going off screen

const Ceiling = props => {
    
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return(
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}/>
    )
}

export default (world, pos, size) => {
    const theCeiling = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'Ceiling',
            isStatic: true
        }
    )
    Matter.World.add(world, theCeiling)

    return {
        body: theCeiling,
        pos,
        renderer: <Ceiling/>
    }
}