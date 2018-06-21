class Request{
    constructor(url){
        this._req = null;
        this._response = null;
    }
    _objToSendableData(obj){
        let send_data = null;
        for(let key of obj){

        }
        return send_data;
    }
    post(dataForPost){
        this._req = new XMLHttpRequest();
    }
    get(){
       this._req = this._req ? this._req : new XMLHttpRequest();
    }
    json(){
        return this._response ? JSON.parse(this._response) : {};
    }
    on(){ // success , error, fail, 
        
    }
    get Response(){
        return this._response;
    }
}

/*
new Request('http://url').post({
    name: 'username',
    pass: 'userpass'
}).get().json().on('success', function(data){

}).on('error', function(data){

})

*/