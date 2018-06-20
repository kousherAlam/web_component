## Create a custom elemnt
register: window.customElement.define(the-tag, CustomElementProtoType)

read more about
- web component 

It define some lifecycle callback 
- connectedCallback: execute when the element connect with dom 
- attribueChangedCallback: when attribute change it value, but we need to observe the attribute with a `static get observedAttributes` method which return the attribute array. 
- disconnectedCallback - Fired when the element remove form the docment. 

we can call custom element method as like we call method on native element. we also can extends the custom element. 

extending native element: need document-register-element.js polyfill 



## custom element 
    widnow.customElements.define('name-of-element', ElementClass, {extends: 'elm'})
## shadow dom 
    attachShadow({mode: 'open|close'});
## html-template
    <tempalte></template>
    doucument.importNode(template, true|false);
    append on the body
## html-import 
    <link rel="import" href="element.html" />
    element.import.querySelctor('');
    document.body.appendChild(); 
