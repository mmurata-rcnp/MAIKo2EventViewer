import { Stage, Layer, Rect, Text, Circle } from 'react-konva';

function GraphCanvas(props) {


    return <Stage width={props.width} height={props.height}>
        <Layer>
            <Rect
                width={props.width * 0.8}
                height={props.height * 0.8}
                x={props.width * 0.15}
                y={props.height * 0.05}
                fill="#ffffff"
                stroke="black"
            />
            <Text
                text="title of canvas"
                X={0.15 * props.width}
                y={0.05 * props.height}
            />
            <Text
                text={props.xmin}
                x={0.15 * props.width}
                y={0.85 * props.height}
                align="left"
                verticalAlign='top'
            />
            <Text
                text={props.xmax}
                x={0.9 * props.width}
                y={0.85 * props.height}
                align="right"
                verticalAlign='top'
            />
            <Circle
                x={0.5 * props.width}
                y={0.5 * props.height}
                draggable
                width={0.1 * props.width}
                height={0.1 * props.height}
                fill="#00ff00"
            />
            {[...Array(1000)].map((item, index) => (
                <Circle
                    x={0.5 * props.width * Math.random()}
                    y={0.5 * props.height + 100 * index}
                    draggable
                    width={0.05 * props.width}
                    height={0.05 * props.height}
                    fill="#0000ff"
                />
            ))}
        </Layer>



    </Stage >
}

export default GraphCanvas;