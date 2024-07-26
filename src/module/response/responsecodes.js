"use strict";

const baseresponse = require('./baseresponse');

var responseCodes = {};

/* REQUEST VALIDAION BEGIN */

var responseCodes = {};



// Common
responseCodes[exports.SUCCESS_OK =  "OK"]                       = "Request Completed Successfully";
responseCodes[exports.INVALID_REQUEST =  "0001"]                = "Invalid request";
responseCodes[exports.INVALID_URL_FORMAT =  "0002"]             = "Invalid URL format";
responseCodes[exports.INVALID_URL_FORMAT =  "0004"]             = "Invalid URL format";

// Campaign Module
responseCodes[exports.USER_PASSWORD_ID_REQUIRED =  "1101"]           = "Error: The password field is mandatory and must be provided.";
responseCodes[exports.CAMPAIGN_ID_INTEGER =  "1102"]            = "Error: The Campaign Id should only contain integer values.";
exports.getStatusText = function (responseCode) {
    if (responseCodes.hasOwnProperty(responseCode)) {
        return responseCodes[responseCode];
    } else {
        return "undefined code: " + responseCode;
    }
};


//200 http status code response indicating we retrieved the request successfully but there was a business error
exports.SUCCESS_OKResponse = function (responseId, responseCode, responseSubCode, responseMessage, responseDetails) {
    responseId = responseId ? responseId : null;
    responseCode = responseCode ? responseCode : null;
    responseSubCode = responseSubCode ? responseSubCode : null;
    responseMessage = responseMessage ? responseMessage : null;
    responseDetails = responseDetails ? responseDetails : null;

    return baseresponse.apiok(
        false,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        null
    );
};

//200 http status code with interal api error bubbling up to baas
exports.internalOkResponse = function (response) {
    let responseId = response.responseHeader.responseId ? response.responseHeader.responseId : null;
    let responseCode = response.responseHeader.responseCode ? response.responseHeader.responseCode : null;
    let responseSubCode = response.responseHeader.responseSubCode ? response.responseHeader.responseSubCode : null;
    let responseMessage = response.responseHeader.responseMessage ? response.responseHeader.responseMessage : null;
    let responseDetails = response.responseDetails ? response.responseDetails : null;

    return baseresponse.apiok(
        false,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        null
    );
};
//200 http status code with interal api error bubbling up to baas
exports.internalBadResponse = function (response) {
    let responseId = response.responseHeader.responseId ? response.responseHeader.responseId : null;
    let responseCode = response.responseHeader.responseCode ? response.responseHeader.responseCode : null;
    let responseSubCode = response.responseHeader.responseSubCode ? response.responseHeader.responseSubCode : null;
    let responseMessage = response.responseHeader.responseMessage ? response.responseHeader.responseMessage : null;
    let responseDetails = response.responseDetails ? response.responseDetails : null;

    return baseresponse.apiBadRequest(
        false,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        null
    );
};
exports.successResponse = function (responseId, responseDetails, responseSubCode,message="") {
    responseId = responseId ? responseId : null;
    responseDetails = responseDetails ? responseDetails : null;
    responseSubCode = responseSubCode ? responseSubCode : null;
    return baseresponse.apiok(
        false,
        responseId,
        exports.SUCCESS_OK,
        responseSubCode,
        message? message:exports.getStatusText(exports.SUCCESS_OK),
        responseDetails,
        null
    );
};
// //200 http status code success response
// exports.successResponse = function (responseId, responseDetails, responseSubCode) {
//     responseId = responseId ? responseId : null;
//     responseDetails = responseDetails ? responseDetails : null;
//     responseSubCode = responseSubCode ? responseSubCode : null;
//     return baseresponse.apiok(
//         false,
//         responseId,
//         exports.SUCCESS_OK,
//         responseSubCode,
//         exports.getStatusText(exports.SUCCESS_OK),
//         responseDetails,
//         null
//     );
// };

//301 http status code success response
exports.redirectResponse = function (redirectUrl, responseId, responseDetails, responseSubCode) {
    responseId = responseId ? responseId : null;
    responseDetails = responseDetails ? responseDetails : null;
    responseSubCode = responseSubCode ? responseSubCode : null;
    return baseresponse.apiRedirect(
        false,
        responseId,
        exports.SUCCESS_OK,
        responseSubCode,
        exports.getStatusText(exports.SUCCESS_OK),
        responseDetails,
        null,
        redirectUrl
    );
};

//400 http status code with validation error message
exports.validationErrorResponse = function (responseId, responseCode, responseSubCode, responseMessage) {
    responseId = responseId ? responseId : null;
    responseCode = responseCode ? responseCode : null;
    responseSubCode = responseSubCode ? responseSubCode : null;
    responseMessage = responseMessage ? responseMessage : null;

    return baseresponse.apiBadRequest(
        false,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        null,
        null
    );
};


//503 http status code indicating error on Payforward side
exports.apiEndpointErrorResponse = function (endpointError, responseId) {
    responseId = responseId ? responseId : null;

    return baseresponse.apiServiceUnavailable(
        false,
        responseId,
        endpointError,
        null,
        exports.getStatusText(endpointError),
        null,
        null
    );
};

//503 http status code with error associated with downstream service
exports.gatewayErrorResponse = function (responseId) {
    responseId = responseId ? responseId : null;

    return baseresponse.apiServiceUnavailable(
        false,
        responseId,
        exports.GATEWAY_ERROR,
        null,
        exports.getStatusText(exports.GATEWAY_ERROR),
        null,
        null
    );
};

//500 http status code indicating generic unexpected server error 
exports.serverErrorResponse = function (responseId, responseCode, responseSubCode, responseMessage) {
    responseId = responseId ? responseId : null;
    responseCode = responseCode ? responseCode : null;
    responseSubCode = responseSubCode ? responseSubCode : null;
    responseMessage = responseMessage ? responseMessage : null;

    return baseresponse.apiInternalServerError(
        false,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        null,
        null
    );
};



//401 http status code indicating unauthorized access 
exports.unauthorizedErrorResponse = function (responseId, responseCode, responseSubCode, responseMessage) {
    responseId = responseId ? responseId : null;
    responseCode = responseCode ? responseCode : null;
    responseSubCode = responseSubCode ? responseSubCode : null;
    responseMessage = responseMessage ? responseMessage : null;

    return baseresponse.apiUnauthorized(
        false,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        null,
        null
    );
};
