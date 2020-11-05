import { LightningElement,wire,api} from 'lwc';
import getEqiups from '@salesforce/apex/ApexController.getEqiups';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/demoLms1__c';

export default class DisplayProducts extends LightningElement {
    @api equipsList=[];
    @api offset=0;
    @api Prevoffset=0;
    @api limit = 2;
    @api current=1;
    @api total= Math.floor((5/2)+1);
    @api property;
    selectedEquip;
    @api filter=null;
    
    constructor() {
        super();
        //register dragover event to the template
        this.addEventListener('dragover', this.handleDragOver.bind(this));
    }
    
    @wire(MessageContext)
    messageContext;

    @wire(getEqiups,{offset:'$offset',len:'$limit',id:'$property',key:'$filter'})
    getDetails({data,error}) {
        if (data) {
            this.equipsList = data;
            console.log(data.length);
            this.error = undefined;
            this.total=data.length;
        } else if (error) {
            this.error = error;
            this.equipsList = undefined;
        }
    }

    handleDragStart(event) {
       
        event.dataTransfer.dropEffect = "move";
        console.log(this.property);
        this.equipId=event.target.dataset.targetId;

        //loop the array, match the AccountId and retrieve the account record
        for(let i=0; i<this.equipsList.length; i++) {
           
            if(this.equipId!==null && this.equipId === this.equipsList[i].Id){
                this.selectedEquip = this.equipsList[i];               
            }                                                         
        }
        
        const message = {
            Record: this.selectedEquip,
            
        };
        publish(this.messageContext, SAMPLEMC, message);
    }

    handleDragOver(event){
        event.dataTransfer.dropEffect = "move";
        event.preventDefault();       
    } 


    handlePrev () {
               
        if(this.offset - this.limit >=0)
        {
            if(this.current>1){
                this.current = this.current-1;
            }
            this.Prevoffset=this.offset;
            this.offset = this.offset - this.limit;
        }
    }

    handleNext () {
        if(this.current<this.total){
            this.current = this.current+1;
        }
        this.Prevoffset=this.offset;
        this.offset = this.offset + this.limit;
    }

    connectedCallback() {
        this.filter=null;
    }
}