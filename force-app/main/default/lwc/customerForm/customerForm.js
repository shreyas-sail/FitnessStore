import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import CUSTOMER_OBJECT from '@salesforce/schema/Customer_Detail__c';
import NAME_FIELD from '@salesforce/schema/Customer_Detail__c.Name__c';
import EMAIL_FIELD from '@salesforce/schema/Customer_Detail__c.Email__c';
import PHONE_FIELD from '@salesforce/schema/Customer_Detail__c.Phone__c';
import ADDRESS_FIELD from '@salesforce/schema/Customer_Detail__c.Address__c';
import ORDER_OBJECT from '@salesforce/schema/Order__c';
import AMOUNT_FIELD from '@salesforce/schema/Order__c.Amount__c';


export default class CustomerForm extends NavigationMixin(LightningElement) {

    customerObject = CUSTOMER_OBJECT;
    nameField = NAME_FIELD;
    emailField = EMAIL_FIELD;
    phoneField = PHONE_FIELD;
    addressField = ADDRESS_FIELD;
    isModalOpen;
    isModalOpen1;
    @api price;
    result;
    error;

    handleRecordCreated() {

        //alert('success');
        this.isModalOpen = false;
        this.isModalOpen1 = true;
        console.log(this.price);
        //createOrder();
    }
    createOrder() {
        const fields = {};
        fields[AMOUNT_FIELD.fieldApiName] = this.price;

        const recordInput = { apiName: ORDER_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(result => {
                // Clear the user enter values
                //this.accRecord = {};

                console.log('result ===> ' + result);

            })
            .catch(error => {
                this.error = JSON.stringify(error);
                console.log(this.error);
            });
    }

    openModal() {
        this.isModalOpen = true;
        console.log(this.price);
    }

    closeModal() {
        this.isModalOpen = false;
    }

    closeModal1() {
        this.isModalOpen1 = false;
        this.callNav();

    }

    callNav() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Homepage'

            }
        });

        const event = new ShowToastEvent({
            title: 'Congratulations on your order !',
            variant: 'success',
        });
        this.dispatchEvent(event);
    }

}