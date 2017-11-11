// User Object

function tkUser( id,
                        user_name,
                        email,
                        pass,
                        gcard,
                        gcustomer,
                        gcardname) {
      this.id = id;
      this.name= user_name;
      this.email= email;
      this.password= pass;
      this.gateway_card= gcard;
      this.gateway_customer= gcustomer;
      this.gateway_cardname= gcardname;

    this.register= function()
    {

    }

    this.registerFB= function( statusTrue, statusFalse)
    {
        $.ajax({
               type: "POST",
               url: "http://tandaklub.com/set/signup?email="+this.email+"&name="+this.name+"&password="+this.password+"&lang=es-mx&currency=mxn",
               crossDomain: true,
               cache: false,
               dataType: 'json',
               success: function(result) {
                   if (result.st == 0) {
                        statusFalse();
                   }
                   else {
                        statusTrue(result.val, this.email, this.password );
                   }
                }
               });
    }

    this.getMe= function( statusTrue, statusFalse )
    {
      $.ajax({
        type: "GET",
        url: "http://tandaklub.com/get/me?e="+this.email+"&p="+this.password+"",
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(result) {
          if (result.st == 0) {
              statusFalse();
            }
          else {
              statusTrue(result);
          }
        }
    });
  }

  this.loginFB= function()
  {


  }

}
