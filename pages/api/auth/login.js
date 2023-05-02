import { serialize } from "cookie";
import base64 from "base64-url";
import axl from "app-xbox-live";
import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.post(async (req, res) => {
  //get the email and password from the request body
  const { email = null, password = null } = req.body;

  //try to login to xbox services
  let auth
  try {
    const [token, uhs] = await axl.Token(email, password);
    auth = `XBL3.0 x=${uhs};${token}`;
  } catch (error) {
    return res.status(400).send(error.message);
  }

  //encript this and store in redis for refresh
  // const uhs = auth.split(";")[0];
  // console.log({ uhs, email, password });

  //set the cookie
  const cookie = base64.encode(auth);
  res.setHeader("Set-Cookie", serialize("xbl_auth", cookie, { httpOnly: true, path: "/" }));

  //return with a 200 success
  return res.status(200).send({ success: true, message: 'Login successful' });
});

export default handler;