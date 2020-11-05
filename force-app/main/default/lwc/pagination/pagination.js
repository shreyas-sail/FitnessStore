import { LightningElement ,api} from 'lwc';

export default class Pagination extends LightningElement {
@api current;
@api total;
@api status1;
@api status2;
currentPageVar;
        
    handlePrev(_event) {
        debugger;
        this.dispatchEvent(new CustomEvent('previous'));

    }

    handleNext(_event) {
       
        this.dispatchEvent(new CustomEvent('next'));
    }
}