// import { AirlineSeatReclineExtraOutlined } from '@mui/icons-material';
import React, { useState } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva';


export default function TrackCanvasWithButtons({ width, height, title, xmin, xmax, ymin, ymax, xtitle, ytitle, hits, color,
    nButtons = 24, onButtonSelect = f => f, disabled = false }) {

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

    const [buttonStatus, setButton] = useState([...Array(nButtons)].map(() => ({ opacity: 0 })))

    return (<Stage width={width} height={height}>
        <Layer>
            <Rect
                width={width}
                height={height}
                x={0}
                y={0}
                fill="#ffffff"
            />
        </Layer>
        <Layer>
            {(() => {
                if (disabled) {
                    return (<Rect
                        width={width * canvasRatio}
                        height={height * canvasRatio}
                        x={width * xOffsetRatio}
                        y={height * yOffsetRatio}
                        fill="#faeeed"
                    />)
                }
            })()}
            <Rect
                width={width * canvasRatio}
                height={height * canvasRatio}
                x={width * xOffsetRatio}
                y={height * yOffsetRatio}
                // fill="#ffffff"
                stroke="black"
            />
            <Text
                text={title}
                X={0.15 * width}
                y={0.05 * height}
                fontSize={titleFontSize}
                draggable={true}
            />
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
        </Layer>
        <Layer>
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
        </Layer>
        <Layer>
            {
                [...Array(nButtons)].map((_, index) => (
                    <Rect
                        key={"buttons-" + String(index)}
                        width={width * canvasRatio / 24}
                        height={height * canvasRatio}
                        x={width * xOffsetRatio + mapX(32 * index) - mapX(0)}
                        y={height * yOffsetRatio}
                        fill={color}
                        // stroke="black"
                        opacity={buttonStatus.at(index).opacity}
                        onMouseOver={e => {
                            setButton(buttonStatus.map((comp, i) => (i === index ? { ...comp, opacity: 0.2 } : { ...comp, opacity: 0 })))
                        }
                        }
                        onMouseOut={e => {
                            setButton(buttonStatus.map((comp, i) => (i === index ? { ...comp, opacity: 0 } : comp)))
                        }
                        }
                        onClick={e => {
                            onButtonSelect(index, color)
                        }}
                    />
                )
                )
            }
        </Layer>
    </Stage>)
}

