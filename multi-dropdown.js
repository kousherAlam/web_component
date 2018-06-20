class MultiDropdown extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._isTouched = false;
        this._disabled = false;
        this._value = null;
        this._selectedIndex = null;
    }
    connectedCallback() {
        this._root.innerHTML = `
            ${this._style()}
            ${this._html()}
        `;
        this._render();
    }
    static get observedAttribues() {
        return ['value', 'disabled'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':

                break;
            case 'disabled':

                break;
            default:
                break;
        }
    }
    disconnectedCallback() {

    }
    _style() {
        return `
            <style>
                .hidden{
                    display: none;
                }
                input{
                    width: 100%;
                }
                .muti-dropdown{
                    display: inline-block;
                    width: 100%;
                }
                .elements{
                    border: 1px solid silver;
                    box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.219);
                    background: #fafafa;;
                }
                .option{
                    padding: 5px 10px;
                    font-size: 14px;
                }
                .selected,
                .option:hover{
                    background: #ececec;
                    cursor: pointer;
                }
                .dropdown-type{
                    position: relative;
                    height: 30px;
                    border: 1px solid silver;
                    cursor: text;
                    display: inline-table;
                    width: 100%;
                }
                .input-tb{
                    float:left;
                    min-height: 20px;
                    padding: 5px 10px;
                    border-width: 0px;
                    z-index: 2;
                    width: 50px;
                    outline: 0;
                }
                .text-box{
                    float:left;
                    padding: 5px 0px 5px 10px;
                    height: 20px;
                    display: inline-block;
                }
                .text-box .selected{
                    display: inline-block;
                    background: gray;
                    color: white;
                    padding: 2px 6px;
                    position: relative;
                    padding-right: 15px;
                    margin-bottom: 2px;
                }
                .text-box .selected:after{
                    content: 'x';
                    position: absolute;
                    right: 2px;
                    top: 2px;
                    background: red;
                    cursor: pointer;
                }
            </style>
        `;
    }
    _html() {
        return `
            <div class='muti-dropdown'>
                <div class="dropdown-type">
                    <div class="text-box">
                    </div>
                    <input class='input-tb' type="text" id="search" tabindex="0" autocomplete="off"/>
                </div>
                <div class="elements hidden">
                    <div class="option">options 1</div>
                    <div class="option">options 2</div>
                    <div class="option">options 3</div>
                    <div class="option">options 4</div>
                    <div class="option">options 5</div>
                    <div class="option">options 1</div>
                    <div class="option">options 2</div>
                    <div class="option">options 3</div>
                    <div class="option">options 4</div>
                    <div class="option">options 5</div>
                </div>
            </div>
        `;
    }
    _render() {
        let parent = this._root.querySelector('.muti-dropdown');
        let actualHolder = this._root.querySelector('.dropdown-type');
        let tb = this._root.querySelector('.text-box');
        let elms = this._root.querySelector('.elements');
        let options = elms.querySelectorAll('.option');
        let input_tb = this._root.querySelector('.input-tb');
        actualHolder.addEventListener('click', e => {
            input_tb.focus();
            if (elms.classList.contains('hidden')) {
                elms.classList.remove('hidden');
            } else {
                elms.classList.add('hidden');
            }

        });
        options.forEach(option=>{
            option.addEventListener('click', e=>{
                input_tb.focus();
                if(e.target.classList.contains('hidden')){
                    e.target.classList.remove('hidden');
                }else{
                    e.target.classList.add('hidden');
                    tb.innerHTML += ` <span class="selected">${e.target.innerHTML}</span>`;
                }
            });
        });
        input_tb.addEventListener('keypress', e=>{
            if(e.keyCode == 13){
                let value = input_tb.value;
                tb.innerHTML += ` <span class="selected">${value}</span>`;
                input_tb.value = '';
                input_tb.focus();
            }
        });
        parent.addEventListener('keydown', e=>{
            
            console.log('fired');
            if(e.keyCode !== 40 && e.keyCode !== 38){
                console.log('trap');
                return;
            }else {
                console.log('going');
            }
            let total_elm = options.length;
            let key = e.keyCode;
            options.forEach(option=>{
                option.classList.remove('selected');
            });
            input_tb.blur();
            if(this._selectedIndex === null){
                this._selectedIndex = 0;
            }else{
                this._selectedIndex ++;
                if(this._selectedIndex >= total_elm){
                    this._selectedIndex = 0;
                }
            }
            if(key === 13 && this._selectedIndex != null){
                options[this._selectedIndex].classList.add('hidden');
                tb.innerHTML += ` <span class="selected">${options[this._selectedIndex].innerHTML}</span>`;
            }
            options[this._selectedIndex].classList.add('selected');
        })
        
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
}

window.customElements.define('multi-select', MultiDropdown);
