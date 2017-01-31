/**
Credit card validation script.
call validateCard(cardNumber) to validate a card number

return {
cardType: //String value: one of ['Visa', 'Mastercard',
isValid: //Boolean value. }

**/


var UNKNOWN = "Unknown"
var MASTERCARD_CARD_TYPE = {
    name: "Mastercard",
    lengths: [16],
    ranges: [{
        minStart: "2221",
        maxStart: "2720"
    }, {
        minStart: "51",
        maxStart: "55"
    }],
    isValid: true
}
var AMERICAN_EXPRESS_CARD_TYPE = {
    name: "American Express",
    lengths: [15],
    ranges: [{
        minStart: "34",
        maxStart: "34"
    }, {
        minStart: "37",
        maxStart: "37"
    }],
    isValid: true
}
var VISA_CARD_TYPE = {
    name: "Visa",
    lengths: [13, 16, 19],
    ranges: [{
        minStart: "4",
        maxStart: "4"
    }],
    isValid: true
}

var VALID_CARD_TYPES = [MASTERCARD_CARD_TYPE, AMERICAN_EXPRESS_CARD_TYPE, VISA_CARD_TYPE]
var INVALID_CARD_TYPE = {
    name: UNKNOWN,
    isValid: false
}
var MINIMUM_CARD_LENGTH = 13;

function validateCard(cardNumber) {
    var validatedType = INVALID_CARD_TYPE
    if (validateCardSyntax(cardNumber)) {
        validatedType = identifyCardType(cardNumber)
    }
    return {
        cardType: validatedType.name,
        isValid: validatedType.isValid
    }
}

function validateCardSyntax(cardNumber) {
    if (cardNumber.length < MINIMUM_CARD_LENGTH) {
        return false
    }
    var pattern = /^[0-9]+$/
    if (!pattern.test(cardNumber)) {
        return false
    }
    var isValidLuhn = isValidIdentifier(cardNumber)
    return isValidLuhn
}

function identifyCardType(cardNumber) {
    var cardType = INVALID_CARD_TYPE
    forEach(VALID_CARD_TYPES, function(aCardType) {
        if (isCardType(cardNumber, aCardType)) {
            cardType = aCardType
        }
    })
    return cardType
}

function isCardType(cardNumber, cardType) {
    var match = false
    for (index = 0; index < cardType.lengths[index]; index++) {
        if (cardNumber.length == cardType.lengths[index]) {
            match = true
            break
        }
    }
    if (!match) {
        return false
    }
    for (index = 0; index < cardType.ranges.length; index++) {
        issuerNumberString = cardNumber.slice(0, cardType.ranges[index].minStart.length)
        var min = parseInt(cardType.ranges[index].minStart)
        var max = parseInt(cardType.ranges[index].maxStart)
        var valueToTest = parseInt(issuerNumberString)
        if (valueToTest >= min && valueToTest <= max) {
            return true
        }
    }
    return false
}
