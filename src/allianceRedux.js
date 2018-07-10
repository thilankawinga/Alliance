// Create new api and pass in auth key
import Api from "./api";

// TODO: look further into error handeling and what should really happen,
// the REST api doesn't have a common way of handeling errors.
// TODO: Separate each screen into their own files within the domain

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  auth_token: null,
  user: [],
  toastError: null,
  itemTree: null,
  treePath: [],
  itemDetails: null,
  workHours: null,
  billableDays: null,
  items: {},
  userCompanies: null,
  companySettings: null,
  orderDetails: null,
  supplierCities: [],
  leadTime: null,
  hireTypeOptions: null,
  orderSummary: null,
  selectedItem: null,
};

export const types = {
  RESET: "RESET",
  CHANGE_COMPANY: "CHANGE_COMPANY",
  CHANGE_COMPANY_PENDING: "CHANGE_COMPANY_PENDING",
  CHANGE_COMPANY_REJECTED: "CHANGE_COMPANY_REJECTED",
  CHANGE_COMPANY_FULFILLED: "CHANGE_COMPANY_FULFILLED",

  LOGIN: "LOGIN",
  LOGIN_PENDING: "LOGIN_PENDING",
  LOGIN_FULFILLED: "LOGIN_FULFILLED",
  LOGIN_REJECTED: "LOGIN_REJECTED",

  GET_ACCOUNT_DETAILS: "GET_ACCOUNT_DETAILS",
  GET_ACCOUNT_DETAILS_FULFILLED: "GET_ACCOUNT_DETAILS_FULFILLED",

  GET_USER_COMPANIES: "GET_USER_COMPANIES",
  GET_USER_COMPANIES_FULFILLED: "GET_USER_COMPANIES_FULFILLED",

  GET_BILLABLES: "GET_BILLABLES",
  GET_BILLABLES_FULFILLED: "GET_BILLABLES_FULFILLED",

  GET_ITEMS: "GET_ITEMS",
  GET_ITEMS_PENDING: "GET_ITEMS_PENDING",
  GET_ITEMS_REJECTED: "GET_ITEMS_REJECTED",
  GET_ITEMS_FULFILLED: "GET_ITEMS_FULFILLED",

  GET_TREE: "GET_TREE",
  GET_TREE_PENDING: "GET_TREE_PENDING",
  GET_TREE_FULFILLED: "GET_TREE_FULFILLED",
  GET_TREE_REJECTED: "GET_TREE_REJECTED",

  TREE_BACK: "UPDATE_PATH_BACK",
  TREE_NAVIGATE: "UPDATE_PATH",

  ITEM_DETAILS: "ITEM_DETAILS",
  ITEM_DETAILS_PENDING: "ITEM_DETAILS_PENDING",
  ITEM_DETAILS_FULFILLED: "ITEM_DETAILS_FULFILLED",
  ITEM_DETAILS_REJECTED: "ITEM_DETAILS_REJECTED",

  GET_USER_ACCOUNT_DETAILS: "USER_ACCOUNT_DETAILS",
  GET_USER_ACCOUNT_DETAILS_FULFILLED: "USER_ACCOUNT_DETAILS_FULFILLED",

  GET_COMPANY_DETAILS: "COMPANY_DETAILS",
  GET_COMPANY_DETAILS_FULFILLED: "COMPANY_DETAILS_FULFILLED",

  GET_ORDER: "GET_ORDER",
  GET_ORDER_PENDING: "GET_ORDER_PENDING",
  GET_ORDER_FULFILLED: "GET_ORDER_FULFILLED",

  GET_SUPPLIER_CITIES: "GET_SUPPLIER_CITIES",
  GET_SUPPLIER_CITIES_PENDING: "GET_SUPPLIER_CITIES_PENDING",
  GET_SUPPLIER_CITIES_FULFILLED: "GET_SUPPLIER_CITIES_FULFILLED",

  GET_LEAD_TIME: "GET_LEAD_TIME",
  GET_LEAD_TIME_PENDING: "GET_LEAD_TIME_PENDING",
  GET_LEAD_TIME_FULFILLED: "GET_LEAD_TIME_FULFILLED",

  GET_HIRE_TYPE_OPTIONS: "GET_HIRE_TYPE_OPTIONS",
  GET_HIRE_TYPE_OPTIONS_PENDING: "GET_HIRE_TYPE_OPTIONS_PENDING",
  GET_HIRE_TYPE_OPTIONS_FULFILLED: "GET_HIRE_TYPE_OPTIONS_FULFILLED",

  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_PENDING: "UPDATE_USER_PENDING",
  UPDATE_USER_FULFILLED: "UPDATE_USER_FULFILLED",

  SELECT_ITEM: "SELECT_ITEM",
};

export const actionCreators = {
  reset: () => {
    return {
      type: types.RESET
    };
  },
  login: (username, password) => {
    return dispatch => {
      return dispatch({
        type: types.LOGIN,
        payload: Api.login(username, password)
      }).then(() => dispatch(actionCreators.getAccountDetails()));
    };
  },
  getItemTree: () => {
    return {
      type: types.GET_TREE,
      payload: Api.getItemTree()
    };
  },
  navigateItemTree: nodeId => {
    return {
      type: types.TREE_NAVIGATE,
      payload: nodeId
    };
  },
  itemTreeGoBack: (id) => {
    return {
      type: types.TREE_BACK,
      payload: id
    };
  },
  getItemDetails: id => {
    return {
      type: types.ITEM_DETAILS,
      payload: Api.getItemDetails(id)
    };
  },
  getItemDetailsAndLeadTime: (id, baseTime) => {
    return dispatch => {
      return dispatch({
        type: types.ITEM_DETAILS,
        payload: Api.getItemDetails(id)
      }).then(() => {
        dispatch(actionCreators.getLeadTime(baseTime))
        dispatch(actionCreators.getHireTypeOptions(id))
      });
    };
  },
  getAccountDetails: () => {
    return {
      type: types.GET_ACCOUNT_DETAILS,
      payload: Api.getWorkHours()
    };
  },
  getBillables: (start, end) => {
    return {
      type: types.GET_BILLABLES,
      payload: Api.getBillables(start, end),
      start,
      end
    };
  },
  getItems: (billableDays, hireType) => {
    return {
      type: types.GET_ITEMS,
      payload: Api.getItems(billableDays, hireType)
    };
  },
  getUserCompanies: () => {
    return {
      type: types.GET_USER_COMPANIES,
      payload: Api.getUserCompanies()
    };
  },
  getOrder: selectedId => {
    return dispatch => {
      return dispatch({
        type: types.GET_ORDER,
        payload: Api.getOrder(selectedId)
      }).then(() => dispatch(actionCreators.getSupplierCities()));
    };
  },
  updateOrder: cityId => {
    return dispatch => {
      return dispatch({
        type: types.GET_ORDER,
        payload: Api.updateOrder(cityId)
      }).then(() => dispatch(actionCreators.updateUser({ cityId })));
    };
  },
  getSupplierCities: (selectedId = null) => {
    return {
      type: types.GET_SUPPLIER_CITIES,
      payload: Api.getSupplierCities(selectedId)
    };
  },
  getLeadTime: baseLeadTime => {
    return {
      type: types.GET_LEAD_TIME,
      payload: Api.getLeadTime(baseLeadTime)
    };
  },
  getHireTypeOptions: itemId => {
    return {
      type: types.GET_HIRE_TYPE_OPTIONS,
      payload: Api.getHireTypeOptions(itemId)
    };
  },
  updateUser: fields => {
    return {
      type: types.UPDATE_USER,
      payload: Api.updateUser(fields)
    };
  },
  changeCompany: (cId, setDefault) => {
    return {
      type: types.CHANGE_COMPANY,
      payload: Api.changeCompany(cId, setDefault)
    };
  },
  selectItem: (item) => {
    return {
      type: types.SELECT_ITEM,
      payload: item
    };
  },
};

export const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  state = { ...state, toastError: null };
  if (payload && payload.auth_failed) {
    return {
      isFetching: false,
      isLoggedIn: false,
      auth_token: null,
      toastError: "Your session has expired"
    };
  }
  switch (type) {
    case types.RESET: {
      return {
        ...state,
        itemDetails: null,
        workHours: null,
        billableDays: null,
        items: {},
        companySettings: null,
        orderDetails: null,
        supplierCities: [],
        leadTime: null,
        hireTypeOptions: null,
        orderSummary: null
      };
    }
    case types.LOGIN_PENDING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.LOGIN_FULFILLED: {
      const { auth_token, ...user } = payload;
      const companySettings = Api.apiSingleton.getCompanySettings();
      const userCompanies = Api.apiSingleton.getUserCompanies();
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true,
        auth_token: auth_token,
        user: user,
        userCompanies: userCompanies,
        companySettings: companySettings
      };
    }
    case types.LOGIN_REJECTED: {
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        auth_token: null,
        toastError: payload
      };
    }
    case types.GET_TREE_PENDING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.GET_TREE_FULFILLED: {
      if (!payload) return { ...state, isFetching: false };
      return {
        ...state,
        itemTree: payload,
        isFetching: false
      };
    }
    case types.GET_TREE_REJECTED: {
      return {
        ...state,
        isFetching: false
      };
    }
    case types.TREE_NAVIGATE: {
      const { treePath: currPath } = state;
      if (!currPath) return { ...state, treePath: Array.of(payload) }
      return {
        ...state,
        treePath: [...currPath, payload]
      };
    }
    case types.TREE_BACK: {
      if (payload) return {
        ...state,
        treePath: Array.of(payload)
      };
      const { treePath: currPath } = state;
      const treePath =
        currPath && currPath.length > 1 ? currPath.slice(0, -1) : [];
      return {
        ...state,
        treePath
      };
    }
    case types.ITEM_DETAILS_PENDING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.ITEM_DETAILS_FULFILLED: {
      if (!payload) return { ...state, isFetching: false };
      return {
        ...state,
        itemDetails: payload,
        isFetching: false
      };
    }
    case types.ITEM_DETAILS_REJECTED: {
      return {
        ...state,
        isFetching: false
      };
    }
    case types.GET_ACCOUNT_DETAILS_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        workHours: payload
      };
    }
    case types.GET_BILLABLES_FULFILLED: {
      if (!payload) return state;
      const { startDate, endDate } = payload;
      return {
        ...state,
        billableDays: payload,
        orderSummary: { ...state.orderSummary, startDate, endDate }
      };
    }
    case types.GET_ITEMS_PENDING: {
      return {
        ...state,
        items: {}
      };
    }
    case types.GET_ITEMS_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        items: payload
      };
    }
    case types.GET_USER_COMPANIES_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        userCompanies: payload
      };
    }
    case types.GET_ORDER_PENDING: {
      return {
        ...state,
        cityId: action.cityId,
        orderDetails: null
      };
    }
    case types.GET_ORDER_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        orderDetails: payload
      };
    }
    case types.GET_SUPPLIER_CITIES_PENDING: {
      return {
        ...state,
        supplierCities: []
      };
    }
    case types.GET_SUPPLIER_CITIES_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        supplierCities: payload
      };
    }
    case types.GET_LEAD_TIME_PENDING: {
      return {
        ...state,
        leadTime: null
      };
    }
    case types.GET_LEAD_TIME_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        leadTime: payload
      };
    }
    case types.GET_HIRE_TYPE_OPTIONS_PENDING: {
      return {
        ...state,
        hireTypeOptions: null
      };
    }
    case types.GET_HIRE_TYPE_OPTIONS_FULFILLED: {
      if (!payload) return state;
      return {
        ...state,
        hireTypeOptions: payload
      };
    }
    case types.UPDATE_USER_PENDING: {
     return {
        ...state,
        user: null
      };
    }
    case types.UPDATE_USER_FULFILLED: {
      if (!payload) return state;
      console.log("UPDATE_USER. ", payload)
      return {
        ...state,
        user: payload
      };
    }
    case types.CHANGE_COMPANY_PENDING: {
      console.log("pending...")
      return {
        ...state,
        // user: null,
      };
    }
    case types.CHANGE_COMPANY_FULFILLED: {
      if (!payload) return state;
      const companySettings = Api.apiSingleton.getCompanySettings();
      const userCompanies = Api.apiSingleton.getUserCompanies();
      console.log("companySettings", companySettings)
      console.log("userCompanies", userCompanies)
      console.log("payload", payload)
      return {
        ...state,
        user: payload,
        companySettings,
        userCompanies
      };
    }
    case types.CHANGE_COMPANY_REJECTED: {
      console.log("rejected")
      return {
        ...state,
      };
    }
    case types.SELECT_ITEM: {
      return {
        ...state,
        selectedItem: payload // { name, category }
      }
    }
    default: {
      return state;
    }
  }
};
