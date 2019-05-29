class UserSchema(object):
    Signup = {
        "type": "object",
        "properties": {
            "username": { "type" : "string" },
            "password": { "type" : "string" },
        },
        "required": ["username", "password"],
        "additionalProperties": False
    }

    Login = {
        "type": "object",
        "properties": {
            "username": { "type" : "string" },
            "password": { "type" : "string" },
        },
        "required": ["username", "password"],
        "additionalProperties": False
    }
