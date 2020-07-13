namespace ec4u.Entity.Script {
    var formContext : Xrm.FormContext;

    export function onLoad(_eventContext:Xrm.Events.EventContext) {
        formContext = _eventContext.getFormContext();

        registerEvents();

        switch (formContext.ui.getFormType()) {
            case XrmEnum.FormType.Create:
                // Create Logic
                break;
            case XrmEnum.FormType.Update:
                // Update Logic
            default:
                break;
        }

    }
    function registerEvents() : void {
        formContext.getAttribute("ec4u_name").addOnChange(onFieldChanged);
    }


    function onFieldChanged() {
        
    }

}
Xrm.WebApi.retrieveRecord("account", "a8a19cdd-88df-e311-b8e5-6c3be5a8b200", "?$select=name,revenue").then(
    function success(result) {
        console.log(`Retrieved values: Name: ${result.name}, Revenue: ${result.revenue}`);
        // perform operations on record retrieval
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


Xrm.WebApi.retrieveRecord("account", "a8a19cdd-88df-e311-b8e5-6c3be5a8b200", "?$select=name&$expand=primarycontactid($select=contactid,fullname)").then(
    function success(result) {
        console.log(`Retrieved values: Name: ${result.name}, Primary Contact ID: ${result.primarycontactid.contactid}, Primary Contact Name: ${result.primarycontactid.fullname}`);
        // perform operations on record retrieval
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

Xrm.WebApi.retrieveMultipleRecords("account", "?$select=name").then(
    function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
            console.log(result.entities[i]);
        }
        // perform additional operations on retrieved records
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

// define the data to update a record
var data =
{
    "name": "Updated Sample Account ",
    "creditonhold": true,
    "address1_latitude": 47.639583,
    "description": "This is the updated description of the sample account",
    "revenue": 6000000,
    "accountcategorycode": 2
}
// update the record
Xrm.WebApi.updateRecord("account", "5531d753-95af-e711-a94e-000d3a11e605", data).then(
    function success(result) {
        console.log("Account updated");
        // perform operations on record update
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


// define the data to update a record
var data  =
{
    "primarycontactid@odata.bind": "/contacts(61a0e5b9-88df-e311-b8e5-6c3be5a8b200)"
}
// update the record
Xrm.WebApi.updateRecord("account", "5531d753-95af-e711-a94e-000d3a11e605", data).then(
    function success(result) {
        console.log("Account updated");
        // perform operations on record update
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);



Xrm.WebApi.deleteRecord("account", "5531d753-95af-e711-a94e-000d3a11e605").then(
    function success(result) {
        console.log("Account deleted");
        // perform operations on record deletion
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


Xrm.Navigation.openAlertDialog(
    {
        title: "Alert!",
        text: "Something happened, but it is not an Error.",
        confirmButtonLabel: "Ok"
    });

Xrm.Navigation.openConfirmDialog({ title: "Confirmation Dialog", text: "Are you sure?" }).then(
    function (success) {
        if (success.confirmed)
            console.log("Dialog closed using OK button.");
        else
            console.log("Dialog closed using Cancel button or X.");
    });

Xrm.Navigation.openErrorDialog({ errorCode: 1234, message: "Ein Fehler ist aufgetreten.", details: "" }).then(
    function (success) {
        console.log(success);
    },
    function (error) {
        console.log(error);
    });






