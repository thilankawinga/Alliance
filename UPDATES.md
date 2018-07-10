# 1. check apis
After get the right user/password, double checked the difference between the apis from postman file and the system. At present, all god except for the api: SUPPLIER_CONTACTS.
See `README_APIS.md` for all the apis used in this prj.
> updated `ITEM_SEARCH`: search/itemInstanceSearch

# 2. fix bug: 
when click the item and go to order page (which includes time tables)
Warning: Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.

# 3. update dev user name and password.

# 4. Refactor: add `makeRequest` for fetch data from backend. This will reduce duplicated code and risk to make errors.

# 5. update setUserContext: 
use `email: user.emailAddressPrimary` because user has no field: email.

# 6. add docs
