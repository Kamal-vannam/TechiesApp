import queryString from 'query-string';
import PubSub from 'pubsub-js';
// import Config from 'react-native-config';
import DeviceHelper from '../DeviceHelper/DeviceHelper';
import { TOKEN_EXPIRE } from '../utils/utils';
import { getApiKey, getJwtToken } from '../AsyncstorageHelper/AsyncstorageHelper';
import Config from "react-native-config";

//export const API_BASE_URL = 'http://undppri.dhanushinfotech.com'; //Dev
//export const API_BASE_URL = 'https://undppriqa.dhanushinfotech.com'; //QA

//export const API_BASE_URL = 'https://tribaltms.dhanushinfotech.com'; //Pro
// export const API_BASE_URL = 'https://adiprashikshan.tribal.gov.in'; //NIC
// export const API_BASE_URL = 'https://apps.apbjpdata.org'; //NIC
//export const API_BASE_URL = Config.API_URL;
export const API_BASE_URL=Config.API_URL;

export const API_STATUS = {
  NO_INTERNET: 'NO_INTERNET',
  BAD_REQUEST: 'BAD_REQUEST',
  SERVER_ERROR: 'SERVER_ERROR',
  CODE_ERROR: 'CODE_ERROR',
  OK: 'OK',
};

export default class ApiClient {
  constructor(prefix = '/api') {
    this.prefix = API_BASE_URL;
  }

  get(intl, requestUrl, params, itemValue = {}) {
    return this.request({
      intl: intl,
      url: requestUrl,
      method: 'get',
      params,
      itemValue:itemValue
      
    });
  }

  // post(requestUrl, payload={} ) {
  //   return this.request({
  //     url: requestUrl,
  //     method: 'post',
  //     body: payload,
  //   });
  // }
  post(requestUrl,payload = {},isFormData) {
    return this.request({
      url: requestUrl,
      method: 'post',
      body: payload,
      isFormData:isFormData
      
    });
  }
  
  postParams(intl, requestUrl, params = {}) {
    return this.request({
      intl: intl,
      url: requestUrl,
      method: 'post',
      params,
    });
  }

  put(intl, requestUrl, payload = {}) {
    return this.request({
      intl: intl,
      url: requestUrl,
      method: 'put',
      body: payload,
    });
  }

  patch(intl, requestUrl, payload = {}) {
    return this.request({
      intl: intl,
      url: requestUrl,
      method: 'patch',
      body: payload,
    });
  }

  delete(intl, requestUrl) {
    return this.request({
      intl: intl,
      url: requestUrl,
      method: 'delete',
    });
  }

  upload( requestUrl, payload = {}, callback = () => {}) {
    console.log("payloaduplp",requestUrl)
    return this.uploadFile({
      url: requestUrl,
      method: 'post',
      body: payload,
      callback: callback,
    });
  }

  uploadFile = async ({ url, method, params = {}, body, callback  }) => {
    // alert(url)
    // alert(callback)
    // alert(JSON.stringify(body))
    // TODO function to upload files
    const isConnected = await DeviceHelper.isConnectedToInternet();
    const jwtToken = await getJwtToken();
    if (!isConnected) {
      const res = {
        error: NO_INTERNET_MSG,
        message: NO_INTERNET_MSG,
        noInternet: true,
      };
      return res;
    }
    console.log('body ====> ', body);
    const urlWithQuery = `${url}?${queryString.stringify(params)}`;
    // const urlWithQuery = `${url}`;
    console.log('urlWithQuery=======> ', urlWithQuery);
    console.log('body====>2', body);
    let formdata = body;
    // let formdata = new FormData();
    // formdata.append('id', body.id);
    // formdata.append('file', body.file);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async e => {
      console.log("e===> ", xhr.status);
      if (xhr.readyState !== 4) {
        return;
      }
      let status = xhr.status;
      let msg = xhr.message;
      console.log('status :-', status, msg);
      //console.log("res :-", xhr.response);
      if (status == 413) {
        callback({
          error: 'File Size too large.',
        });
        return;
      }
      if (status == 401) {
        PubSub.publish("TOKEN_EXPIRED", {});
        return;
      }
     
      if (status >= 500) {
        callback({
          error: 'Internal server error',
        });
        return;
      }
      if (xhr.response == '') {
        callback({
          error: 'Unable to upload file. Try Again later.',
        });
        return;
      }
      let res = JSON.parse(xhr.response);
      //console.log(typeof res);
      console.log('res ...:-', res);
      if (res.status == 'failed') {
        //console.log("res 3:-");
        res.error = `${res.response || res.message} ${res.httpStatus}`;
      }
      if(status == 201 || status == 'OK'){
        return callback(res);
       }
      if (status >= 500) {
        //throw new Error('Bad response from server');
        //console.log("res 1:-");
        res.error = res.message || 'Bad response from server';
      }
      if (status >= 400) {
        //throw new Error('Bad response from server');
        //console.log("res 2:-");
        res.error = res.message || 'Bad Credentials';
      }

      if (status == 200 || status == 'OK') {
        return callback(res);
      } else {
        return callback({
          error: res.error || 'Something went wrong',
        });
      }
      
      //  if (res.status == 'success' || res.status == 'OK') {
      //   //console.log("res 4:-");
      //   return callback(res);
      // } else {
      //   //console.log("res else:-");
      //   return callback({
      //     error: res.error || 'Something went wrong',
      //   });
      // }
    };
    xhr.open('POST', `${this.prefix}/${urlWithQuery}`);
    xhr.setRequestHeader('Content-type', 'multipart/form-data');
    if (jwtToken) {
      xhr.setRequestHeader('Authorization', jwtToken);
    }
    xhr.send(formdata);
  };

  request = async ({ url, method, params = {}, body, isFormData}) => {

    // console.log("body..........request........!",body);
    // console.log("params..........request........!",params);
    const isConnected = await DeviceHelper.isConnectedToInternet();
    if (!isConnected) {
      const res = {
        message:"No Internet",
        noIntenet: true,
        status: API_STATUS.NO_INTERNET,
      };
      return res;
    }

    const urlWithQuery = `${this.prefix}/${url}?${queryString.stringify(
      params,
    )}`;
    console.log('urlWithQuery=======> ', urlWithQuery);
    const jwtToken = await getJwtToken();
    const apiKey = await getApiKey();
    let headers = {
      Accept: 'application/json',
      'content-type': isFormData ? 'multipart/form-data' : 'application/json',
    };
    if (jwtToken) {
      headers = {
        ...headers,
        Authorization: jwtToken,
        'x-api-key': apiKey,
      };
    }
    let init = {
      method,
      headers: headers,
    };

    if (method !== 'get' && method !== 'head') {
      if (isFormData) {
        init.body = body;
      } else {
        if (typeof body == 'string') {
          init.body = body;
          headers = {
            ...headers,
            'content-type': 'text/plain',
          };
          init = {
            ...init,
            headers,
          };
        } else {
          init.body = JSON.stringify(body);
        }
      }
      //init.body = JSON.stringify(body);
      //init.data = body;
    }
    console.log('headers : ', headers);

    console.log("init......razopay",init);
    try {
      let res = await fetch(urlWithQuery, init);
      console.log("kiran.................",res);
      let status = res.status;
      let response;
      try {
        response = await res.json();
        // console.log('response 12345........................!:- ', response);
        if (status == 401) {
          PubSub.publish(TOKEN_EXPIRE, {
            tokenExpire: true,
          });
          return response;
        }

        if (typeof response == 'object' || Array.isArray(response)) {
          res = response;
          return res;
        } else if (res.status == 200) {
          res = {
            message: response,
            status: API_STATUS.OK,
            data: response,
          };
          return res;
        }

        if (status >= 500) {
          //throw new Error('Bad response from server');
          res = {
            //...res,
            message: response || 'Bad response from server',
            status: API_STATUS.SERVER_ERROR,
          };
          return res;
        }
        if (status == 404) {
          //throw new Error('Bad response from server');
          //res.error = res.message || 'Bad Credentials';
          res = {
            //...res,
            message: response || 'Bad Credentials',
            status: API_STATUS.BAD_REQUEST,
          };
          return res;
        }
        if (status >= 400) {
          //throw new Error('Bad response from server');
          //res.error = res.message || 'Bad Credentials';
          res = {
            //...res,
            message: response || 'Bad Credentials',
            status: API_STATUS.BAD_REQUEST,
          };
          PubSub.publish(TOKEN_EXPIRE, {
            tokenExpire: true,
          });
          return res;
        }

        if (res.status == 'failed') {
          //res.error = `${res.response || res.message} ${res.httpStatus}`;
          res = {
            //...res,
            message: response || 'Bad Credentials',
            status: API_STATUS.BAD_REQUEST,
          };
          return res;
        }

        return res;
      } catch (err) {
        const res = {
          message: err.message || intl.somethingWentWrong,
          status: API_STATUS.CODE_ERROR,
        };

        return res;
      }
    } catch (err) {
      const res = {
        message: err.message || intl.somethingWentWrong,
        status: API_STATUS.CODE_ERROR,
      };

      return res;
    }
  };
}
