const userModel = (data, method) => {

    let userDetails;

    switch (method) {
        case 'GET': userDetails = {
            userID: data.userID,
            userFirstName: data.firstName,
            userLastName: data.lastName,
            userEmail: data.email,
            userMobileNumber: data.mobileNumber,
            userStatus: data.status,
            userGender: data.gender,
            userDob: data.DOB,
            userCountry: data.country
        }
            break;

        case 'PUT': userDetails = {
            firstName: data.userFirstName,
            lastName: data.userLastName,
            email: data.userEmail,
            mobile: data.userMobileNumber,
            country: data.userCountry,
            dob: data.userDob,
            gender: data.userGender
        }
            break;
    }

    return userDetails;
}

export default userModel;