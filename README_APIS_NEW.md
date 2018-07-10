# user/company
{{domain}}/user/company?companyId=12&sourceCompanyId=12
{
    "CompanyId": 12,
    "CompanyName": "March Cato",
    "CompanyType": "Customer",
    "SourceCompanyId": 12,
    "SourceCompanyName": "March Cato",
    "CompanyIsJointVenture": false,
    "IsJointVentureLead": false,
    "CompanyRegionId": 60,
    "CompanyRegionIdPath": "60",
    "CompanyRegionName": "New Zealand",
    "CompanyRegionNamePath": "New Zealand",
    "CountryId": 1,
    "CountryCode": "NZ",
    "CountryName": "New Zealand",
    "CountryTaxRate": 0,
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
    "WebClientMode": "Standard",
    "MobileClientMode": "UserChoice",
    "ShowSupplierName": true
}

# user/companies
{{domain}}/user/companies
[
    {
        "CompanyId": 222,
        "CompanyName": "Heb Construction",
        "SourceCompanyId": 222,
        "SourceCompanyName": "Heb Construction",
        "IsDefault": false
    },
    {
        "CompanyId": 12,
        "CompanyName": "March Cato",
        "SourceCompanyId": 12,
        "SourceCompanyName": "March Cato",
        "IsDefault": true
    },
    {
        "CompanyId": 226,
        "CompanyName": "Test JV",
        "SourceCompanyId": 12,
        "SourceCompanyName": "March Cato",
        "IsDefault": false
    }
]

# user/details
{{domain}}/user/details
{
    "UserId": 11,
    "Username": "DickM",
    "UserType": "Customer",
    "DefaultCompanyId": 12,
    "DefaultSourceCompanyId": 12,
    "FullName": "Richard March",
    "KnownAs": "Dick",
    "MobileNumber": "021 675 420",
    "PhoneNumber": "(09) 575 987",
    "EmailAddressPrimary": "richard@marchcato.co.nz",
    "EmailAddressSecondary": "",
    "EmailFormat": "Html",
    "PasswordRequiresChange": false,
    "PasswordLastChanged": 20150211160657,
    "CityId": 2,
    "City": "Auckland"
}

# /search/results
{{domain}}/search/results?itemId=301&companyId=12&sourceCompanyId=12
{
    "Instances": [
        {
            "SupplierCompanyId": 221,
            "SupplierCompanyName": "Fletcher Building",
            "Relationship": 3,
            "RelationshipName": "FriendCompany",
            "CategoryId": 35,
            "ItemId": 301,
            "ItemType": 1,
            "ItemTypeName": "Standard",
            "ItemHasUseage": true,
            "ItemUseageUnit": 1,
            "ItemUseageUnitName": "Hours",
            "ItemHireTypeOption": 3,
            "ItemHireTypeOptionName": "DryAndWet",
            "InstanceHireTypeOption": 3,
            "InstanceHireTypeOptionName": "DryAndWet",
            "InstanceId": 111,
            "ManufacturerId": 6,
            "ManufacturerName": "Caterpillar",
            "Model": "314 LCR",
            "UseageReading": 2500,
            "Year": 2013,
            "LocationSuburbId": 0,
            "LocationSuburbName": "-",
            "LocationSuburbIsCityDefault": false,
            "LocationCityId": 0,
            "LocationCityName": "-",
            "HireOptionDaily": 1,
            "HireOptionDailyName": "Period",
            "HireOptionWeekly": 1,
            "HireOptionWeeklyName": "Period",
            "HireOptionMonthly": 1,
            "HireOptionMonthlyName": "Period",
            "OverageMethodDaily": 1,
            "OverageMethodDailyName": "ProRataRate",
            "OverageMethodWeekly": 1,
            "OverageMethodWeeklyName": "ProRataRate",
            "OverageMethodMonthly": 1,
            "OverageMethodMonthlyName": "ProRataRate",
            "DeliveryOption": 0,
            "DiscountPercentage": 0,
            "RateVariation": 0,
            "ListHourlyRateDry": 50,
            "ListHourlyRateWet": 0,
            "DiscountedHourlyRateDry": 50,
            "DiscountedHourlyRateWet": 0,
            "ListHalfDayRateDry": 393,
            "ListHalfDayRateWet": 0,
            "DiscountedHalfDayRateDry": 393,
            "DiscountedHalfDayRateWet": 0,
            "ListDailyRateDry": 525,
            "ListDailyRateWet": 925,
            "DiscountedDailyRateDry": 525,
            "DiscountedDailyRateWet": 925,
            "ListWeeklyRateDry": 2125,
            "ListWeeklyRateWet": 4125,
            "DiscountedWeeklyRateDry": 2125,
            "DiscountedWeeklyRateWet": 4125,
            "ListMonthlyRateDry": 6350,
            "ListMonthlyRateWet": 14950,
            "DiscountedMonthlyRateDry": 6350,
            "DiscountedMonthlyRateWet": 14950,
            "UseageDailyMax": 8,
            "UseageDailyMin": 6,
            "UseageWeeklyMax": 40,
            "UseageWeeklyMin": 20,
            "UseageMonthlyMax": 120,
            "UseageMonthlyMin": 60,
            "CurrentHireOption": 1,
            "CurrentHireOptionName": "Period",
            "CurrentHirePeriod": 4,
            "CurrentHirePeriodName": "Weekly",
            "CurrentHireType": 3,
            "CurrentHireTypeName": "DryAndWet",
            "CurrentOverageMethod": 1,
            "CurrentOverageMethodName": "ProRataRate",
            "CurrentListRateDry": 2125,
            "CurrentListRateWet": 4125,
            "CurrentDiscountedRateDry": 2125,
            "CurrentDiscountedRateWet": 4125,
            "CurrentUseageMax": 40,
            "CurrentUseageMin": 0,
            "NhrDry": 53.125,
            "NhrWet": 103.125,
            "DeliveryLeadTimeHours": 8,
            "PickupLeadTimeHours": 8
        },
...

# /search/instanceContactDetails
{{domain}}/search/instanceContactDetails?instanceId=137
[
    {
        "Id": 11,
        "Name": "Richard March",
        "CityId": 2,
        "CityName": "Auckland",
        "Email": "richard@marchcato.co.nz",
        "Mobile": "021 675 420",
        "Phone": "(09) 575 987"
    },
    {
        "Id": 36,
        "Name": "Skip Bauer",
        "CityId": 2,
        "CityName": "Auckland",
        "Email": "skip@marchcato.co.nz",
        "Mobile": "027 433 768",
        "Phone": "(09) 333 567"
    },
]

# search/itemContactCities
{{domain}}/search/itemContactCities?ItemId=79&SupplierId=10
[
    {
        "Id": 2,
        "Name": "Auckland",
        "BranchCount": 12
    },
    {
        "Id": 15,
        "Name": "Christchurch",
        "BranchCount": 3
    },
    {
        "Id": 12,
        "Name": "Wellington",
        "BranchCount": 1
    }
]

# search/itemContactDetails
{{domain}}/search/itemContactDetails?ItemId=79&SupplierId=10&CityId=12
[
    {
        "BranchId": 109,
        "BranchName": "Kennards Hire Newtown",
        "Address": "153 Adelaide Road, Wellington City, Wellington 6021",
        "SuburbId": 497,
        "SuburbName": "Te Aro",
        "CityId": 12,
        "CityName": "Wellington",
        "SuburbCity": "Te Aro, Wellington",
        "Phone": "(04) 380 2810",
        "Email": "newtown@kennardshire.co.nz",
        "Latitude": "-41.3060606",
        "Longitude": "174.77852400"
    }
]

# hire/hireTypeOptions
{{domain}}/hire/hireTypeOptions?companyId=12&sourceCompanyId=12&itemId=301
{
    "ItemHireTypeOption": "DryAndWet",
    "HasDryOptions": true,
    "HasWetOptions": true
}

# global/addWorkHours
{{domain}}/global/addWorkHours?hours=8
{
    "Time": 20180430150000
}

# global/billableDays
{{domain}}/global/billableDays?startDate=20180314070000&endDate=20180316140000
{
    "BillableDays": 3
}

# global/businessHours
{{domain}}/global/businessHours
{
    "BusinessHoursStart": 7,
    "BusinessHoursEnd": 17
}