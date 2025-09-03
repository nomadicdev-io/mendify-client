import { PB } from "../App";
import getBrowserName from "./getBrowserName";
import getIP from "./getIP";
import getOSName from "./getOsName";
import getGeoLocation from "./getGeoLocation";

async function userActivityLog(type, user) {

    const { record } = PB.authStore

    const data = {
        user: user || record.id,
        type: type || 'unknown',
        date: new Date(),
        browser: getBrowserName(),
        os: getOSName(),
        ip: await getIP(),
        location: await getGeoLocation(),
    }


    PB.collection('admin_log').create(data)
}

export default userActivityLog;