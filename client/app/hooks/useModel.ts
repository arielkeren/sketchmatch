import { useCallback, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { WORDS } from "../words";

const useModel = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      setModel(await tf.loadLayersModel("/model/model.json"));
    };
    loadModel();
  }, []);

  const getCanvasImage = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData;
  };

  const preprocessImage = (imageData: ImageData) => {
    return tf.tidy(() => {
      let img = tf.browser.fromPixels(imageData, 1);
      img = tf.image.resizeBilinear(img, [28, 28]);
      img = img.div(255.0).expandDims(0);
      return img;
    });
  };

  const makePrediction = useCallback(
    (image: tf.Tensor3D) => {
      if (!model) return null;

      const predictions = model.predict(image) as tf.Tensor;
      const classIndex = predictions.argMax(1).dataSync()[0];

      return WORDS[classIndex];
    },
    [model]
  );

  const guessSketch = useCallback(
    (canvas: HTMLCanvasElement) => {
      const imageData = getCanvasImage(canvas);
      if (!imageData) return;

      const processedImage = preprocessImage(imageData);
      const guess = makePrediction(processedImage);

      return guess;
    },
    [makePrediction]
  );

  return guessSketch;
};

export default useModel;
