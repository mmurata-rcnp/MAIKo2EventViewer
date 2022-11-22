import { Stage, Layer, Rect, Text } from 'react-konva';

function TrackCanvas({ width, height, title, xmin, xmax, ymin, ymax, xtitle, ytitle, hits, color }) {

    const xOffsetRatio = 0.15
    const yOffsetRatio = 0.05
    const canvasRatio = 0.8
    const titleFontRatio = 0.10
    const titleFontSize = width * titleFontRatio
    const labelFontRatio = 0.04
    const labelFontSize = width * labelFontRatio
    const mapX = (x) => (width * xOffsetRatio + x / (xmax - xmin) * width * canvasRatio)
    const mapY = (y) => (height * yOffsetRatio + (ymax - y) / (ymax - ymin) * height * canvasRatio)
    const widthHit = mapX(1) - mapX(0)
    const heightHit = (tot) => (Math.abs(mapY(tot) - mapY(0)))

    return (<Stage width={width} height={height}>
        <Layer>
            {/* <Rect
                width={width}
                height={height}
                x={0}
                y={0}
                fill="#ffffff"
                stroke="black"
            /> */}
            <Rect
                width={width * canvasRatio}
                height={height * canvasRatio}
                x={width * xOffsetRatio}
                y={height * yOffsetRatio}
                fill="#ffffff"
                stroke="black"
            />
            <Text
                text={title}
                X={0.15 * width}
                y={0.05 * height}
                fontSize={titleFontSize}
                draggable={true}
            />
            {hits.map((comp, index) => (
                <Rect
                    key={"hit-" + index}
                    width={widthHit}
                    height={heightHit(comp[2])}
                    x={mapX(comp[0]) - widthHit / 2}
                    y={mapY(comp[1] + comp[2])}
                    fill={color}
                />
            ))}
            <Text
                text={xmin}
                X={mapX(xmin)}
                y={mapY(ymin) + 0.01 * height}
                fontSize={labelFontSize}
            />
            <Text
                text={xmax}
                X={mapX(xmax) - labelFontSize}
                y={mapY(ymin) + 0.01 * height}
                fontSize={labelFontSize}
            />
            <Text
                text={ymin}
                X={mapX(ymin) - 2.5 * labelFontSize}
                y={mapY(ymin) - 0.01 * height}
                fontSize={labelFontSize}
                align={"right"}
            />
            <Text
                text={ymax}
                X={mapX(xmin) - 2.5 * labelFontSize}
                y={mapY(ymax) - 0.01 * height}
                fontSize={labelFontSize}
                align={"right"}
            />
            <Text
                text={xtitle}
                X={(mapX(xmin) + mapX(xmax)) / 2}
                y={mapY(ymin) + labelFontSize + 0.01 * height}
                fontSize={labelFontSize}
                align={"right"}
            />
            <Text
                text={ytitle}
                X={mapX(xmin) - 2.5 * labelFontSize}
                y={(mapY(ymax) + mapY(ymin)) / 2}
                fontSize={labelFontSize}
                align={"right"}
                rotation={270}
            />
            {/* <Rect
                width={10}
                height={10}
                x={mapX(xmin) - 10 / 2}
                y={mapY(ymin) - 10 / 2}
                fill="#ff0000"
            />
            <Rect
                width={10}
                height={10}
                x={mapX(xmin)}
                y={mapY(ymax)}
                fill="#00ff00"
            />

            <Rect
                width={10}
                height={10}
                x={mapX(xmax)}
                y={mapY(ymax)}
                fill="#0000ff"
            />

            <Rect
                width={10}
                height={10}
                x={mapX(xmax)}
                y={mapY(ymin)}
                fill="#000000"
            /> */}

        </Layer>
    </Stage>)
}

export default TrackCanvas