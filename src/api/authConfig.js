// frontend/src/api/authConfig.js
export const getAuthConfig = () => {
  // adjust according to how you store token in login response
  const token = localStorage.getItem("token") || (() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    return u?.token || u?.data?.token || "";
  })();

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};
