class DomSelector extends HTMLElement{
    constructor(selector){
        super();
        let is_id = selector.trim() ? selector[0] === '#' : false;
        this._elm = is_id ? this.querySelector(selector) : 
                            this.querySelectorAll(selector);
    }
    is(){

    }
    find(){

    }
    filter(){

    }
}

class DOM extends DomSelector{
    constructor(selector){
        super(selector);
        this.classList = new DomClassHelper(this._elm);     
    }
    on(){

    }
    off(){

    }
    trigger(){ //trigger custom events and native events

    }
    outerHeight(){

    }
    outerWidth(){

    }
    position(){

    }
    offset(){

    }
    siblings(){

    }
    parseHTML(){

    }
}

class DomClassHelper{
    constructor(elementReference){
        this._ref = elementReference;
    }
    add(className){
        if (this._ref.classList){
            this._ref.classList.add(className);
        }else{
            this._ref.className += ' ' + className;
        }
    }
    remove(className){
        if (this._ref.classList){
            this._ref.classList.remove(className);
        }else{
            this._ref.className = this._ref.className
                                .replace(new RegExp('(^|\\b)' + className.split(' ')
                                .join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    has(className){
        if (this._ref.classList){
            return this._ref.classList.contains(className);
        }else{
            return new RegExp('(^| )' + className + '( |$)', 'gi')
                        .test(this._ref.className);
        }
        
    }
    toggle(className){
        this._ref.has(className) ? this._ref.remove(className) : 
                                    this._ref.add(className);
    }   
}
