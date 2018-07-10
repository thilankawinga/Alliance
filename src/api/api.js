import Sentry from "sentry-expo";

import logger from "../logger";
import Tree from "./tree";

const API_BASE = "http://api.alliancehire.com";
const SEARCH = API_BASE + "/search";
const GLOBAL = API_BASE + "/global";

const LOGIN = API_BASE + "/user/login";
const GET_USER = API_BASE + "/user/details";
const USER_COMPANIES = API_BASE + "/user/companies";
const COMPANY_DETAILS = API_BASE + "/user/company";

const WORK_HOUR_RANGE = GLOBAL + "/businessHours";
const GET_TREE = SEARCH + "/tree";
const GET_ITEM_DETAILS = API_BASE + "/item/details";
const BILLABLES = GLOBAL + "/billableDays";
const ITEM_SEARCH = SEARCH + "/results";
const INSTACE_CONTACTS = SEARCH + "/instanceContactDetails";
const SUPPLIER_CONTACTS = SEARCH + "/itemContactDetails";
const SUPPLIER_CITIES = SEARCH + "/itemContactCities";
const ITEM_LEAD_HOURS = GLOBAL + "/addWorkHours";
const HIRE_TYPE_OPTIONS = API_BASE + "/hire/hireTypeOptions";
const SETDEFAULTCOMPANY = API_BASE + "/user/setDefaultCompany"

// class of apiSingleton which includes all the related msg for a user.
class AllianceApi {
  constructor() {
    this.authToken = null;
    this.user = null;
    this.itemId = null;
    this.companyid = null;
    this.companySettings = null;
    this.userCompanies = null;
    this.itemCache = null;
  }
  isAuthenticated() {
    return this.authToken !== null;
  }
  setAuthToken(authToken) {
    this.authToken = authToken;
    return this;
  }
  getAuthToken() {
    return this.authToken;
  }
  setUser(user) {
    this.user = user;
    Sentry.setUserContext({
      email: user.EmailAddressPrimary,
      id: user.UserId
    });
    return this;
  }
  getUser() {
    return this.user;
  }
  setItemId(id) {
    this.itemId = id;
    return this;
  }
  getItemId() {
    return this.itemId;
  }
  setCompanyId(companyid) {
    this.companyid = companyid;
    return this;
  }
  getCompanyId() {
    return this.companyid;
  }
  setCompanySettings(companySettings) {
    this.companySettings = companySettings;
    return this;
  }
  getCompanySettings() {
    return this.companySettings;
  }
  setUserCompanies(userCompanies) {
    this.userCompanies = userCompanies;
    return this;
  }
  getUserCompanies() {
    return this.userCompanies;
  }
  setItemCache(supplierId, itemId) {
    this.itemCache = { supplierId, itemId };
    return this;
  }
  getItemCache() {
    return this.itemCache;
  }
}

const apiSingleton = new AllianceApi();

const makeRequest = (uri) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiSingleton.getAuthToken()}`
        }
      });
      const data = await getData(response);
      // console.log("make request:", uri)
      return resolve(data);
    } catch (err) {
      return reject(null);
    }
  });
}

// handle response: for every return value, check auth first.
// if status is 401 (forbidden, unauthorized), ignore response data
const getData = async response => {
  if (response.status == 401) {
    // this will do...
    return { auth_failed: true };
  }
  return await response.json();
};

const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    // 1. input username and password: should not be empty
    if (!username.trim().length || !password.trim().length)
      return reject("You need to enter your username and password");
    const loginData = `grant_type=password&username=${username}&password=${password}`;
    try {
      // 2. post: login data
      let response = await fetch(LOGIN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        mode: "cors",
        body: loginData
      });
      // 3. wait for response
      let data = await response.json();
      if (data.error) return reject(data.error);
      // 4. get access token in response data
      const accessToken = data.access_token;
      // 5. get: ask for user msg
      response = await fetch(GET_USER, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      data = await response.json();
      if (data.Message) return reject(data.Message);
      console.log("user:", data)
      // 6. set user's properties of api
      apiSingleton
        .setAuthToken(accessToken)
        .setUser(data)
        .setCompanyId(data.DefaultCompanyId)
        .setCompanySettings(await getCompanyDetails())
        .setUserCompanies(await getUserCompanies());
      // console.log("company setting11111111: ", apiSingleton.getCompanySettings())
      // 7. if login success, return user info and accessToken
      return resolve({
        ...data,
        auth_token: accessToken
      });
    } catch (err) {
      return reject(err);
    }
  });
};

// get user companies by fetching api. url: USER_COMPANIES
// ? the companies associated with specific user?
// this api is different from other apis: no sourceCompanyId, i.e. user
const getUserCompanies = () => {
  return makeRequest(USER_COMPANIES);
};

const getCompanyList = () => apiSingleton.getUserCompanies();

// get company details: using user/company?companyId=**&sourceCompanyId=**
// sourceCompanyId is actually user
const getCompanyDetails = () => {
  const { DefaultSourceCompanyId: defaultSourceCompanyId } = apiSingleton.getUser();
  const companyId = apiSingleton.getCompanyId();
  const uri = `${COMPANY_DETAILS}?companyId=${companyId}&sourceCompanyId=${defaultSourceCompanyId}`;
  console.log("getCompanyDetails. uri = ", uri)
  return makeRequest(uri);
};

// get business work hour range
const getWorkHours = () => {
  return makeRequest(WORK_HOUR_RANGE)
};

// get calculated billables by startDate and endDate. need both
const getBillables = (startDate, endDate) => {
  // console.log("startDate =", startDate.format("YYYYMMDDHHmmss"))
  // console.log("endDate =", endDate.format("YYYYMMDDHHmmss"))
  const uri = `${BILLABLES}?startDate=${startDate.format("YYYYMMDDHHmmss")}&endDate=${endDate.format("YYYYMMDDHHmmss")}`;
  // console.log("getBillables. uri = ", uri)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiSingleton.getAuthToken()}`
        }
      });
      const data = await getData(response);
      // console.log("getBillables. response = ", data)
      return resolve({ ...data, startDate, endDate });
    } catch (err) {
      return reject(null);
    }
  });
};

// get hire type: dry or wet
const getHireTypeOptions = (itemId) => {
  const { DefaultSourceCompanyId: scid } = apiSingleton.getUser();
  const cid = apiSingleton.getCompanyId();
  const uri = `${HIRE_TYPE_OPTIONS}?companyId=${cid}&sourceCompanyId=${scid}&itemId=${itemId}`;
  // console.log("getHireTypeOptions uri: ", uri)
  return makeRequest(uri)
};

// what if itemId OR user are not available? didn't set before/after get
const getItems = (billableDays, hireType) => {
  const user = apiSingleton.getUser();
  const itemId = apiSingleton.getItemId();
  const uri = `${ITEM_SEARCH}?itemId=${itemId}&companyId=${user.DefaultCompanyId}&sourceCompanyId=${user.DefaultSourceCompanyId}&billableDays=${billableDays}&ItemHireTypeOptionString=${hireType}`;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiSingleton.getAuthToken()}`
        }
      });
      const data = await getData(response);
      // why the fuck is there wet or dry data in here when the hireType is included in the search... ill just pass it back so i can manually sort this..
      // should have any API logic in this layer
      if (typeof data === "string") {
        // TODO: For some reason this now returns "An unexpected error has occurred. The System Administrator hsa been notified."
        // Booking single day on the Tues 30 Jan 2018 9am - 5pm
        console.error(data);
        return reject(null);
      }
      return resolve({ ...data, hireType });
    } catch (err) {
      console.error(err);
      return reject(null);
    }
  });
};

// user/tree
const getItemTree = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(GET_TREE, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiSingleton.getAuthToken()}`
        }
      });
      const data = await getData(response);
      // console.log("item tree: ", data)
      const itemTree = new Tree();
      itemTree.build(data);
      return resolve(itemTree);
    } catch (err) {
      return reject(null);
    }
  });
};

// set item then fetch details
const getItemDetails = id => {
  apiSingleton.setItemId(id);
  const uri = `${GET_ITEM_DETAILS}?itemId=${id}`
  return makeRequest(uri);
};

// get lead hours based on itemBaseHours
const getLeadTime = itemBaseHours => {
  // DeliveryLeadTimeHours or PickupLeadTimeHours as input
  const uri = `${ITEM_LEAD_HOURS}?hours=${itemBaseHours}`;
  // console.log("get lead time: ", uri)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiSingleton.getAuthToken()}`
        }
      });
      const data = await getData(response);
      // console.log("getLeadTime. return data:", data)
      if (data && data.Time) {
        return resolve(data.Time);
      }
      return reject("Query failed");
    } catch (err) {
      return reject("Query failed");
    }
  });
};

// get instance or supplier contact details
const getOrder = async (selectedId, cityId = null) => {
  const parts = selectedId.split(":");
  if (parts[0] === "instance") {
    return getInstanceContactDetails(parts[1]);
  } else {
    if (cityId) {
      return getSupplierContactDetails(cityId, parts[1], parts[0]);
    }
    const { CityId: defaultCityId } = apiSingleton
      .setItemCache(parts[0], parts[1])
      .getUser();
    return getSupplierContactDetails(defaultCityId, parts[1], parts[0]);
  }
};

// updateUser by cityId and return SupplierContactDetails
const updateOrder = async cityId => {
  const { supplierId, itemId } = apiSingleton.getItemCache();
  updateUser({ cityId });
  return getSupplierContactDetails(cityId, itemId, supplierId);
};

// get instance contact details by instanceId
const getInstanceContactDetails = instanceId => {
  const uri = `${INSTACE_CONTACTS}?instanceId=${instanceId}`;
  return makeRequest(uri);
};

// not completed yet
const getSupplierContactDetails = (cityId, itemId, supplierId) => {
  const uri = `${SUPPLIER_CONTACTS}?itemId=${itemId}&supplierId=${supplierId}&cityId=${cityId}`;
  return makeRequest(uri);
};


// getSupplierCities: selectedId consists of supplierId and itemId
const getSupplierCities = selectedId => {
  let supplierId = null;
  let itemId = null;
  if (selectedId === null) {
    const itemCache = apiSingleton.getItemCache();
    if (!itemCache) return [];
    supplierId = itemCache.supplierId;
    itemId = itemCache.itemId;
  } else {
    const parts = selectedId.split(":");
    supplierId = parts[0];
    itemId = parts[1];
  }
  const uri = `${SUPPLIER_CITIES}?itemId=${itemId}&supplierId=${supplierId}`;
  return makeRequest(uri);
};

// updateUser
const updateUser = (updateFields, saveOnServer = false) => {
  const user = apiSingleton.getUser();
  const updatedUser = { ...user, ...updateFields };
  if (saveOnServer) {
    //TODO: save the user on the server side too
  }
  apiSingleton.setUser(updatedUser);
  // console.log("apiSingleton.getUser(): ", apiSingleton.getUser())
  return updatedUser;
};

// change company: set value in apiSingleton and then updateUser
const changeCompany = async (cId, setDefault = false) => {
  // should get sourceCompanyId First
  apiSingleton.setCompanyId(cId)
  const user = apiSingleton.getUser();
  const userCompanies = apiSingleton.getUserCompanies()
  let userCompany = userCompanies.find(o => o.CompanyId === cId);
  let sId = userCompany.SourceCompanyId;

  if (setDefault) {
    try {
      const uri = `${SETDEFAULTCOMPANY}?companyId=${cId}&sourceCompanyId=${sId}`;
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiSingleton.getAuthToken()}`
          //  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        mode: "cors",
      });
      const data = getData(response)
      console.log("saved user on server. data: ", data)
    } catch (err) {
      return reject("Set Default Company Failed!");
    }
  }
  // console.log("origin user: ", user)
  const updatedUser = { ...user, ...{ DefaultCompanyId: cId, DefaultSourceCompanyId: sId } };
  // console.log("updatedUser: ", updatedUser)
  apiSingleton.setUser(updatedUser);
  const companySettings = await getCompanyDetails()
  // console.log("companySettings", getData(companySettings))
  if (companySettings === {}) {
    console.warn("No valid Company Details for companyId: ", cId)
  }
  apiSingleton.setCompanySettings(companySettings);
  // console.log("apiSingleton.getCompanySettings(): ", apiSingleton.getCompanySettings())
  // const newUser = apiSingleton.getUser();

  // may be needed only when default company is updated
  const newUserCompanies = await getUserCompanies()
  apiSingleton.setUserCompanies(newUserCompanies)
  return updatedUser
};

export default {
  login,
  getItemTree,
  getItemDetails,
  getWorkHours,
  getBillables,
  getHireTypeOptions,
  getItems,
  getCompanyDetails,
  apiSingleton,
  getOrder,
  getLeadTime,
  getCompanyList,
  getUserCompanies: getCompanyList,
  getSupplierCities,
  updateOrder,
  updateUser,
  changeCompany,
};
