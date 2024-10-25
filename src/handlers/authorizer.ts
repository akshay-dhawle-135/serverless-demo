import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
  StatementEffect,
} from "aws-lambda";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret"; // Use a default fallback string

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const token = event.authorizationToken.split(" ")[1];
  console.log("Received token:", token);

  try {
    // Decode and verify JWT token
    const decoded: any = jwt.verify(token, secret);
    console.log("Decoded token:", decoded);

    // Allow access if the token is valid
    return generatePolicy(decoded.userId, "Allow", event.methodArn);
  } catch (error) {
    console.error("Unauthorized - invalid token", error);
    return generatePolicy("user", "Deny", event.methodArn);
  }
};

function generatePolicy(
  principalId: string,
  effect: StatementEffect,
  resource: string
): APIGatewayAuthorizerResult {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context: {
      userId: "1",
    },
  };
}
