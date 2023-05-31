module.exports = {
    components: {
      schemas: {
        // id model
        id: {
          type: "string", // data type
          description: "An id of a todo", // desc
          example: "647738ee435474f8fbdd24c0", // example of an id
        },
        // todo model
        Todo: {
          type: "object", // data type
          properties: {
            id: {
              type: "string", // data-type
              description: "Todo identification number", // desc
              example: "647738ee435474f8fbdd24c0", // example of an id
            },
            title: {
              type: "string", // data-type
              description: "Todo's title", // desc
              example: "Coding in JavaScript", // example of a title
            },
            description: {
                type: "string", // data-type
                description: "Todo's Description", // desc
                example: "Practice Coding in JavaScript", // example of a description
              },
              completed: {
                type: "boolean", // data type
                description: "The status of the todo", // desc
                example: false, // example of a completed value
              },
          },
        },
        // Todo input model
        TodoInput: {
          type: "object", // data type
          properties: {
            title: {
              type: "string", // data type
              description: "Todo's title", // desc
              example: "Coding in JavaScript", // example of a title
            },
            description: {
                type: "string", // data-type
                description: "Todo's title", // desc
                example: "Practice Coding in JavaScript", // example of a description
              },
              completed: {
                type: "boolean", // data type
                description: "The status of the todo", // desc
                example: false, // example of a completed value
              },
          },
        },
        // error model
        Error: {
          type: "object", //data type
          properties: {
            message: {
              type: "string", // data type
              description: "Error message", // desc
              example: "Not found", // example of an error message
            },
            internal_code: {
              type: "string", // data type
              description: "Error internal code", // desc
              example: "Invalid parameters", // example of an error internal code
            },
          },
        },
      },
    },
  };