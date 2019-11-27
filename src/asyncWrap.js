 function wrap (node, callback = 'asyncError') {
    return {
        "body": [
            {
                "block": node,
                "finalizer": null,
                "handler": {
                    "body": {
                        "body": [
                            {
                                "expression": {
                                    "arguments": [
                                        {
                                            "type": "ThisExpression"
                                        },
                                        {
                                            "name": "error",
                                            "type": "Identifier"
                                        }
                                    ],
                                    "callee": {
                                        "computed": false,
                                        "object": {
                                            "name": 'console',
                                            "type": "Identifier"
                                        },
                                        "property": {
                                            "name": "error",
                                            "type": "Identifier"
                                        },
                                        "type": "MemberExpression"
                                    },
                                    "type": "CallExpression"
                                },
                                "type": "ExpressionStatement"
                            }
                        ],
                        "type": "BlockStatement"
                    },
                    "param": {
                        "name": "error",
                        "type": "Identifier"
                    },
                    "type": "CatchClause"
                },
                "type": "TryStatement"
            }
        ],
        "type": "BlockStatement"
    }
}

module.exports = {
    wrap
}