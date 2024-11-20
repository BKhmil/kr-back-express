export const STATUS_WITH_MESSAGE_CONSTANT = {
    CREATED: {
        code: 201,
        messages: {
            default: "The resource was successfully created.",
        },
    },
    NO_CONTENT: {
        code: 204,
        messages: {}
    },
    BAD_REQUEST: {
        code: 400,
        messages: {
            default: "The server could not understand the request due to invalid syntax.",
            bearer_header: "Authorization header must follow 'Bearer [token]' format.",
            missing_field: "A required field is missing in the request.",
            invalid_token_type: "Invalid token type provided."
        },
    },
    UNAUTHORIZED: {
        code: 401,
        messages: {
            default: "Authentication is required and has failed or has not yet been provided.",
            missing_header: "Authorization header is required to access this resource.",
            invalid_token: "The provided token is invalid.",
            expired_token: "The provided token has expired.",
            invalid_credentials: "The request has not been applied because it lacks valid authentication credentials for the target resource."
        },
    },
    FORBIDDEN: {
        code: 403,
        messages: {
            default: "You do not have permission to access the requested resource.",
            insufficient_rights: "You lack sufficient privileges to perform this action.",
        },
    },
    NOT_FOUND: {
        code: 404,
        messages: {
            default: "The requested resource could not be found.",
            route_not_found: "The requested API endpoint does not exist.",
            resource_not_found: "The requested resource is not available.",
        },
    },
    METHOD_NOT_ALLOWED: {
        code: 405,
        messages: {
            default: "The request method is not supported for the requested resource.",
        },
    },
    CONFLICT: {
        code: 409,
        messages: {
            default: "The request could not be completed due to a conflict.",
            duplicate_entry: "A resource with the same identifier already exists.",
        },
    },
    UNPROCESSABLE_ENTITY: {
        code: 422,
        messages: {
            default: "The server understands the content type but was unable to process the contained instructions.",
            validation_error: "One or more fields failed validation.",
        },
    },
    TOO_MANY_REQUESTS: {
        code: 429,
        messages: {
            default: "Too many requests have been made in a given amount of time.",
        },
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        messages: {
            default: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
            database_error: "An internal database error occurred.",
            unknown_error: "An unknown error occurred.",
        },
    },
    NOT_IMPLEMENTED: {
        code: 501,
        messages: {
            default: "The server does not support the functionality required to fulfill the request.",
        },
    },
    BAD_GATEWAY: {
        code: 502,
        messages: {
            default: "The server received an invalid response from the upstream server.",
        },
    },
    SERVICE_UNAVAILABLE: {
        code: 503,
        messages: {
            default: "The server is currently unavailable (e.g., overloaded or down for maintenance).",
        },
    },
    GATEWAY_TIMEOUT: {
        code: 504,
        messages: {
            default: "The server did not receive a timely response from the upstream server.",
        },
    },
} as const;
