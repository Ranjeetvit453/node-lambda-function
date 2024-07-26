"use strict";

const STATUSCODES = require("../httpclient/httpcodes");

module.exports = {
    response: function (
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        let response = {
            responseHeader: {
                responseId: responseId,
                responseCode: responseCode,
                responseMessage: responseMessage,
            },
            responseDetails,
        };

        if (headers) response.headers = headers;
        return response;
    },

    apiresponse: function (
        isBase64Encoded,
        statusCode,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    },

    apiok: function (
        isBase64Encoded,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: STATUSCODES.OK,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    },

    apiRedirect: function (
        isBase64Encoded,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers,
        redirectUrl
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: STATUSCODES.MOVED_PERMANENTLY,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                'Location': redirectUrl
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    },

    apiBadRequest: function (
        isBase64Encoded,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: STATUSCODES.BAD_REQUEST,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    },

    apiServiceUnavailable: function (
        isBase64Encoded,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: STATUSCODES.SERVICE_UNAVAILABLE,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    },

    apiInternalServerError: function (
        isBase64Encoded,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: STATUSCODES.INTERNAL_SERVER_ERROR,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    },

    apiUnauthorized: function (
        isBase64Encoded,
        responseId,
        responseCode,
        responseSubCode,
        responseMessage,
        responseDetails,
        headers
    ) {
        responseDetails = responseDetails ? responseDetails : null;
        return {
            isBase64Encoded: isBase64Encoded,
            statusCode: STATUSCODES.UNAUTHORIZED,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify(
                this.response(
                    responseId,
                    responseCode,
                    responseSubCode,
                    responseMessage,
                    responseDetails,
                    headers
                )
            ),
        };
    }
};