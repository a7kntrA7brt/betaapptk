var JoinTandaID = null
var JoinTandaHash = null
var JoinTandaGuestID = null
var nFbUsr= null;
var nUsr = null;


$(document).on("pageinit","#login",function() {
  var usrEmail;
  var usrPass;
  /*Check if user is alredy logged in*/
  usrEmail = getLocalEmail();
  usrPass = getLocalPass();

 /*TODO: ADD option to parse Join Tanda Info Here from URL or Data */
 $('#warningPlaceHolder').hide();

  if (usrEmail != null && usrPass != null) {
      nUsr = new tkUser (null,null,usrEmail,usrPass,null,null,null);
      nUsr.getMe(loadMainWrapper,logConsole);
  }
});

function loadMainWrapper(result)
{
    loadMain();
}

function loadMain()
{
    window.location.href="main.html";
    window.location.href.reload(true);
}
function logConsole(error)
{
    console.log(error);
}
$(document).on("pageshow","#login",function() {
    /*User is not logged In- waiting for submit*/
    $("#submitlogin").click(function()
    {
        var loginEmail = document.getElementById("loginEmail").value;
        var loginpass = document.getElementById("loginPasswrd").value;

        if ((loginEmail != null && loginpass != null) && (loginEmail != "" && loginpass != "") )
        {
            tklogin(loginEmail, loginpass);
        }
        else
        {
            showMessage("Uno o mas campos son invalidos");
        }
    });

    $("#facebooklogin").click( function()
    {
    var usrName;
    var usrEmail;
    var usrPass;

      var fbLoginSuccess = function (userData) {
        facebookConnectPlugin.api( "me/?fields=name,email", ["public_profile,email"],
                        function (response) {
                           console.log(JSON.stringify(response))
                           usrName = response.name;
                           usrEmail = response.email;
                           usrPass = response.id;
                           fblogin(usrEmail, usrPass, usrName);
                         },
                        function (response) { console.log(JSON.stringify(response)) });
      }
      facebookConnectPlugin.login(["public_profile, email, user_friends,publish_actions "], fbLoginSuccess,
        function loginError (error) {
          console.error(error)
        }
      );
    });

});

function showMessage(message)
{
   $( "#warningPlaceHolder" ).empty();
   $( "#warningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>Password o E-mail incorrectos</a>" );
   $('#warningPlaceHolder').show();
}

function LoginSuccess(result)
{
    setLocalStorage( result.item.id,
                    result.item.email,
                    nUsr.password);
    loadMain();
}

function tkLoginFail()
{
    showMessage("Password o E-mail incorrectos");
}

function tklogin(_email, _pass)
{
      nUsr = new tkUser (null, null, _email,
                             _pass, null, null, null);
      nUsr.getMe(LoginSuccess, tkLoginFail);
}

function registerSuccess(_id, _email, _password)
{
    setLocalStorage( _id,
                    _email,
                    _password);
    loadMain();
}

function registerFail()
{
    showMessage("Error durante login");
}

function fbLoginFail()
{
    nFbUsr.registerFB(registerSuccess, registerFail);
}

function fblogin(_email, _pass, _username)
{
      nFbUsr = new tkUser (null, _username, _email,
                             _pass, null, null, null);
      nFbUsr.getMe(LoginSuccess, fbLoginFail);
}
