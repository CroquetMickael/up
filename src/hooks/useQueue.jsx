import React, { useState } from "react";

const useQueue = () => {
    const [elements, setElements] = useState([]);

    const enqueue = (element) => {
        setElements([...elements, element])
    }

    const dequeue = () => {
        elements.shift();
        setElements([...elements]);
    }

    const isEmpty = () => {
        return elements.length === 0;
    }

    const peek = () => {
        return elements[0];
    }

    const length = () => {
        return elements.length;
    }


    return { enqueue, length, peek, dequeue, isEmpty, elements }
}

export { useQueue }