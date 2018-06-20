class StarRating extends HTMLElement{
    constructor(){
        super();
        this._root = this.attachShadow({mode: 'open'});
        this._istouched = false;
        this._value = null;
        this._oldvalue = null;
    }
    static get observedAttributes(){
        return ['rating'];
    }
    attributeChangedCallback(name, oldvalue, newValue){
        switch(name){
            case "rating": 
                    this.rating = newValue;
                break;

        }
    }
    set rating(value){
        if(this._value != value){
            if(value >= 5){
                this._value = 5;
            }else if(value <= 0){
                this._value = 0;
            }else{
                this._value = value;
            }
            this._render(this._value);
            if(!this._istouched){
                this.dispatchEvent(new Event('change'));
            }       
        }
    }
    get rating(){
        return this._value;
    }
    connectedCallback(){
        let initialRating = this.getAttribute('rating');
        this._root.innerHTML = `
            <style>
                .star-rating{
                    display: inline-block;
                }
                .star,
                .star:after{
                    width: var(--star-width,10px);
                    height: var(--star-height,10px);
                    background: black;                    
                }
                .star{
                    display: inline-block;
                    position: relative;
                    margin-right: 20px;
                }
                .active, 
                .active:after, 
                .star:hover,
                .star:focus,
                .star:hover:after,
                .star:focus:after{
                    cursor: pointer;
                    background: var(--star-active-color,red);
                }
                .star:after{
                    content: '';
                    display: block;
                    transform: rotate(49deg);
                    position: absolute;
                }
            </style>
            <div class='star-rating'></div>
        `;        
        this._oldvalue = initialRating;
        this._render(initialRating);
    }
    _render(starNumber){
        let number = starNumber ? starNumber : 0; 
        let value_str = '';
        let starting_number = 0;
        let ratingDom = this._root.querySelector('.star-rating');
        for(starting_number; starting_number<number; starting_number++){
            value_str += `<span class='star active' rating='${starting_number+1}'></span>`;
        }
        for(starting_number; starting_number < 5; starting_number++){
            value_str += `<span class='star' rating='${starting_number+1}'></span>`;
        }
        ratingDom ? ratingDom.innerHTML = value_str : '';
        this._checkForHoverState();
    }
    _checkForHoverState(){
        let stars = this._root.querySelectorAll('.star-rating .star');
        stars.forEach(star=>{
            star.addEventListener('mouseover', e=>{
                let rating = e.target.getAttribute('rating') ;
                    rating = rating ? parseInt(rating): 0 ;
                this._render(rating);
                this._istouched = true;
            });
            star.addEventListener('click', e=>{
                let rating = e.target.getAttribute('rating') ;
                    rating = rating ? parseInt(rating): 0 ;
                this.rating = rating;
                this._istouched = true;                
                this.dispatchEvent(new Event('change'));             
            });
        });     
    }
}

window.customElements.define('star-rating', StarRating);

