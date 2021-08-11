const getAuthInfo = () => JSON.parse(localStorage.getItem('userId'));

export default getAuthInfo;
