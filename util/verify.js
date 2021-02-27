const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const validUsers = [ADMIN_TOKEN];

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  if (validUsers.includes(userid)) {
    return true;
  } else {
    return false;
  }
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);

module.exports = verify;
