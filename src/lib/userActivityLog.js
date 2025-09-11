import getBrowserName from "./getBrowserName";
import getIP from "./getIP";
import getGeoLocation from "./getGeoLocation";

async function userActivityLog(type, user) {

    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
    let os

    if (/windows phone/i.test(userAgent)) {
      os = "Windows Phone";
    }
    if (/win/i.test(userAgent)) {
      os = "Windows";
    }
    if (/android/i.test(userAgent)) {
      os = "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      os = "iOS";
    }
    if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
      os = "Mac OS";
    }
    if (/linux/i.test(userAgent)) {
      os = "Linux";
    }


    const data = {
        user: '',
        type: type || 'unknown',
        date: new Date(),
        browser: getBrowserName(),
        os: os,
        ip: await getIP(),
        location: await getGeoLocation(),
    }
    
    return data

}

export default userActivityLog;