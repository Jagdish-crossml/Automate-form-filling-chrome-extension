// Start button in popup.html on click will inject the script programmatically on the document
const btn = document.getElementById("next");

btn.onclick = function () {
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var city = document.getElementById("city").value;
  // Chrome storage API to set storage values to whatever user will type in the Inout fields
  chrome.storage.sync.set(
    { resultset: [firstname, lastname, city] }, // store an array of values inside a key
    function () {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    }
  );
};
btn.addEventListener("click", async () => {
  //Chrome API to get the current tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // Chrome API to execute the script known as injecting the script inside the active document DOM
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id }, // SPecify the target of the function
      files: ["./popup.js"], // Specify an array of files to be injected
    })
    .then(() => {
      console.log("Injected the Popup.js successfully"); // Print in the console if the code has been successfully injected
    });
});
