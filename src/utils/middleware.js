export const isAuthenticated = () => {
    // Check if the user is logged in by verifying a token in localStorage or cookies
    const token = localStorage.getItem("token");
    console.log(token)
    // Or fetch from cookies/session
    return !!token; // Returns true if token exists
};
