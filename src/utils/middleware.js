export const isAuthenticated = () => {
    // Check if the user is logged in by verifying a token in localStorage or cookies
    const token = localStorage.getItem("token");
    // Or fetch from cookies/session
    return !!token; // Returns true if token exists
};

export const getOwnerIdFromToken = () => {
    const token = localStorage.getItem("token"); // Adjust key name if needed
    if (!token) return null;

    try {
        // Decode Base64 (JWT structure: Header.Payload.Signature)
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload)
        return payload.userId; // Extract ownerId from the decoded payload
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
