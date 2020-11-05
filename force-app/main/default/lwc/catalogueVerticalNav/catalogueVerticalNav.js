import { api, LightningElement } from 'lwc';

export default class CatalogueVerticalNav extends LightningElement {
    
    @api propertyValue;
    @api usage;
    handleNavclick(event){
        console.log('clicked On Resi');
        this.usage='Residential';
        this.propertyValue=this.propertyValue;
    }
    handleNavclick2(){
        console.log('clicked On Commer');
        this.usage='Commercial';
        this.propertyValue=this.propertyValue;
    }
    
}