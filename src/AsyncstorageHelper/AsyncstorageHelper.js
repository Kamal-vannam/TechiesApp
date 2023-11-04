import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_PREF = 'language_pref';
const USER_ID = 'userId';
const OTP_DATA = 'otpData';
const JWT_TOKEN = 'jwtToken';
const API_KEY = 'api_key';
const IS_USER_LOGGED_IN = 'isUserLoggedIn';
const USER_ROLE_ID = 'userRoleId'
const NEWUSER_OTP = "newuser_otp";



export const saveUserOtpInfo = async (res) => {

  await AsyncStorage.setItem(OTP_DATA, JSON.stringify(res));
}

// export const getUserOtpInfo = async () => {
//   return await AsyncStorage.getItem(OTP_DATA);
// }
export const getUserOtpInfo = async () => {

  const userOtpInfo = await AsyncStorage.getItem(OTP_DATA);
  // alert(userOtpInfo)
  return userOtpInfo != null ? JSON.parse(userOtpInfo) : null;
  // return userOtpInfo != null ? userOtpInfo : null;
  // return JSON.parse(userOtpInfo);
};

export const newSaveUserOtpInfo = async (res) => {

  await AsyncStorage.setItem(NEWUSER_OTP, JSON.stringify(res));
}


export const getNewUserOtpInfo = async () => {

  const newuserOtpInfo = await AsyncStorage.getItem(NEWUSER_OTP);
  return newuserOtpInfo != null ? JSON.parse(newuserOtpInfo) : null;

};

export const saveLanguagePref = async language => {
  await AsyncStorage.setItem(LANGUAGE_PREF, language);
};

export const getLanguagePref = async () => {
  const language = await AsyncStorage.getItem(LANGUAGE_PREF);
  if (language) {
    return language;
  } else {
    return 'en';
  }
};

export const saveUserProfileInfo = async userInfo => {
  if (userInfo && userInfo.access_token) {
    await AsyncStorage.setItem(JWT_TOKEN, userInfo.access_token);
  } else {
    await AsyncStorage.setItem(JWT_TOKEN, '');
  }
  if (userInfo && userInfo.api_key) {
    await AsyncStorage.setItem(API_KEY, `${userInfo.api_key}`);
  } else {
    await AsyncStorage.setItem(API_KEY, '');
  }
  await AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(userInfo));
};

export const getUserProfileInfo = async () => {
  const userProfileInfo = await AsyncStorage.getItem(LOGIN_DATA);
  return JSON.parse(userProfileInfo);
};

export const saveUserId = async userId => {
  await AsyncStorage.setItem(USER_ID, userId ? `${userId}` : '');
};

export const getUserId = async () => {
  return await AsyncStorage.getItem(USER_ID);
};

export const getApiKey = async () => {
  return await AsyncStorage.getItem(API_KEY);
};

export const getJwtToken = async () => {
  return await AsyncStorage.getItem(JWT_TOKEN);
};

export const setJwtToken = async jwtToken => {
  await AsyncStorage.setItem(JWT_TOKEN, jwtToken);
};

export const getIsUserLoggedIn = async () => {
  return await AsyncStorage.getItem(IS_USER_LOGGED_IN);
};

export const setIsUserLoggedIn = async () => {
  await AsyncStorage.setItem(IS_USER_LOGGED_IN, 'true');
};

export const getUserRoleId = async () => {
  return await AsyncStorage.getItem(USER_ROLE_ID);
};

export const setUserRoleId = async (roleId) => {
  await AsyncStorage.setItem(USER_ROLE_ID, roleId);
};
