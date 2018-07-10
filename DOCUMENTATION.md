### setup.js

`Setup` is the main component for the project.

First Log In, then go the Screen of search which is defined in navigation. It has `onLogin` which call login action. 

### Login.js

show login/info. The component includes three parts: header for company logo, body for login inputs and button, and info for user.

Main Functions:
1. componentWillMount: add keyboard listener
2. componentWillUnmount: remove keyboard listener
3. keyboardWillShow: animation to show keyboard
4. keyboardWillHide: animation to hide keyboard
5. handleInfo: set state infoVisible
6. handleLogin: log in by username and password

### Navigation.js

It use StackNavigator to handle the screens.

It includes 3 screens: search, profile and order. by default, go into the SearchScreen


### allianceRedux.js

It includes the definitions of InitialState, actions and reducers of redux. 
The actions usually call the api functions with the same name to fetch data from apis.
The details see `Api.js`
<!-- Action List: 
login,
getItemTree,
navigateItemTree,
itemTreeGoBack,
getItemDetails,
getItemDetailsAndLeadTime,
getAccountDetails,
getBillables,
getItems,
getUserCompanies,
getOrder,
updateOrder,
getSupplierCities,
getLeadTime,
getHireTypeOptions,
updateUser,
changeCompany,
selectItem, -->

It creates an apiSingleton for specific user and obtain the auth token.

##### API FOLDER
### api.js

It defines the apiSingleton for user.

Main Functions:
1. getData: handle response to check auth. if status is 401 (forbidden, unauthorized), ignore response data
2. login: includes several steps. first login, get access token, then ask for user details to set the apiSingleton.
3. getUserCompanies: get companies associated with specific user. include Company, SourceCompany and isDefault. At present, cannot update company massage and set default company. 
4. getCompanyDetails: get company details for user
5. getWorkHours: get business work hour range
6. getBillables: get calculated billables by startDate and endDate. need both.
7. getHireTypeOptions: get hire type, dry or wet
8. getItems: get item based on itemId, companyId, sourceCompanyId, billableDays and itemHireTypeOptionString
9. getItemTree: get the tree data from api and then build the tree in a defined form.
10. getItemDetails: set item and then fetch details of the item
11. getLeadTime: get lead hours based on itemBaseHours
12. getOrder: get instance or supplier contact details
13. updateOrder: updateUser by cityId and return SupplierContactDetails. 
> Note: code is not finished as the api is not available yet.
14. getInstanceContactDetails: get instance contact details by instanceId
15. getSupplierCities: selectedId consists of supplierId and itemId
16. updateUser: update user details. 
> Note: the part of save user on the server side is not completed.
17. changeCompany: change the company details for apiSingleton and update defaultCompanyId for user.
> Note: not completed yet.

### tree.js

# Class Tree
component for the Item Tree which includes both item and category ids. Use parentId and children for node links.

Main Functions:
1. getRoot: get root node
2. build: build the tree for data. parentId is optional, and set the root if null.
> Note: can improve this by not calling this.add() as it calls Node.find() each time
3. add: add a node into tree
4. prepare: treat text in search input before use/search it
5. navigate: search the path from root down, level by level until no more children
6. toString: all the node in this category to string

# Class Node

create a node from data, or say an item
1. find: find id from current node and its children.

### utils.js
1. ceilTime: Rounds leadTime to nearest hour
> Note: This function needs to verify


##### SCREENS Folder

###  Search related
# search.js
Main Functions:
1. componentDidMount: get item tree
2. componentWillReceiveProps: when props change, set navigate path, root is no current node available.
3. search: search items which include the text
4. selectItem: navigate "Order" by inherited StackNavigator
5. handleNavBackItemList: set parentId or root for NavBack
6. toggleSearch: check searchEnabled. if true, set searchEnabled to false before search.
7. resetSearch: set searchEnabled to be false
8. renderHeader: has two different states. while searching, has input (onPress to set searchEnabled); while not searching, has logo for search and profile

Main part of the component: 
1. Header: company logo, text input when search, and log for search and navigate to user profile.
2. Includes the node details, has right and left navigations for different tree levels. 
> Note: only customer accounts can access search

# ItemTree.js 
Main Functions:
1. changeItem: navigateItemTree or handleItemSelect to get the children items. 
2. renderItems: show all the items in the results
3. TreeHeading is set to fix name when searching

# Item.js

component for a card item, which has right angle and item name. It is used for profile screen.

### Profile.js

# Functions:
Main Functions:
1. changeCompany: set selectedCompanyId and update default company id for the user.
> Note: need to update the user on server side
2. selectCompany: set state of selectedCompanyId
3. toggleDefault: set default value for state

# Components
- userCompanies List
- set default company
- save button and goback button


##### ORDER FOLDER

### order.js

# Order Component

1. componentDidMount: fetch item details and lead time
   - related actions: getItemDetails; getLeadTime; getHireTypeOptions
2. goBack: Go back to the main screen of search

- Header: company logo
- Body: 
  - Expand Component for node name and category
  - 3 Tabs: ChangeTime, SelectInstance, OrderInstance

# Expand Component
the details of the selected item
Main Functions:
1. componentDidMount: dispatch selectItem
2. componentWillUpdate: check if to open or close
3. open: expand node info
4. close: close node info

# ChangeTime
It refers to the startDate and endDate for order. 
- related action: getBillableDays based on  startDate and endDate
> Note: what is the difference between leadTime and billable time???

Main Functions:
1. setDateRange: set DateRange from startDateTime and endDateTime, and call updateDates
2. updateDates: set state of startDate and endDate; dispatch getBillableDays
3. getBillableDays: ask for Billables days from api
4. getItems: ask for items based on billableDays and hireType
5. getWorkHourRange: generate an array for work hour. used for time drop down list.
6. calendarButton: set calenda background color
7. isDateBlocked: judge if the date is before lead time
8. onDateChange: set state and billableDays for event of date changed.
9. toggleCalendar: 
10. renderPicker: render drop down list used to choose startTime and endTime
11. renderCalendar: left for startDate and right for endDate

# SelectInstance

It has two main parts: instance list and item list that satisfy the customer's requirements on time and hire type.
Instance are internal assets, while the other is external assets.

Main Functions:
1. canRenderMoreButton: 
2. getOrder: dispatch getOrder msg which need getSupplierContactDetails. 
> Note: still errors

# OrderInstance

Main action: updateOrder

Main Functions:
1. handleBackButton:
2. selectContact: select contact obj
3. selectCity
4. makePhoneCall
5. emailBodyBuilder: automatically generate the content of email
6. createEmail: create an  email based on the email addr


##### other resource 
# assets folder
it includes images needed for the prj
# components
it includes BackButton, head, RButton, UList which can be reused by all screens.
# reducers
empty folder. Not used yet.
