
# user/login
{{domain}}/user/login
grant_type=password&username=DickM&password=ScottC1961
Authorization: Bearer {{token}}
Accept: application/json
Content-Type: application/x-www-form-urlencoded;charset=utf-8
Response:
{
    "access_token": "Reov4isoWzW-XpZhDAsyfS9SgAVjl9c5fms8ZxXm-O2xmOejwdXOZx7e0gkuLPbCmel0u4vCh8DVHw888ZMv84hGwEpVGuFR0hNtbRTeuG5aOr7OyS-hNTgasVO6KnY9jQ9q7z6ebqFg0980EzUboUN8aU-cdhQO1wO6eGg8YyPlEH3wBJvs9mnKfHztASFsgr1-gmxtcgiZflhbgWPmRNFx6aE9y6IwNvvowOIzK0LKFY5GrS4gcLGtAz7TQmxv543lgUxTO6XKMtq-vL8ic6AaklNb_M9y7MLIzTRFoiQ",
    "token_type": "bearer",
    "expires_in": 43199,
    ".issued": "Wed, 11 Apr 2018 09:01:04 GMT",
    ".expires": "Wed, 11 Apr 2018 21:01:04 GMT"
}

# user/company
{{domain}}/user/company?companyId=12&sourceCompanyId=12
Response:
{
    "CompanyName": "March Cato",
    "CompanyType": "Customer",
    "CompanyIsJointVenture": false,
    "SourceCompanyName": "March Cato",
    "IsJointVentureLead": false,
    "CompanyRegionId": 60,
    "CompanyRegionName": "New Zealand",
    "CountryId": 1,
    "CountryCode": "NZ",
    "CountryName": "New Zealand",
    "CountryTaxRate": 0.00,
    "CountryTaxRateName": "GST",
    "TimeZoneName": "New Zealand Standard Time",
    "CultureCode": "en-NZ",
    "CurrencySymbol": "&#36;",
    "DateFormatShortDate": "d/MM/yyyy",
    "DateFormatShortTime": "h:mm tt",
    "DateFormatShortDateTime": "d/MM/yyyy h:mm tt",
    "DateFormatLongDate": "dddd, MMMM dd, yyyy",
    "DateFormatLongDateTime": "dddd, MMMM dd, yyyy h:mm tt",
    "NumberFormat": "#,0.00",
    "NumberFormatDecimal2dp": "#,0.00",
    "NumberFormatStandard": "#,0",
    "WebClientMode": "BasicPlus",
    "MobileClientMode": "UserChoice",
    "ShowSupplierName": true
}

# user/companies
{{domain}}/user/companies
Response:
[{
    "CompanyId": 222,
    "CompanyName": "Heb Construction",
    "SourceCompanyId": 222,
    "SourceCompanyName": "Heb Construction",
    "isDefault": false
}, {
    "CompanyId": 12,
    "CompanyName": "March Cato",
    "SourceCompanyId": 12,
    "SourceCompanyName": "March Cato",
    "isDefault": true
}, {
    "CompanyId": 226,
    "CompanyName": "Test JV",
    "SourceCompanyId": 12,
    "SourceCompanyName": "March Cato",
    "isDefault": false
}]

# user/details
{{domain}}/user/details
Response:
{
    "userId": 11,
    "username": "DickM",
    "defaultSourceCompanyId": 12,
    "defaultCompanyId": 12,
    "userType": "Customer",
    "fullName": "Richard March",
    "knownAs": "Dick",
    "mobileNumber": "675420",
    "phoneNumber": "575987",
    "emailAddressPrimary": "richard@marchcato.co.nz",
    "emailAddressSecondary": "",
    "emailFormat": "Html",
    "passwordRequiresChange": false,
    "passwordLastChanged": 1423577217543.0,
    "cityId": 2,
    "city": "Auckland"
}

# search/instanceContactDetail
{{domain}}/search/instanceContactDetails?instanceId=137
Response:
[{
    "Name": "Richard March",
    "CityName": "Auckland",
    "Email": "richard@marchcato.co.nz",
    "Mobile": "021 675 420",
    "Phone": "(09) 575 987"
}, {
    "Name": "Skip Bauer",
    "CityName": "Auckland",
    "Email": "skip@marchcato.co.nz",
    "Mobile": "027 433 768",
    "Phone": "(09) 333 567"
}, {
    "Name": "Bob Jones",
    "CityName": "Auckland",
    "Email": "bob@marchcato.co.nz",
    "Mobile": "021 987 432",
    "Phone": "(09) 777 999"
}]

# search/itemContactCities
{{domain}}/search/itemContactCities?ItemId=79&SupplierId=10
Response:
[{
    "Id": 2,
    "Name": "Auckland",
    "BranchCount": 12
}, {
    "Id": 15,
    "Name": "Christchurch",
    "BranchCount": 3
}, {
    "Id": 12,
    "Name": "Wellington",
    "BranchCount": 1
}]

# search/itemInstanceSearch
{{domain}}/search/itemInstanceSearch
Response:
{
    "instances": null,
    "items": [
        {
            "CustomerCompanyId": 12,
            "SupplierCompanyId": 10,
            "SupplierCompanyName": "Kennards Hire",
            ...
        },
        ...
    ]
}

# search/tree
{{domain}}/search/tree
struct: has two category levels category has many children category, then each children category has many items.
e.g. category: "Access Equipment" (id 44) -> category "Cherry Pickers" (id 24) -> item "12m Working Height" (id 79)
Response:
[{
    "children": [{
        "children": [{
            "hireType": "Dry",
            "deliveryLeadTimeHours": 2,
            "pickupLeadTimeHours": 1,
            "type": "item",
            "displayName": "12m Working Height",
            "id": 79
        }, {
            "hireType": "Dry",
            "deliveryLeadTimeHours": 2,
            "pickupLeadTimeHours": 1,
            "type": "item",
            "displayName": "15m Working Height",
            "id": 80
        },
...

# getHireType: hire/hireTypeOptions
{{domain}}/hire/hireTypeOptions?companyId=12&sourceCompanyId=12&itemId=301
Response:

# getItemDetails: search/itemDescription
> {{domain}}/search/itemDescription?itemId=301

# !!!!!!!!!!!!!!!!!!!!!!!!!!!!
# getSupplierContactDetails: search/itemContactDetails
# This api is closely related with order. Not Available at present.
{{domain}}/search/itemContactDetails?ItemId=79&SupplierId=10&CityId=12
"An unexpected error has occurred. The System Administrator hsa been notified."

