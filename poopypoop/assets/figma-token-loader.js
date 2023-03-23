console.log("it works!!");
var webtokens = null;
$.ajax({
    url: "https://studiokit.org/get_figma_tokens.php",
    type: "get", //send it through get method
    data: { 
      url: document.getElementById("figma-token-link").textContent
    },
    success: function(response) {
      //Do Something
      console.log(response);
      //webtokens = JSON.parse(response);
      const options = {
        pretty: false,
        element: ''
      }
      var newJson = jsonToCssVariables(JSON.parse(response), options);
      //root.style
      console.log(newJson);

      var sheet = document.createElement('style')
    sheet.innerHTML = newJson;
    document.body.appendChild(sheet);

      document.getElementById("figma-style").value = newJson;
      document.getElementById("figma-style").innerText = newJson;
    },
    error: function(xhr) {
      //Do Something to handle error
      console.log('BAD response',xhr);
    }
  });







function objectToCss(arrayVal, options){
var output = "";
	 for (let key in arrayVal) {
        let value = arrayVal[key]
  
        if (!isNaN(value) && value !== 0) {
          value += options.unit === undefined ? 'px' : options.unit
        }
        if ('value' in value)
        {
            console.log("FOUND:",key,value['value']);
            document.documentElement.style.setProperty("--"+key, value['value']);
 output += `${options.pretty ? '\t' : ''}--${key}: ${value['value']};${options.pretty ? '\n' : ''}`;
}else{
 output += `${options.pretty ? '\t' : ''}--${key}: ${value};${options.pretty ? '\n' : ''}`;
}
        
        
   }
   return output;
}

function jsonToCssVariables(json, options) {
    options = options || {}
  
    const offset = options.offset === undefined ? 0 : options.offset
  
    let count = 0
    let output = `${options.element ? options.element : ':host'} {${options.pretty ? '\n' : ''}`
  
    for (let key in json) {
        let value = json[key]
  
        if (!isNaN(value) && value !== 0) {
          value += options.unit === undefined ? 'px' : options.unit
        }
        
        if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
    ) {
    
			output += objectToCss(value, options);
      continue;
      
    }
  
        output += `${options.pretty ? '\t' : ''}--${key}: ${value};${options.pretty ? '\n' : ''}`
      
  
      count++;
    }
  
    output += '}';
  
    return output;
  }