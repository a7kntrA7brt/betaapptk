$(document).on("pageshow","#invitationSearch",function() {
   var usrPass;
   var usrEmail;

   usrEmail = window.localStorage.getItem("usrEmail");
   usrPass = window.localStorage.getItem("usrPass");

   $.ajax({
     type: "GET",
     url: "http://tandaklub.com/get/friends?e="+usrEmail+"&p="+usrPass+"",
     crossDomain: true,
     cache: false,
     dataType: 'json',
     success: function(result) {
       if (result.st == 0) {
         /*TODO:Currently only one error type, add more warnings when available*/
         if(result.err[0] == "NotFound") {
          /*TODO: Determine proper action*/
         }
       }
       else {
         tkfrndcnt = result.list.length;
         if (result.list.length != 0) {
           var content ="";
           var frndadd =0;
           for(var i = 0; i < result.list.length; i++) {
             frid = result.list[i].id;
             frndadd++;
             $.ajax({
               type: "GET",
               url: "http://tandaklub.com/get/friendproposals?e="+usrEmail+"&p="+usrPass+"&id="+frid,
               crossDomain: true,
               cache: false,
               dataType: 'json',
               success: function(result) {
                 if (result.st == 0) {
                   /*TODO:Currently only one error type, add more warnings when available*/
                   if(result.err[0] == "NotFound") {
                  /*   $( "#tandaswarningPlaceHolder" ).empty();
                     $( "#tandaswarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
                     $('#tandaswarningPlaceHolder').show();*/
                   }
                 }
                 else {
                   if (result.list.length != 0) {
                     for(var i = 0; i < result.list.length; i++) {
                       moneyPot = result.list[i].pot;
                       fstdate = result.list[i].start;
                       pot_frequency = result.list[i].pot_frequency;
                       charge = result.list[i].charge;
                       tname = result.list[i].name;
                       poolId = result.list[i].id;
                       type = result.list[i].mtype;
                       status = result.list[i].status;
                       if( moneyPot != null && fstdate != null &&  pot_frequency != null && charge != null  && tname != null && status != null){
                           var statstring = propstat2string(status);
                           pot_frequency = freq2string(pot_frequency);
                           var headstring="<h4 class='headerboxed'>"+tname+"  ("+statstring+")</h4>";
                           var infostring="<p>Tanda: "+moneyPot+"MXN</p><p>Frequencia:"+pot_frequency+"</p><p>Comienza: "+fstdate+"</p><p>Cobro: "+charge+"</p>"
                           var link =  "<a href='TandaRequests.html?poolId="+poolId+"' rel='external'>Mayor Informacion</a>"
                           content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                       }
                     }/*for(var i = 0...*/
                     //  $( "#penCrtedTandas" ).append( content ).collapsibleset( "refresh" );
                     if (frndadd == tkfrndcnt){
                     if(content == "") {
                       content="<p class='singleboxed'>No hay propuestas dispibles</p>";
                     }
                     $( "#invitationsInfo" ).append( content );
                   }
                     }/* if (result.list.length != 0)*/
                     else{
                        content="<p class='singleboxed'>No hay propuestas dispibles</p>";
                        $( "#invitationsInfo" ).append( content );
                     }
                   }

                 } /*  success: function(result..*/
                 });

           }/*for(var i = 0...*/

           }/* if (result.list.length != 0)*/
           else {
             $( "#invitationsInfo" ).append( "<p>No se encontraron amigos</p>" );
           }
         }
       } /*  success: function(result..*/
       });
 });
