import React, { useState } from "react";
import { Component } from "./components/Component";

const App = () => {
    const [moveableComponents, setMoveableComponents] = useState([]);
    const [selected, setSelected] = useState(null);

    /**
     * Create a new moveable component and add it to the array
     */
    const addMoveable = () => {
        const newMoveableId = Math.floor(Math.random() * Date.now());
        setMoveableComponents([
            ...moveableComponents,
            {
                id: newMoveableId,
                image: Math.floor(Math.random() * 4000),
                top: 10,
                left: 10,
                width: 150,
                height: 150,
                updateEnd: true,
            },
        ]);
        setSelected(newMoveableId);
    };

    /**
     * Updates the moveable component with the specified id
     * @param id the id of the moveable component to update
     * @param newComponent the new moveable component data such as top and left position.
     */
    const updateMoveable = (id, newComponent, updateEnd = false) => {
        const updatedMoveables = moveableComponents.map((moveable, i) => {
            if (moveable.id === id) {
                return { id, ...newComponent, updateEnd };
            }
            return moveable;
        });
        setMoveableComponents(updatedMoveables);
    };

    /**
     * Delete the currently selected moveable component
     */
    const deleteMoveable = () => {
        console.log(moveableComponents);
        console.log(selected);
        const new_moveables = moveableComponents.filter(
            (moveable) => moveable.id !== selected
        );
        console.log(new_moveables);
        setMoveableComponents(new_moveables);
        setSelected(null);
    };

    return (
        <main>
          <h1>Drawing app</h1>
            <div className="actions-container">
                <button className="btn primary-btn" onClick={addMoveable}>
                    Add new Moveable
                </button>
                {selected && (
                    <button className="btn danger-btn" onClick={deleteMoveable}>
                        Delete
                    </button>
                )}
            </div>
            <div id="parent">
                {moveableComponents.map((item, index) => (
                    <Component
                        {...item}
                        key={index}
                        updateMoveable={updateMoveable}
                        setSelected={setSelected}
                        isSelected={selected === item.id}
                    />
                ))}
            </div>
        </main>
    );
};

export default App;
