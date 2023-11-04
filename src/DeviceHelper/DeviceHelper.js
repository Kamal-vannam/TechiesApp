import NetInfo from '@react-native-community/netinfo';
import {Linking, Platform, Share} from 'react-native';
var CryptoJS = require('crypto-js');

const DeviceHelper = {
  isConnectedToInternet: async function () {
    try {
      let state = await NetInfo.fetch();
      console.log('state.isConnected :- ', state.isConnected);
      return state.isConnected;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  encryptData: function (data) {
    console.log('data2', data);
    let encryptedBase64Key = 'ZGhhbnVzaEAhQCMkJGluZg==';
    let parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    let encryptedData = CryptoJS.AES.encrypt(data, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
    console.log('encryptedData :- ', encryptedData);
    return encryptedData;
  },

  decryptData: function (data) {
    let encryptedBase64Key = 'ZGhhbnVzaEAhQCMkJGluZg==';
    let parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    let decryptedData = CryptoJS.AES.decrypt(data, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  },
  generateRandomHash: function (data) {
    if (data != '' || data != null) {
      let salt = this.hex(6);
      let hash = CryptoJS.HmacSHA256(data, salt).toString(CryptoJS.enc.Hex);
      return hash;
    } else return null;
  },

  hex: function (n) {
    n = n || 16;
    var result = '';
    while (n--) {
      result += Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
    }
    return result;
  },

  generateHmacSHA512Hash: function (password) {
    if (password != '' || password != null) {
      let salt = 'dhanush@!@#$$infotech@!@#$$';
      let hash = CryptoJS.HmacSHA256(password, salt).toString(CryptoJS.enc.Hex);
      return hash;
    } else return null;
  },
};

export const makeCall = number => {
  let numberURL;
  if (Platform.OS != 'android') {
    numberURL = `telprompt:${number}`;
  } else {
    numberURL = `tel:${number}`;
  }
  Linking.canOpenURL(numberURL)
    .then(supported => {
      if (!supported) {
        // alert("Phone number is not available",
        //      () => {}, "OK", "Invalid Number")
      } else {
        return Linking.openURL(numberURL);
      }
    })
    .catch(err => console.log(err));
};

export const ShareToOtherApp = async (title, message) => {
  try {
    const result = await Share.share({
      message: message,
      title: title,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // AppOkAlert("Please try again after sometime.", () => {});
  }
};

export const OpenLinkToOtherApp = link => {
  Linking.canOpenURL(link).then(supported => {
    if (supported) {
      Linking.openURL(link);
    } else {
      console.log("Don't know how to open URI: " + this.props.url);
    }
  });
};

export default DeviceHelper;
