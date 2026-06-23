const { OAuth2Client } = require("google-auth-library");
const config = require("./app.config");
const googleClient = new OAuth2Client(config.google.clientId);

const verifyGoogleToken = async (idToken) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: config.google.clientId,
  });
  const payload = ticket.getPayload();
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
  };
};

module.exports = { googleClient, verifyGoogleToken };
