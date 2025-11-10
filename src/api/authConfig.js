export const getAuthConfig = (isFormData = false) => {
  let token = localStorage.getItem("token");

  if (!token) {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    token = storedUser?.token || storedUser?.data?.token || "";
  }

  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return { headers };
};
