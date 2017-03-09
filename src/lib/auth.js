
//Save Auth Token and UserDetails;
export const authToken = (token, userDetails) => {
    clearToken();
    localStorage.jwToken = token;
    localStorage.userDetails = JSON.stringify(userDetails);
}

export const jwToken = () => (localStorage.jwToken);
export const userDetails = () => {
    if (!localStorage.userDetails){
        return null;
    }
    
    return JSON.parse(localStorage.userDetails)
}

export const clearToken = () => {
    localStorage.removeItem('jwToken');
    localStorage.removeItem('userDetails');
}

export default jwToken;