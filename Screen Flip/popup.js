document.addEventListener("DOMContentLoaded", function() {
  let rotationAngle = 0; // Initial rotation angle

  // Function to flip the screen upside down
  function rotateScreen() {
    rotationAngle += 90; // Increment rotation angle by 90 degrees

    // If the rotation angle is 360 degrees, reset it to 0
    if (rotationAngle === 360) {
      rotationAngle = 0;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      if (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (angle) => {
            document.body.style.transform = `rotate(${angle}deg)`;
            document.body.style.filter = "invert(100%)";
          },
          args: [rotationAngle] // Pass the rotation angle to the content script
        });
      }
    });
  }

  // Add a click event listener to the button
  document.getElementById("rotateButton").addEventListener("click", rotateScreen);
});
