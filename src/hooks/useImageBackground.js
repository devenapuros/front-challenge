import { useEffect, useState } from "react";

/**
 * Get the image data for the dragable element
 * @param imageId the id used to fetch the image data
 * @returns And object containing the image data such as the image url and the image title.
 */
export const useImageBackground = (imageId) => {
    const [imageData, setImageData] = useState({
        url: "",
        title: "Loading...",
    });

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${imageId}`)
            .then((res) => res.json())
            .then((data) => {
                setImageData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [imageId]);

    return imageData;
};
