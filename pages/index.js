import { login } from "@/utils/functions.js"
import base64 from "base64-url";

export default function Home() {
  return (
    <>Hello World!</>
  )
}

export async function getServerSideProps({ req, res }) {
  const { xbl_auth = null } = req.cookies;
  if (!xbl_auth) return {
    props: {}
  }
  const auth = base64.decode(xbl_auth);
  const xl = await login(auth);
  const user = await xl.me.profile.get();
  const profile = await xl.people.profile.get(user.userXuid);
  const image = profile.profileUsers[0].settings.find(x => x.id === "GameDisplayPicRaw");

  console.log(image)
  //console.log(xl)
  return {
    props: {}, // will be passed to the page component as props
  }
}
