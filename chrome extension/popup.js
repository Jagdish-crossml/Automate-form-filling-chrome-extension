//Javascript function to evaluate an expression and extract XPath in result.
function getElementByXpath(path) {
  return document.evaluate(
    path, //Xpath Expression to be passed as JSON string
    document, //Context Node
    null, // Name Space Resolver
    XPathResult.FIRST_ORDERED_NODE_TYPE, //Result type
    null //Result
  ).singleNodeValue;
}

var data; // to store the response of the Fetch API call.
// fetch_data function to compute xpaths to get HTML elements, and sets input field values to JSON field values

const fetch_data = async function () {
  let url = "http://localhost:8008/fields"; //URL of the locally hosted JSON file which have the data.
  const response = await fetch(url);

  data = await response.json(); // parse the object response into the JSON response
  // Chrome storage get API to retrieve the values from the key.
  chrome.storage.sync.get("resultset", function (items) {
    if (!chrome.runtime.error) {
      console.log(items);
      //loop through all the JSON file XPath fields
      for (index = 0; index <= data.length - 1; index++) {
        const element = getElementByXpath(data[index].xpath); //Pass XPath expression to the function created above.
        debugger;
        //Set evaluated HTML input element's value to the JSON field value
        element.value = items.resultset[index];
      }
    }
  });
};
//Calling the fetch_data function
fetch_data();
