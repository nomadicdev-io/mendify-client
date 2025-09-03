function getBrowserName() {
    const userAgent = navigator.userAgent;

    // Check for Edge first (includes 'edg' and 'edge')
    if (/edg|edge/i.test(userAgent)) {
        return "Edge";
    } 
    // Check for Opera (includes 'opr' for Opera and 'opera' for older versions)
    else if (/opr|opera/i.test(userAgent)) {
        return "Opera";
    } 
    // Check for Firefox (includes 'firefox' and 'fxios' for iOS)
    else if (/firefox|fxios/i.test(userAgent)) {
        return "Firefox";
    } 
    // Check for Safari before Chrome (Safari includes 'safari' but Chrome also might on some platforms)
    else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
        return "Safari";
    } 
    // Check for Chrome (includes 'chrome', 'crios' for iOS, 'crmo' for mobile)
    else if (/chrome|crios|crmo/i.test(userAgent)) {
        return "Chrome";
    } 
    // Check for Internet Explorer
    else if (/msie|trident/i.test(userAgent)) {
        return "Internet Explorer";
    } 
    else {
        return "Unknown";
    }
}

export default getBrowserName;