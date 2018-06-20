class UserPoll extends HTMLElement{
    constructor(){
        super();
        this._answers = null;
        this._id = 0;
        this._question = null;
        this._selected = null;
        this._checkValidation = null;
        this._display = true;
        this._root = this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this._render();
    }
    _style(){
        return `
            <style>
                .user-poll{
                    box-sizing: border-box;
                    display: block;
                    width: 100%;
                    background: gray;
                    border: 1px solid gray;
                    overflow: hidden;
                }
                .user-poll h2{
                    margin-top: 0px;
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-top: 20px;
                    color: silver;
                }
                .answer input[type='radio']{
                    display: none;
                }
                .answer input[type='radio'] + label{
                    width: 100%;
                    display: block;
                    padding: 5px 10px;
                    background: black;
                    color: white;
                    cursor: pointer;
                }
                .answer input[type='radio']:checked + label{
                    color: green;
                    background: white;
                }

            </style>
        `;
    }
    _render(){
        if(this._answers === null || !this._question === null) return;
        let id = this.getAttribute('id-number');
        let htmlcontent = `
            ${this._style()}
            <div class='user-poll' ${!this._display ? 'style="display:none;"' : ''}>
                <h2>${this._question}</h2>
                <div class='answers'>
        `;
        if(this._answers){
            this._answers.forEach((element, index) => {
                this._id ++;
                htmlcontent += `
                    <div class='answer'>
                        <input class='the-answer' type='radio' id='q-${id}-${this._id}' name='answer'  answer-index='${index}'
                         ${index == this._selected ? 'checked': ''}/>
                        <label for='q-${id}-${this._id}'>${element}</label>
                    </div>
                `;
            });
        }
        htmlcontent += `    
                </div>
            </div>
        `;
        this._root.innerHTML = htmlcontent;
        this._addEvents();
    }

    _addEvents(){
        let elms =  this._root.querySelectorAll('.the-answer');
        if(elms){
            elms.forEach(element =>{
                element.addEventListener('change', e=>{
                    e.stopPropagation();
                    let index = e.target.getAttribute('answer-index');
                    this.select = index;                    
                    if(this._checkValidation){
                        this._checkValidation(this._selected);
                    }
                })
            });
        }
       
    }
    set answer(value){
        if(value !== this._answers){
            this._answers = value;
            this._render();
        }
    }
    get answer(){
        return this._answers;
    }
    set question(value){
        if(value !== this._question){
            this._question = value;
            console.log('executed');
            this._render();
        }
    }
    get question(){
        return this._question;
    }
    set select(value){
        this._selected = value;
        this._render();
    }
    get select(){
        return this._selected;
    }

    set checkValidation(value){
        this._checkValidation = value;
    }

    set display(value){
        this._display = !!value;
        this._render();
    }
    get display(){
        return this._display;
    }
}

window.customElements.define('user-poll', UserPoll);