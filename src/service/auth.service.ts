import jwt from "express-jwt";
import rsa from "jwks-rsa";

const fastTokenCheck = jwt({
  secret: rsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://harshanarayana.auth0.com/.well-known/jwks.json`
  }),
  issuer: `https://harshanarayana.auth0.com/`,
  algorithms: ["RS256"]
});

export default fastTokenCheck;
