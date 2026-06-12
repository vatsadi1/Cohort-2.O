import React, { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const requestRef = useRef(null);
  const emotionRef = useRef("");
  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [expression, setExpression] = useState(
    "Loading Camera..."
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
          );

        const faceLandmarker =
          await FaceLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
              },
              runningMode: "VIDEO",
              outputFaceBlendshapes: true,
              numFaces: 1,
            }
          );

        landmarkerRef.current =
          faceLandmarker;

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: {
                width: 1280,
                height: 720,
              },
            }
          );

        streamRef.current = stream;

        if (!videoRef.current)
          return;

        videoRef.current.srcObject =
          stream;

        videoRef.current.onloadedmetadata =
          async () => {
            await videoRef.current.play();

            setExpression(
              "Click Detect Expression"
            );
          };
      } catch (error) {
        console.error(error);
        setExpression(
          "❌ Camera / Model Error"
        );
      }
    };

    initialize();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(
          requestRef.current
        );
      }

      if (
        streamRef.current
      ) {
        streamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };
  }, []);

  const startDetection = (
    landmarker
  ) => {
    const predict = () => {
      const video =
        videoRef.current;

      if (
        video &&
        video.readyState >= 2
      ) {
        const result =
          landmarker.detectForVideo(
            video,
            performance.now()
          );

        if (
          result.faceBlendshapes &&
          result.faceBlendshapes.length >
            0
        ) {
          const blendshapes =
            result.faceBlendshapes[0]
              .categories;

          const scores = {};

          blendshapes.forEach(
            (item) => {
              scores[
                item.categoryName
              ] = item.score;
            }
          );

          const avg = (
            ...names
          ) =>
            names.reduce(
              (
                total,
                name
              ) =>
                total +
                (scores[
                  name
                ] || 0),
              0
            ) /
            names.length;

          const smile =
            avg(
              "mouthSmileLeft",
              "mouthSmileRight"
            );

          const mouthFrown =
            avg(
              "mouthFrownLeft",
              "mouthFrownRight"
            );

          const jawOpen =
            scores.jawOpen ||
            0;

          const browUp =
            scores.browInnerUp ||
            0;

          let emotion =
            "😐 Neutral";

          if (
            jawOpen > 0.25 &&
            browUp > 0.2 &&
            smile < 0.2
          ) {
            emotion =
              "😲 Surprised";
          } else if (
            smile > 0.25
          ) {
            emotion =
              "😊 Happy";
          } else if (
            mouthFrown >
              0.03 &&
            smile < 0.15
          ) {
            emotion =
              "😢 Sad";
          }

          if (
            emotionRef.current !==
            emotion
          ) {
            emotionRef.current =
              emotion;

            setExpression(
              emotion
            );
          }
        }
      }

      requestRef.current =
        requestAnimationFrame(
          predict
        );
    };

    predict();
  };

  const handleDetect =
    () => {
      if (
        !landmarkerRef.current
      ) {
        setExpression(
          "Model not loaded"
        );
        return;
      }

      if (
        requestRef.current
      ) {
        cancelAnimationFrame(
          requestRef.current
        );
      }

      startDetection(
        landmarkerRef.current
      );
    };

  const stopDetection =
    () => {
      if (
        requestRef.current
      ) {
        cancelAnimationFrame(
          requestRef.current
        );
        requestRef.current =
          null;
      }

      setExpression(
        "Detection Stopped"
      );
    };

  return (
    <div
      style={{
        display: "flex",
        flexDirection:
          "column",
        alignItems:
          "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
        style={{
          border:
            "2px solid #ddd",
          borderRadius:
            "12px",
        }}
      />

      <h2>{expression}</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={
            handleDetect
          }
          style={{
            padding:
              "10px 20px",
            cursor:
              "pointer",
          }}
        >
          Detect Expression
        </button>

        <button
          onClick={
            stopDetection
          }
          style={{
            padding:
              "10px 20px",
            cursor:
              "pointer",
          }}
        >
          Stop Detection
        </button>
      </div>
    </div>
  );
};

export default FaceExpressionDetector;