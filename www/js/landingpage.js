var JoinTandaID = null
var JoinTandaHash = null
var JoinTandaGuestID = null

$(document).on("pageinit","#login",function() {
  var usrEmail;
  var usrPass;
  /*Check if user is alredy logged in and has valid user ID*/
  usrEmail = window.localStorage.getItem("usrEmail");
  usrPass = window.localStorage.getItem("usrPass");

 /*TODO: ADD option to parse Join Tanda Info Here from URL or Data */

 $('#warningPlaceHolder').hide();

  if (usrEmail != null && usrPass != null) {
    $.ajax({
      type: "GET",
      url: "http://tandaklub.com/get/me?e="+usrEmail+"&p="+usrPass+"",
      crossDomain: true,
      cache: false,
      dataType: 'json',
      success: function(result) {
        if (result.st == 1) {
          /*TODO: ADD option to use Join Tanda Information to launch Join tanda Page*/
          if (JoinTandaID == null && JoinTandaHash == null && JoinTandaGuestID == null) {
             window.location.href="main.html";
             window.location.href.reload(true);
          }
          else {
            /*TODO: ADD option to use Join Tanda Information to launch Join tanda Page*/
          }
        }
      }
    });
  }
});
$(document).on("pageshow","#login",function() {
/*User is not logged In- waiting for submit*/
$("#submitlogin").click(function()
{
       var loginEmail = document.getElementById("loginEmail").value;
       var loginpass = document.getElementById("loginPasswrd").value;

       if ((loginEmail != null && loginpass != null) && (loginEmail != "" && loginpass != "") ) {

       tklogin(loginEmail, loginpass,null,false);

     }
     else {
        $( "#warningPlaceHolder" ).empty();
        $( "#warningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>Uno o mas campos son invalidos</a>" );
        $('#warningPlaceHolder').show();
     }
});


$("#facebooklogin").click(function()
{
var _username;
var _email;
var _pass;

  var fbLoginSuccess = function (userData) {
    facebookConnectPlugin.api( "me/?fields=name,email", ["public_profile,email"],
                    function (response) {
                       console.log(JSON.stringify(response))
                       _username = response.name;
                       _email = response.email;
                       _pass = response.id;
                     tklogin(_email, _pass,_username,true);
                     },
                    function (response) { console.log(JSON.stringify(response)) });
  }

  facebookConnectPlugin.login(["public_profile, email, user_friends"], fbLoginSuccess,
    function loginError (error) {
      console.error(error)
    }
  );
});

});


function tklogin(_email, _pass, _username, fb)
{
       $.ajax({
       type: "GET",
       url: "http://tandaklub.com/get/me?e="+_email+"&p="+_pass+"",
       crossDomain: true,
       cache: false,
       dataType: 'json',
       success: function(result){
           if (result.st == 0) {
             /*TODO:Currently only one error type, add more warnings when available*/
             if(result.err[0] == "NotFound") {
               if (fb == false)
               {
               $( "#warningPlaceHolder" ).empty();
               $( "#warningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>Password o E-mail incorrectos</a>" );
               $('#warningPlaceHolder').show();
                }
                else
                {
                   tkregister(_email, _pass, _username)
                }
             }
           }
           else {
             window.localStorage.setItem("usrId", result.item.id);
             window.localStorage.setItem("usrEmail", loginEmail);
             window.localStorage.setItem("usrPass", loginpass);
             /* Check if We need to lunch Join Tanda page */
             if (JoinTandaID == null && JoinTandaHash == null && JoinTandaGuestID == null) {
                window.location.href="main.html";
                window.location.href.reload(true);
             }
             else {
               /*TODO: ADD option to use Join Tanda Information to launch Join tanda Page*/
             }
           }
       }
       });
}
function tkregister(_email, _pass, _username)
{
$.ajax({
       type: "POST",
       url: "http://tandaklub.com/set/signup?email="+_email+"&name="+_username+"&password="+_pass+"&lang=es-mx&currency=mxn",
       crossDomain: true,
       cache: false,
       dataType: 'json',
       success: function(result) {
           if (result.st == 0) {
             /*TODO:Currently only one error type, add more warnings when available*/
             if(result.err[0] == "NotFound") {
               $( "#warningPlaceHolder" ).empty();
               $( "#warningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>Error durante login</a>" );
               $('#warningPlaceHolder').show();
             }
           }
           else {
             window.localStorage.setItem("usrId", result.val);
             window.localStorage.setItem("usrEmail", _email);
             window.localStorage.setItem("usrPass", _pass);
             /* Check if We need to lunch Join Tanda page */
             if (JoinTandaID == null && JoinTandaHash == null && JoinTandaGuestID == null) {
                window.location.href="main.html";
                window.location.href.reload(true);
             }
             else {
               /*TODO: ADD option to use Join Tanda Information to launch Join tanda Page*/
             }
           }
        }
       });
}
