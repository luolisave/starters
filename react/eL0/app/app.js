/*global $*/
var React = window.React;

// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

(function (app) {
  app.com = app.com || { };
  app.config = {
    "api":"https://ratesjson.fxcm.com/DataDisplayer",
    "ProductTypeFilter": 1
  };
  
  app.com.home = class Home extends React.Component {
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
          url: app.config.api,
          type: "GET",
          dataType: "jsonp"
        });
        
        request.done(function(data) {
          setTimeout(function(){
            $("#reactAppDiv").removeClass("us-price-up");
            $("#reactAppDiv").removeClass("us-price-down");
            $("#reactAppDiv").removeClass("cn-price-up");
            $("#reactAppDiv").removeClass("cn-price-down");
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
          
          self.setState({data:data, rates:data.Rates});
          //console.log("self.state.lastRates = ", self.state.lastRates);
        });
        
        request.fail(function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
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
            <h3>Rates</h3>
            <ul className="header-row-ul">
              <li className="header-row-li">
                <div>
                   <div className="col-pair-header">PAIR</div>
                   <div className="col-bid-header">BID</div>
                   <div className="col-ask-header">ASK</div>
                   <div className="col-spread-header">SPREAD</div>
                </div>
              </li>
            </ul>
            <ul>
              {
                    this.state.rates.map(function(item) {
                        if(item.ProductType == app.config.ProductTypeFilter){
                          return (
                          <li>
                            <div>
                               <div className="col-pair"><span>{item.metaSymbol}</span></div>
                               <div className="col-bid"><span className={item.metaBidCSS}>{item.Bid}</span></div>
                               <div className="col-ask"><span className={item.metaAskCSS}>{item.Ask}</span></div>
                               <div className="col-spread"><span>{item.Spread}</span></div>
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



