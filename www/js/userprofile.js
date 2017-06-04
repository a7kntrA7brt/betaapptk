$(document).on("pageshow","#profile",function() {
   var usrPass;
   var usrEmail;

   usrEmail = window.localStorage.getItem("usrEmail");
   usrPass = window.localStorage.getItem("usrPass");

   $.ajax({
   type: "GET",
   url: "http://tandaklub.com/get/me?e="+usrEmail+"&p="+usrPass+"",
   crossDomain: true,
   cache: false,
   dataType: 'json',
   success: function(result){
       if (result.st == 0) {
         /*TODO:Currently only one error type, add more warnings when available*/
         if(result.err[0] == "NotFound") {

         }
       }
       else {
          createSummary(result.item.name, result.item.email, result.item.lang)
       }
   }
   });



function createSummary(_uname, _email, _lang ) {
  var tbhead= "<thead</thead><tbody>";
  var tbfoot ="</tbody>";
  var newRows="";
  if(_uname != null){
    newRows+="<tr><th>User:</th><td> "+_uname+"</td>";
  }
  if(_email != null ){
    newRows+="<tr><th>Email:</th><td> "+_email+"</td>";
  }
  if(_lang != null ){
    newRows+="<tr><th>Language:</th><td> "+_lang+"</td>";
  }
  $( "#profileTable" ).empty( )
  var htmltable=tbhead+newRows+tbfoot;
  $( "table#profileTable" ).append( htmltable );
}
 });
