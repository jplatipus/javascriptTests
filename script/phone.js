/**

Format a phone number (web page utility)

call function validateAndFormatPhoneNumber(inputId, outputId)

where:
- inputId.value is the value to Format
- outputId.textContent is where to put the result

**/

function validateAndFormatPhoneNumber(inputId, outputId) {
  var number = document.getElementById(inputId).value
  if (!validatePhoneNumber(number, alert)) {
    return
  }
  var strippedNumber = stripNumber(number)
  if (strippedNumber.length < 5 || number.length > 15) {
      alert("Please enter between 5 and 10 digits")
      return
  }
  formatedNumber = formatStrippedNumber(strippedNumber)
  document.getElementById(outputId).textContent = formatedNumber
}

function validatePhoneNumber(number, onError) {
    var pattern = /^([0-9]|\s|\-)+$/
    if (!pattern.test(number)) {
        onError("Only digits, spaces, hyphens please")
        return false
    }
    return true
}

function formatStrippedNumber(number) {
  var dupple = {chunks: new Array(), number: number}
  dupple = extractChunks(dupple)
  return dupple.chunks.join("-")
}

function extractChunks(dupple) {
  if (dupple.number.length % 3 == 0 || dupple.number.length > 4) {
    var chunk = dupple.number.slice(0, 3)
    dupple.chunks[dupple.chunks.length] = chunk
    dupple.number = dupple.number.slice(3)
  }
  else {
    var chunk = dupple.number.slice(0, 2)
    dupple.chunks[dupple.chunks.length] = chunk
    dupple.number = dupple.number.slice(2)
  }
  if (dupple.number.length > 0) {
    dupple = extractChunks(dupple)
  }
  return dupple
}

function stripNumber(number) {
  var replacements = [[/\-/g, ""], [/\s/g, ""]]
  forEach(replacements, function(replace) {
    number = number.replace(replace[0], replace[1])
  })
  return number
}

function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}
