const login = async (email, password) => {
  try{
    const response = await fetch(import.meta.env.VITE_BACKEND + "auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
}

const isLoggedIn = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "auth/isLoggedIn", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login status check failed");
    }
    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.log("Error during fetching login status:", error);
    return false;
  }
}

export { login, isLoggedIn };