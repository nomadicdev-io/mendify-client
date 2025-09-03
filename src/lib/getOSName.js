function getOSName() {
  const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }
  if (/win/i.test(userAgent)) {
    return "Windows";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    return "Mac OS";
  }
  if (/linux/i.test(userAgent)) {
    return "Linux";
  }
  return "Unknown";

  }
  
  export default getOSName;