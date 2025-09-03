function getGeoLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return {
                lat: 0,
                lon: 0
            }
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
}

export default getGeoLocation;