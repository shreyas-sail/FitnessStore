public with sharing class ApexController {
    public ApexController() {

    }

    @AuraEnabled
    public static list<sObject> getCategory(){
        try {
            return [SELECT Name__C,Image__C FROM Category__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static list<sObject> getEqiups(Integer offset, Integer len,String key,String id){
        String search=key;
        Integer off=offset;
        Integer l=len;
        if(search==null)
        {
            try {
                return [SELECT Name__C,Image__C,Price__C,Quantity__C,Usage__C,Description__c 
                        FROM Equipment__c 
                        Where Category__r.Id=:id
                        LIMIT :l  OFFSET :off];
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
        else {
            try {
                return [SELECT Name__C,Image__C,Price__C,Quantity__C,Usage__C,Description__c 
                        FROM Equipment__c 
                        WHERE Usage__c=:search AND Category__r.Id=:id
                        LIMIT :l  OFFSET :off];
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
        
    }
}
