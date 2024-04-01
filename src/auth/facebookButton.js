import { createButton } from "react-social-login-buttons";

const config = {
  text: "Sign in Facebook",
  icon: "facebook",
  iconFormat: (name) => `fa-brands fa-facebook`,
  style: {
    background: "#3b5998",
    height: "38px",
    width: "176px",
    fontSize: "14px",
  },
  activeStyle: { background: "#293e69" },
};
/** My Facebook login button. */
const MyFacebookLoginButton = createButton(config);

export default MyFacebookLoginButton;
{
  /* <i class="fa-brands fa-facebook"></i> */
}
