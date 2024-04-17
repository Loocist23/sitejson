// Load the MediaPipe Hands model
const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  hands.onResults(onHandDetected);
  
  // Start capturing video from webcam
  const videoElement = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
    });
  
  // Function to handle hand detection results
  function onHandDetected(results) {
    const canvas = document.getElementById('output');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        for (const landmark of landmarks) {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;
          context.beginPath();
          context.arc(x, y, 5, 0, 2 * Math.PI);
          context.fillStyle = 'red';
          context.fill();
        }
      }
    }
  }
  
  // Initialize hand detection on video
  hands.initialize().then(() => {
    hands.start(videoElement);
  });
  