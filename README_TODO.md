### TODO LIST

# fix bug and finish order page: 
At present, has error when generating an order
path: select the supplier, and clike `next`, 
error msg: 
  "TypeError: undefined is not a function (near '...contacts.map...')

  This error is located at:
      in ContactList (created by Connect(ContactList))
      in Connect(ContactList) (at OrderInstance.js:123)
      in RCTView (at View.js:71)
      in View (at Row.js:43)
      in RowNB (at OrderInstance.js:134)
      in RCTView (at View.js:71)
  ...
  " 

# changeCompany
make it set the default company
# updateUser
save the user details on the server side
api is not available at present

# Equipment Hire Type
button dry/wet are not available at present.

# select.js
unfinished component Search (conflict with /search/search)

# tree.js
> q: can improve this by not calling this.add() as it calls Node.find() each time
> possible solution: set root in constructor can simplify the logic and improve effeciency.

> it may be better to rethink the implementation of item tree for user. each user can have only one tree to search, which seems to be immutable for user.

# Add support for Andorid back button

# Error handling
look further into error handeling and what should really happen, the REST api doesn't have a common way of handeling errors.

# Refactor file structure for Screens
Separate each screen into their own files within the domain.

# Refactor the redux part,

### Defined but not used functions:
getCompanyList in app.js