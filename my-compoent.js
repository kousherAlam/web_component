class MyComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
            <style>
                p{
                    color: red;
                }
            </style>
            <p>My Web Component</p>
        `;
    }
    static get observedAttributes(){
        return [];
    }
    attributeChangedCallback(){

    }
    disconnectedCallback(){

    }
}

window.customElements.define('my-component', MyComponent);