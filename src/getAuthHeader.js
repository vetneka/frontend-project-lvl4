const getAuthHeader = () => {
  try {
    const userId = JSON.parse(localStorage.getItem('userId'));

    return {
      Authorization: `Bearer ${userId.token}`,
    };
  } catch (error) {
    console.error(error);

    return {};
  }
};

export default getAuthHeader;
