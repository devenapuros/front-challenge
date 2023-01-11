/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import { useImageBackground } from "../hooks/useImageBackground";

export const Component = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    id,
    image = 1,
    setSelected,
    isSelected = false,
    updateEnd,
}) => {
    const ref = useRef();
    const imageData = useImageBackground(image);
    const [elementGuidelines, setElementGuidelines] = useState([]);
    const [frame, setFrame] = useState({ translate: [0, 0] });

    useEffect(() => {
        setElementGuidelines([...document.querySelectorAll(".draggable")]);
    }, []);

    
    const handleResizeStart = (e) => {
        e.setOrigin(["%", "%"]);
        e.dragStart && e.dragStart.set(frame.translate);
    };

    const handleResize = (e) => {
        const beforeTranslate = e.drag.beforeTranslate;

        frame.translate = beforeTranslate;
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    };

    const handleDrag = (e) => {
        updateMoveable(id, {
            image,
            top: e.top,
            left: e.left,
            width,
            height,
        });
    };

    return (
        <>
            <div
                ref={ref}
                className="draggable"
                id={"component-" + id}
                style={{
                    position: "absolute",
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                }}
                onClick={() => setSelected(id)}
            >
                <img
                    className="image-moveable"
                    src={imageData.url}
                    alt={imageData.title}
                />
            </div>

            <Moveable
                target={isSelected && ref.current}
                onDrag={handleDrag}
                onResizeStart={handleResizeStart}
                onResize={handleResize}
                keepRatio={false}
                throttleResize={1}
                renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                edge={false}
                zoom={1}
                origin={false}
                padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
                resizable
                draggable
                elementGuidelines={elementGuidelines}
                snappable={true}
                verticalGuidelines={[0, 200, 400]}
                horizontalGuidelines={[0, 200, 400]}
                snapThreshold={5}
                isDisplaySnapDigit={true}
                snapGap={true}
                snapDirections={{
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                }}
                elementSnapDirections={{
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                }}
                snapDigit={0}
            />
        </>
    );
};
