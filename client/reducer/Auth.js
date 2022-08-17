let initState;

if (typeof window != "undefined") {
  initState = JSON.parse(window.localStorage.getItem("user"));
}

const AuthReducer = (state = initState || null, { type, payload }) => {
  switch (type) {
    case "AUTH":
      state = payload;
      window.localStorage.setItem("user", JSON.stringify(state));
      return state;
      break;

    case "LOGOUT":
      state = null;
      window.localStorage.setItem("user", JSON.stringify(state));
      return state;

    default:
      return state;
  }
};

export default AuthReducer;
