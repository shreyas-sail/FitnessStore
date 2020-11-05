import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCategory from '@salesforce/apex/ApexController.getCategory';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/demoLms1__c';

export default class OrderEquipments extends NavigationMixin(LightningElement) {
    @track picture;
    @track categoryList;
    @track error;
    selectedCategory;
    categoryList;
    errors;

    constructor() {
        super();
        //register dragover event to the template
        this.addEventListener('dragover', this.handleDragOver.bind(this));
    }

    onhandle(event) {
        this.contactId = event.target.dataset.id;
    }
    
    @wire(MessageContext)
    messageContext;

    // @wire(getCategory)
    // wiredfunction({ data, error }) {
    //     if (data) {
    //         this.categoryList = data;
    //     }
    //     if (error) {
    //         this.error = error;
    //     }
    // }

   connectedCallback(){
    getCategory()
    .then(results=>{
        this.categoryList=results

    })
    .catch(error=>{
        this.errors=error
    });
   }

    handleDragStart(event) {
       
        event.dataTransfer.dropEffect = "move";
        
        this.categoryId=event.target.dataset.targetId;

        //loop the array, match the AccountId and retrieve the account record
        for(let i=0; i<this.categoryList.length; i++) {
           
            if(this.categoryId!==null && this.categoryId === this.categoryList[i].Id){
                this.selectedCategory = this.categoryList[i];               
            }                                                         
        }
        
        const message = {
            Record: this.selectedCategory,
            
        };
        publish(this.messageContext, SAMPLEMC, message);
    }

    handleDragOver(event){
        event.dataTransfer.dropEffect = "move";
        event.preventDefault();       
    } 

    navigatetocatalog(event) {
        console.log("hello");
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: "c__targetLwc" 
               
            },
            state : {
                c__propertyValue:event.target.dataset.id
            }
        });
    }
}
