import { APIGatewayProxyHandler } from "aws-lambda";
import Todo from "../models/todo";
import { connectToDatabase } from "../config/db";

export const createTodo: APIGatewayProxyHandler = async (event) => {
  await connectToDatabase();

  const { title, description } = JSON.parse(event.body || "{}");
  const userId = event.requestContext.authorizer?.userId;

  const todo = await Todo.create({ title, description, userId });
  return {
    statusCode: 201,
    body: JSON.stringify(todo),
  };
};

export const getTodos: APIGatewayProxyHandler = async (event) => {
  await connectToDatabase();
  const userId = event.requestContext.authorizer?.userId;
  const todos = await Todo.find({ userId });

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

export const updateTodo: APIGatewayProxyHandler = async (event) => {
  await connectToDatabase();
  const todoId = event.pathParameters?.id;
  const { title, description } = JSON.parse(event.body || "{}");
  const userId = event.requestContext.authorizer?.userId;

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, userId },
    { title, description },
    { new: true }
  );

  if (!updatedTodo) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "To-Do not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedTodo),
  };
};

export const deleteTodo: APIGatewayProxyHandler = async (event) => {
  await connectToDatabase();
  const todoId = event.pathParameters?.id;
  const userId = event.requestContext.authorizer?.userId;

  const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, userId });

  if (!deletedTodo) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "To-Do not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "To-Do deleted" }),
  };
};
