/*global $*/
var React = window.React;
var ReactDOM = window.ReactDOM;

/*
 * fxrate component
*/
(function (app) {
  app.com = app.com || { };
  app.config = app.config || { };
  
  
  app.com.fxrate = class FxRate extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data:[],
        rates:[],
        lastRates:[]
      };
    }
    componentDidMount() {
      var self = this;
      function refreshData(){
        var request = $.ajax({
          url: "https://ratesjson.fxcm.com/DataDisplayer",
          type: "GET",
          dataType: "jsonp"
        });
        
        request.done(function(data) {
          setTimeout(function(){
            $("body").removeClass("us-price-up");
            $("body").removeClass("us-price-down");
            $("body").removeClass("cn-price-up");
            $("body").removeClass("cn-price-down");
          },2500);
          
          self.state.lastRates = $.extend(true, {}, self.state.rates);

          if(data.Rates){
             for(var i = 0; i< data.Rates.length; i++){
               // add / in Symbol
               if(data.Rates[i].ProductType == 1){
                 var position = 3;
                 var tmpStr;
                 tmpStr = data.Rates[i].Symbol;
                 data.Rates[i].metaSymbol = [tmpStr.slice(0, position), "/", tmpStr.slice(position)].join('');
               }
               
               // add price up/down flag
               if(data.Rates[i] && self.state.lastRates[i]){
                 if(data.Rates[i].Ask > self.state.lastRates[i].Ask){
                   data.Rates[i].metaAskCSS = "us-price-up";
                 }else if(data.Rates[i].Ask < self.state.lastRates[i].Ask){
                   data.Rates[i].metaAskCSS = "us-price-down";
                 }else{
                   data.Rates[i].metaAskCSS = "";
                 }
               }
               if(data.Rates[i] && self.state.lastRates[i]){
                 if(data.Rates[i].Bid > self.state.lastRates[i].Bid){
                   data.Rates[i].metaBidCSS = "us-price-up";
                 }else if(data.Rates[i].Bid < self.state.lastRates[i].Bid){
                   data.Rates[i].metaBidCSS = "us-price-down";
                 }else{
                   data.Rates[i].metaBidCSS = "";
                 }
               }
             }
          }
          
          //remove items other than (8+8)
          if(data.Rates){
             for(var i = 0; i< data.Rates.length; i++){
               if(
                 data.Rates[i].Symbol === "EURUSD" ||
                 data.Rates[i].Symbol === "AUDUSD" ||
                 data.Rates[i].Symbol === "EURGBP" ||
                 data.Rates[i].Symbol === "USDCAD" ||
                 data.Rates[i].Symbol === "GBPUSD" ||
                 data.Rates[i].Symbol === "NZDUSD" ||
                 data.Rates[i].Symbol === "AUDJPY" ||
                 data.Rates[i].Symbol === "EURJPY" ||
                 data.Rates[i].Symbol === "EURAUD" ||
                 data.Rates[i].Symbol === "USDJPY" ||
                 data.Rates[i].Symbol === "USDCAD" ||
                 data.Rates[i].Symbol === "CADUSD"
               ){
                 //do nothing
               }else{
                 //delete
                 //console.log("delete ", data.Rates[i].Symbol);
                 delete data.Rates[i];
               }
             }
          }
          
          self.setState({data:data, rates:data.Rates});
          //console.log("self.state.lastRates = ", self.state.lastRates);
        });
        
        request.fail(function(jqXHR, textStatus) {
          //alert( "Request failed: " + textStatus );
          console.log("Request failed: " + textStatus);
        });
      }
      
      refreshData();
      setInterval(function(){
        refreshData();
      }, 3000);
      
    }
    render() {
      return (
        <div>
            <ul className="header-row-ul">
              <li className="header-row-li">
                <div>
                   
                </div>
              </li>
            </ul>
            <ul>
              {
                    this.state.rates.map(function(item) {
                        if(item.ProductType == 1){
                          return (
                          <li>
                            <div>
                               <div className="col-data col-pair"><span>{item.metaSymbol}</span></div>
                               <div className="col-data col-bid"><span className={item.metaBidCSS}>{item.Bid}</span></div>
                               <div className="col-data col-ask"><span className={item.metaAskCSS}>{item.Ask}</span></div>
                               <div className="col-data col-spread"><span>{item.Spread}</span></div>
                            </div>
                          </li>
                          )
                        }
                        
                    })
              }
            </ul>
        </div>
          
      )
    }
    
  }
  
})(window.ReactApp || (window.ReactApp = { }))


// deep copy example
// var obj2 = jQuery.extend(true, {}, obj1);



