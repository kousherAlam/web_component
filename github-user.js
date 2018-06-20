class RwRandomQuote extends HTMLElement{

    constructor(){
        super();
        let f = fetch('//api.github.com/users').then(respons=> respons.json()).then(data=>{
            this._quotes = data;
            if(this._quotes.length){
                this._renderData();
            }else{
                this._error(this._quotes.message);
            }
        }).catch(e=>{
            console.error("Error happend: ");
        });
        this._interval = null;
    }
    _baseStyle(){
        return `
            .github-user{
                padding: 10px 20px;
                background: whitesmoke;
                border: 1px solid silver;
                box-shadow: 0px 1px 2px rgba(0,0,0,.1);
                min-height: 120px;
            }
            h1{
                margin-top: 0px;
                margin-bottom: 5px;
            }
            p{
                font-size: 1em;
                color: gray;
                display: inline-block;
                position: relative;
                top: -50px;
                font-size: 50px;
            }
        `;
    }
    _error(value){
        this.innerHTML = `
            <style>
                ${this._baseStyle()}
            </style>
            <div class='github-user'>
                <h1 style='color:red;'>Gihub User  --- (Failed to load)</h1>
                <p style='color:red;'>${value}</p>
            </div>
        `;
    }
    _renderData(){
        this.innerHTML = `
            <style>
                ${this._baseStyle()}
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    padding: 10px;
                    border: 1px solid black;
                    margin: 4px;
                    display: inline-block;
                }
            </style>
            <div class='github-user'>
                <h1>Github User</h1>
                <img id='avatar_url' alt='user avater' />
                <p id="quote"></p>
            </div>
        `;
        this._setInterval(this.getAttribute('interval'));
        this._render();
    }
    static get observedAttributes(){
        return ['interval', 'current-index'];
    }
    attributeChangedCallback(name, oldValue, newValue){
        switch (name) {
            case 'interval':
                    this._setInterval(newValue);
                break;
            case 'current-index':
                    this._render(newValue);
                break;
        }
    }
    _setInterval(value){
        if(this._interval){
            clearInterval(this._interval);
        }
        if(value > 0){
            this._interval = setInterval(()=>{
                let index = Math.floor(Math.random()* this._quotes.length);
                this.setAttribute('current-index', index);
                this._render(index);
            }, value);
        }
    }
    _render(index){        
        index = index ? index : 0;
        let quote = this.querySelector('#quote');
        let avatar_url = this.querySelector("#avatar_url");
        if(quote){
            quote.innerHTML = this._quotes[index].login;
        }
        if(avatar_url){
            avatar_url.setAttribute('src', this._quotes[index].avatar_url)
        }
    }

    disconnectedCallback(){
        clearInterval(this._interval);
    }

}

window.customElements.define('github-user', RwRandomQuote);