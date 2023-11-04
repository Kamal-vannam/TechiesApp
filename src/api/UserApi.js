import Base from './BaseApi';

export default class UserAPI extends Base {
 
Getdetails(data) {
  return this.apiClient.get(null,`survey/survey/getall`,data);
}

LoginOtp(intl,data) {
  return this.apiClient.get(intl,`getLoginDetails.php`, data);
}

Events(intl,data) {
  return this.apiClient.get(intl,`getEventDetails.php`,data);
}
Stalls(intl,stall) {
  return this.apiClient.get(intl,`getEventDetails.php`,stall);
}
AllMaths(intl,stall) {
  return this.apiClient.get(intl,`getMathDetails.php`,stall);
}
// Parking(intl,stall) {
//   return this.apiClient.get(intl,`getEventDetails.php`,stall);
// }
getNotification(intl,stall) {
  return this.apiClient.get(intl,`getPushnotifications.php`,stall);
}

Sumangalam(intl,data) {
  return this.apiClient.get(intl,`getEventDetails.php`,data);
}

Matha(intl,data) {
  return this.apiClient.get(intl,`getMathDetails.php`,data);
}
GetParking(intl,data) {
  return this.apiClient.get(intl,`getEventDetails.php`,data);
}

AddRegisterEvent(data,callback) {
  // return this.apiClient.get('', data);
  return this.apiClient.upload(`addEvents.php`, data,callback);
}

Mastermath(intl,data) {
  return this.apiClient.get(intl,`getMaterMathDetails.php`,data);
}

NewRegister(data,isFormData) {

  // return this.apiClient.get('', data);
  return this.apiClient.post('addNewUser.php', data,isFormData);
}

LocationStall(intl,data) {
  return this.apiClient.get(intl,`getEventDetails_byid.php`,data);
}
MathLocation(intl,data) {
  return this.apiClient.get(intl,`getMathDetails_byid.php`,data);
}
// UpdateProfileDetails(data,callback ) {
//   // console.log("callback.......................!",callback);
//   // alert(callback)
//   // return this.apiClient.get('', data);
//   return this.apiClient.upload(`services/membership/update`,data,callback);
// }




  ChangePassword(data) {
    // console.log('ForgotPassword .................... :---- ', data);
    return this.apiClient.post('services/membership/changepassword', data);
  }

  async logout() {
    NetworkInfo.getIPV4Address()
      .then(async ipv4Address => {
        const userInfo = getUserProfileInfo();
        const res = await this.signout(
          {},
          {
            username: userInfo.user_name,
            ipaddress: ipv4Address,
          },
        );
        await saveUserProfileInfo({});
        await saveUserId('');
      })
      .catch(async err => {
        await saveUserProfileInfo({});
        await saveUserId('');
      });
  }

  signout(intl, data) {
    return this.apiClient.post(intl, 'undp-pri/force/signout', data);
  }
}
