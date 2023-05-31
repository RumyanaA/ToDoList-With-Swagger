module.exports = {
    // operation's method
    put: {
      tags: ["Todo CRUD operations"], // operation's tag
      description: "Update todo", // short desc
      operationId: "updateTodo", // unique operation id
      parameters: [
        // expected params
        {
          name: "id", // name of param
          in: "path", // location of param
          schema: {
            $ref: "#/components/schemas/id", // id model
          },
          required: true, // mandatory
          description: "Id of todo to be updated", // short desc.
        },
      ],
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TodoInput", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Todo updated successfully", // response desc.
        },
        // response code
        500: {
          description: "Error occurred while updating the todo.", // response desc.
        },
      },
    },
  };