// src/utils/authUtils.ts
export const sendTokenToBackend = async (idToken: string | undefined): Promise<boolean> => {
    if (!idToken) {
        console.error("No ID token available");
        return false;
    }

    console.log("ID Token in STTB:", idToken);

    try {
        const response = await fetch('http://localhost:8080/api/auth/google', {
            method: 'POST',
            credentials: 'include',  // Include cookies with the request
            headers: {
                'Authorization': `Bearer ${idToken}`, // Include the ID token in the Authorization header
                'Content-Type': 'application/json',  // Set content type to JSON
            },
            // Optionally include a JSON body if your backend expects it
            // body: JSON.stringify({ idToken }), 
        });

        if (response.ok) {
            console.log("User authenticated and created");
            return true;
        } else {
            const errorText = await response.text();
            console.error("Authentication failed", errorText);
            return false;
        }
    } catch (error) {
        console.error("Error during authentication", error);
        return false;
    }
};
