({
    handleClick: function(cmp, event, helper) {
        var navService = cmp.find("navService");
        // Uses the pageReference definition in the init handler
        var pageReference = {
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Order_Equipments' 
            }
        };
        event.preventDefault();
        navService.navigate(pageReference);
    }
})