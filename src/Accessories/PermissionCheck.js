
function PermissionCheck(userType, type) {
    if(userType === type || userType === "admin")
        return true;
    return false;
}

export default PermissionCheck;