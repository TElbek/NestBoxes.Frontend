export const formatDate = (date) => {
    const options = {
        month: 'long',
        day: '2-digit'
    };

    return new Date(date).toLocaleDateString('da-DK', options);
};