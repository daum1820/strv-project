
//Save Auth Token and UserDetails;
export const authToken = (token, userDetails) => {
    clearToken();
    localStorage.setItem('jwToken', token);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
}

export const jwToken = () => (localStorage.getItem('jwToken'));
export const userDetails = () => {
    if (!localStorage.getItem('userDetails')){
        return null;
    }
    
    return JSON.parse(localStorage.getItem('userDetails'))
}

export const clearToken = () => {
    localStorage.clear();
}

export default jwToken;