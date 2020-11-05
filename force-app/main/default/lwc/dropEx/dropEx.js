import { LightningElement, wire, api } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/demoLms1__c';

export default class DropEx extends LightningElement {
    @api DroppedEquipName;
    @api DroppedEquipId;
    @api nameList = [];
    @api priceList = [];
    @api idList = [];
    @api pictureList = [];
    @api grandTotal = 0;
    @api prodList = [];
    @api recordEuip = [];
    @api ifCartEmpty = false;
    qauntityCount = 1;
    disableStatus = false;

    constructor() {
        super();
        //these are two must have events to be listended
        this.template.addEventListener('dragover', this.handleDragOver.bind(this));
        this.template.addEventListener('drop', this.handleDrop.bind(this));
    }
    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SAMPLEMC,
                (message) => this.handleMessage(message),

            );
        }
        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC, (message) => {
                this.handleMessage(message);

            });
    }
    handleMessage(message) {

        this.equipment = message.Record;
        console.log(this.equipment);
    }


    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    handleDrop(event) {


        if (event.stopPropagation) {
            event.stopPropagation();
        }
        event.preventDefault();
        this.qauntityCount = 0;


        this.DroppedEquipName = this.equipment.Name__c;
        console.log(this.DroppedEquipName);
        // console.log(DroppedEquipName);
        this.DroppedEquipId = this.equipment.Id;
        console.log(this.DroppedEquipId);
        this.nameList.push(this.equipment.Name__c);
        this.priceList.push(this.equipment.Price__c);
        this.pictureList.push(this.equipment.Image__c);
        this.idList.push(this.equipment.Id);

        this.grandTotal = parseInt(this.grandTotal) + parseInt(this.equipment.Price__c);
        console.log(this.grandTotal);
        if (this.nameList.length > 0) {
            this.ifCartEmpty = true;
        }
    }
    handleDragOver(event) {
        //this.subscribeToMessageChannel();
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }
    addItem(event){
        event.preventDefault()
        this.grandTotal= parseInt(event.currentTarget.dataset.key)+parseInt(this.grandTotal);
        console.log(this.grandTotal)
        this.qauntityCount+=1;
        if(this.qauntityCount==0){
            this.disableStatus=true;
        }
        else if (this.qauntityCount>=1){
            this.disableStatus=false;
        } 
    }
    subItem(event){
        event.preventDefault()
        this.grandTotal= parseInt(this.grandTotal)-parseInt(event.currentTarget.dataset.key);
        console.log(this.grandTotal)
        this.qauntityCount-=1;

        if(this.qauntityCount==0){
            this.disableStatus=true;
        }
        else if (this.qauntityCount>=1){
            this.disableStatus=false;
        } 
        
    }

}