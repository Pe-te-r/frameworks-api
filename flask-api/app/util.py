def response(status, message, data=None, error=None, status_code=200):
    """
    Standard API response format.
    
    :param status: "success" or "error"
    :param message: Description of the response
    :param data: Data object (only for success)
    :param error: Error details (only for errors)
    :param status_code: HTTP status code
    :return: Flask response object
    """
    response_body = {
        "status": status,
        "message": message,
    }

    if status == "success":
        response_body["data"] = data
    else:
        response_body["error"] = error

    return response_body, status_code

def validate_required_fields(data, model):
    """
    Validate required fields from a Flask-RESTx model dynamically.

    :param data: Dictionary (JSON payload)
    :param model: Flask-RESTx Model (e.g., register_data)
    :return: (bool, missing_fields, valid_fields)
             - True if all required fields are present, False otherwise
             - List of missing fields (if any)
             - Dictionary containing only valid fields
    """
    required_fields = [field for field, props in model.items() if props.required]
    
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    valid_fields = {field: data[field] for field in model if field in data}

    return len(missing_fields) == 0, missing_fields, valid_fields
