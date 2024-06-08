import { UserContext } from "../stores/UserContext";

const  AuthenticationState = async() => {
   
    const userStore = UserContext()
    const token = userStore.token

    try {
        const response = await fetch('https://bfbslaravel-production.up.railway.app/api/validate-user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during token validation', error);
        return false;
    }

    
}


    




export default AuthenticationState