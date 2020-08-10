
function PermissionCheck(userType, type) {
    return userType === type || userType === "admin";
}

export default PermissionCheck;