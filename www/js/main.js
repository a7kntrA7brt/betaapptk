$(document).on("pageinit","#newsfeedpage",function() {
$('#newswarningPlaceHolder').hide();
});
$(document).on("pageinit","#tandaspage",function() {
$('#tandaswarningPlaceHolder').hide();
});
$(document).on("pageinit","#invitationspage",function() {
$('#invitewarningPlaceHolder').hide();
});
$(document).on("pageinit","#friendspage",function() {
$('#frndsdwarningPlaceHolder').hide();
});




$(document).on("pageshow","#newsfeedpage",function() {
  var usrEmail = window.localStorage.getItem("usrEmail");
  var usrPass = window.localStorage.getItem("usrPass");
  var usrId = window.localStorage.getItem("usrId");

  $("#newsfeedinfo").empty( );

  $.ajax({
    type: "GET",
    url: "http://tandaklub.com/get/feed?e="+usrEmail+"&p="+usrPass+"",
    crossDomain: true,
    cache: false,
    dataType: 'json',
    success: function(result) {
      if (result.st == 0) {
        /*TODO:Currently only one error type, add more warnings when available*/
        if(result.err[0] == "NotFound") {
          $( "#newswarningPlaceHolder" ).empty();
          $( "#newswarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
          $('#newswarningPlaceHolder').show();
        }
      }
      else {
        if (result.list.length != 0) {
            var content ="";
          for(var i = 0; i < result.list.length; i++) {
            //var content=""
            ftype = result.list[i].type;
            fstat = result.list[i].status;
            fdate = result.list[i].date;
            if( ftype != null && fstat != null && fdate != null  ){
              if (ftype=="5") {
                /*Check if invited to this proposal*/
                fproposal_id = result.list[i].id_proposal;
                //var content ="";
                moneyPot = result.list[i].pot;
                if(moneyPot != null){
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p> Has sido invitado una nueva tanda de "+moneyPot+"</p>";
                    var link =  "<a href='joinTanda.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
              }/* if (ftype == 5)*/
              if (ftype=="8") {
                /*Check if there is a newly created tanda from friend*/
                fproposal_id = result.list[i].id_proposal;
                //var content ="";
                moneyPot = result.list[i].pot;
                if(moneyPot != null){
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p> Se ha creado una nueva tanda de "+moneyPot+"</p>";
                    var link =  "<a href='TandaRequests.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
              }/* if (ftype == 8)*/
              if (ftype=="3") {
                /*Check if user created a proposal*/
                fproposal_id = result.list[i].id_proposal;
                //var content ="";
                moneyPot = result.list[i].pot;
                if(moneyPot != null){
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p> Has creado una tanda de "+moneyPot+"</p>";
                    var link =  "<a href='tandaInfo.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
              }/* if (ftype == 3)*/
              if (ftype=="4") {
                /*Check if user created a proposal*/
                fproposal_id = result.list[i].id_proposal;
                //var content ="";

                if(result.list[i].creator_id != usrId ){
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p>"+result.list[i].creator_name +" ha aceptado participar en tu tanda</p>";
                    var link =  "<a href='tandaInfo.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
                else{
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p> Has aceptado participar en una tanda</p>";
                    var link =  "<a href='tandaInfo.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
              }/* if (ftype == 4)*/
              if (ftype=="9") {
                /*Check if user created a proposal*/
                fproposal_id = result.list[i].id_proposal;
                //var content ="";
                if(result.list[i].creator_id != usrId ){
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p>"+result.list[i].creator_name +" ha pedido participar en tu tanda</p>";
                    var link =  "<a href='TandaRequests.html?poolId="+fproposal_id +"&type=frndrqst' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
                else{
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p> Has pedido participar en una tanda</p>";
                    var link =  "<a href='tandaInfo.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
              }/* if (ftype == 9)*/
              if (ftype=="10") {
                /*Check if user created a proposal*/
                fproposal_id = result.list[i].id_proposal;
                //var content ="";
                if(result.list[i].creator_id != usrId ){
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p>"+result.list[i].creator_name +" ha aceptado que te unas a la tanda</p>";
                    var link =  "<a href='joinTanda.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
                else{
                    var headstring="<h4 class='headerboxed'>Nueva Tanda</h4>";
                    var infostring="<p> Has aceptado nuevo participante en una tanda</p>";
                    var link =  "<a href='tandaInfo.html?poolId="+fproposal_id +"&type=p' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                }
              }/* if (ftype == 9)*/
            }/*if( ftype != null && fstat*/
          } /*for(var i = 0; i < result*/
           $( "#newsfeedinfo" ).append( content );
         }/*if (result.list.length != 0*/
         else {
            $( "#newsfeedinfo" ).append("<p class='singleboxed'>No hay Noticias</p>");
         }
        }/*else*/
      }/* function(result) */
  }); /*Request for Feed*/
});


/*Get all Tandas that are Active
that User participates in */
/*Get all Tandas that are Proposals
that User - Not yet ActivePools */

$(document).on("pageshow","#tandaspage",function() {
  var moneyPot= null;
  var fstdate= null;
  var tname= null;
  var pot_frequency= null;
  var charge= null;
  var poolId= null;
  var stat = true;
  var type =null;
  var status=null;

  /* Refrehing each time we are Loading the page*/
  $( "#penCrtedTandas" ).empty( );
  $( "#activeTandas" ).empty( );
  $( "#closdTandas" ).empty( );

  var usrEmail = window.localStorage.getItem("usrEmail");
  var usrPass = window.localStorage.getItem("usrPass");

  if ((usrEmail != null && usrPass != null) && (usrEmail != "" && usrPass != "" )) {

    $.ajax({
      type: "GET",
      url: "http://tandaklub.com/get/mypools?e="+usrEmail+"&p="+usrPass+"",
      crossDomain: true,
      cache: false,
      dataType: 'json',
      success: function(result) {
        if (result.st == 0) {
          /*TODO:Currently only one error type, add more warnings when available*/
          if(result.err[0] == "NotFound") {
            $( "#tandaswarningPlaceHolder" ).empty();
            $( "#tandaswarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
            $('#tandaswarningPlaceHolder').show();
          }
        }
        else {
          if (result.list.length != 0) {
            var content ="";
            for(var i = 0; i < result.list.length; i++) {
              moneyPot = result.list[i].pot;
              fstdate = result.list[i].start;
              pot_frequency = result.list[i].pot_frequency;
              charge = result.list[i].charge;
              frequency = result.list[i].frequency;
              tname = result.list[i].name;
              poolId = result.list[i].id;
              if( moneyPot != null && fstdate != null &&  pot_frequency != null && charge != null && frequency != null && tname != null){
                pot_frequency = freq2string(pot_frequency);
                var headstring="<h4 class='headerboxed'>"+tname+"</h4>";
                var infostring="<p>Tanda: "+moneyPot+"MXN</p><p>Frequencia:"+pot_frequency+"</p><p>Comienza: "+fstdate+"</p><p>Cobro: "+charge+"</p>"
                var link =  "<a href='tandaInfo.html?poolId="+poolId+"&type=a' rel='external'>Mayor Informacion</a>"
                content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
              }
            }/*for(var i = 0...*/

              $( "#activeTandashead" ).append( content );
            }/* if (result.list.length != 0)*/
            else {
              $( "#activeTandas" ).append("<p class='singleboxed'>No hay Tandas</p>");
            }
          }
        } /*  success: function(result..*/
        });
        $.ajax({
          type: "GET",
          url: "http://tandaklub.com/get/myproposals?e="+usrEmail+"&p="+usrPass+"",
          crossDomain: true,
          cache: false,
          dataType: 'json',
          success: function(result) {
            if (result.st == 0) {
              /*TODO:Currently only one error type, add more warnings when available*/
              if(result.err[0] == "NotFound") {
                $( "#tandaswarningPlaceHolder" ).empty();
                $( "#tandaswarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
                $('#tandaswarningPlaceHolder').show();
              }
            }
            else {
              if (result.list.length != 0) {
                var content ="";
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
                      var link =  "<a href='tandaInfo.html?poolId="+poolId+"&type=p' rel='external'>Mayor Informacion</a>"
                      content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                  }
                }/*for(var i = 0...*/
                //  $( "#penCrtedTandas" ).append( content ).collapsibleset( "refresh" );
                    if(content == "") {
                      content="<p class='singleboxed'>No tienes nuevas Tandas</p>";
                    }
                    $( "#penCrtedTandas" ).append( content );
                }/* if (result.list.length != 0)*/
                else {
                  $( "#penCrtedTandas" ).append( "<p class='singleboxed'>No tienes nuevas Tandas</p>" );
                }
              }
            } /*  success: function(result..*/
            });
            $.ajax({
              type: "GET",
              url: "http://tandaklub.com/get/myclosed?e="+usrEmail+"&p="+usrPass+"",
              crossDomain: true,
              cache: false,
              dataType: 'json',
              success: function(result) {
                if (result.st == 0) {
                  /*TODO:Currently only one error type, add more warnings when available*/
                  if(result.err[0] == "NotFound") {
                    $( "#tandaswarningPlaceHolder" ).empty();
                    $( "#tandaswarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
                    $('#tandaswarningPlaceHolder').show();
                  }
                }
                else {
                  if (result.list.length != 0) {
                    var content ="";
                    for(var i = 0; i < result.list.length; i++) {
                      moneyPot = result.list[i].pot;
                      fstdate = result.list[i].start;
                      pot_frequency = result.list[i].pot_frequency;
                      charge = result.list[i].charge;
                      frequency = result.list[i].frequency;
                      tname = result.list[i].name;
                      poolId = result.list[i].id;
                      if( moneyPot != null && fstdate != null &&  pot_frequency != null && charge != null && frequency != null && tname != null){
                        pot_frequency = freq2string(pot_frequency);
                        var headstring="<h4 class='headerboxed'>"+tname+"</h4>";
                        var infostring="<p>Tanda: "+moneyPot+"MXN</p><p>Frequencia:"+pot_frequency+"</p><p>Comienza: "+fstdate+"</p><p>Cobro: "+charge+"</p>"
                        var link =  "<a href='tandaInfo.html?poolId="+poolId+"&type=c' rel='external'>Mayor Informacion</a>"
                        content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                      }
                    }/*for(var i = 0...*/
                      $( "#closdTandas" ).append( content );
                    }/* if (result.list.length != 0)*/
                    else {
                      $( "#closdTandas" ).append( "<p class ='singleboxed'>No hay Tandas</p>" );
                    }
                  }
                } /*  success: function(result..*/
                });

      }/*if (usrEmail != null && us...)*/
      else {
        /*Should not fall in this else*/
        alert("Error. Cerrando applicacion ");
        logOut();
      }
    });

    /*Get all Tandas that are invitationspage
    that User has created or is invited to
    participate - Tanda Finished */
    $(document).on("pageshow","#invitationspage",function() {
      var moneyPot= null;
      var fstdate= null;
      var tname= null;
      var pot_frequency= null;
      var charge= null;
      var frequency= null;
      var poolId= null;
      var stat = true;

      $( "#penInvtedTandas" ).empty( );
      $( "#penInvtedrequestTandas" ).empty( );

      var usrEmail = window.localStorage.getItem("usrEmail");
      var usrPass = window.localStorage.getItem("usrPass");

      if ((usrEmail != null && usrPass != null) && (usrEmail != "" && usrPass != "" )) {
        $.ajax({
          type: "GET",
          url: "http://tandaklub.com/get/invitations?e="+usrEmail+"&p="+usrPass+"",
          crossDomain: true,
          cache: false,
          dataType: 'json',
          success: function(result) {
            if (result.st == 0) {
              /*TODO:Currently only one error type, add more warnings when available*/
              if(result.err[0] == "NotFound") {
                $( "#invitewarningPlaceHolder" ).empty();
                $( "#invitewarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
                $('#invitewarningPlaceHolder').show();
              }
            }
            else {
              if (result.list.length != 0) {
                var content ="";
                for(var i = 0; i < result.list.length; i++) {
                  moneyPot = result.list[i].pot;
                  fstdate = result.list[i].start;
                  pot_frequency = result.list[i].pot_frequency;
                  charge = result.list[i].charge;
                  tname = result.list[i].name;
                  poolId = result.list[i].id;
                  if( moneyPot != null && fstdate != null &&  pot_frequency != null && charge != null  && tname != null){
                    pot_frequency = freq2string(pot_frequency);
                    var headstring="<h4 class='headerboxed'>"+tname+"</h4>";
                    var infostring="<p>Tanda: "+moneyPot+"MXN</p><p>Frequencia:"+pot_frequency+"</p><p>Comienza: "+fstdate+"</p><p>Cobro: "+charge+"</p>"
                    var link =  "<a href='joinTanda.html?poolId="+poolId+"' rel='external'>Mayor Informacion</a>"
                    content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
                  }
                }/*for(var i = 0...*/
                  $( "#penInvtedTandas" ).append( content );
                }/* if (result.list.length != 0)*/
                else {
                  $( "#penInvtedTandas" ).append( "<p class='singleboxed'>No hay nuevas Invitaciones</p>" );
                }
              }
            } /*  success: function(result..*/
            });
$.ajax({
  type: "GET",
  url: "http://tandaklub.com/get/myproposalsrequests?e="+usrEmail+"&p="+usrPass+"",
  crossDomain: true,
  cache: false,
  dataType: 'json',
  success: function(result) {
    if (result.st == 0) {
      /*TODO:Currently only one error type, add more warnings when available*/
      if(result.err[0] == "NotFound") {
        $( "#invitewarningPlaceHolder" ).empty();
        $( "#invitewarningPlaceHolder" ).append( "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-alert ui-state-disabled' data-inline='true' data-mini='true'>No hay informacion</a>" );
        $('#invitewarningPlaceHolder').show();
      }
    }
    else {
      if (result.list.length != 0) {
        var content ="";
        for(var i = 0; i < result.list.length; i++) {
          moneyPot = result.list[i].pot;
          fstdate = result.list[i].start;
          pot_frequency = result.list[i].pot_frequency;
          charge = result.list[i].charge;
          tname = result.list[i].name;
          req_name = result.list[i].req_name;
          req_id = result.list[i].req_id;
          poolId = result.list[i].id;
          if( moneyPot != null && fstdate != null &&  pot_frequency != null && charge != null  && tname != null){
            pot_frequency = freq2string(pot_frequency);
            var headstring="<h4 class='headerboxed'>"+req_name+"</h4>";
            var infostring="<p>"+tname+"</p><p>Tanda: "+moneyPot+"MXN</p><p>Frequencia:"+pot_frequency+"</p><p>Comienza: "+fstdate+"</p>"
            var link =  "<a href='TandaRequests.html?poolId="+poolId+"&type=frndrqst&req_id="+req_id+"' rel='external'>Mayor Informacion</a>"
            content+= headstring+"<div class='boxed'>"+infostring+link+"</div><br>";
          }
        }/*for(var i = 0...*/
          $( "#penInvtedrequestTandas" ).append( content );
        }/* if (result.list.length != 0)*/
        else {
          $( "#penInvtedrequestTandas" ).append( "<p class='singleboxed'>No hay nuevas Invitaciones</p>" );
        }
      }
    } /*  success: function(result..*/
    });


          }/*if (usrEmail != null && us...)*/
          else {
            /*Should not fall in this else*/
            alert("Error. Cerrando applicacion ");
            logOut();
          }
        });


        $(document).on("pageshow","#friendspage",function() {

          var usrPass = window.localStorage.getItem("usrPass");
          var usrEmail = window.localStorage.getItem("usrEmail");

        $( "#frndList" ).empty( );

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
                var newRows = "";
                for(var i = 0; i < result.list.length; i++) {
                  tname = result.list[i].name;
                  tmail = result.list[i].email;
                    newRows+= "<input type='checkbox' name='checkbox"+i+"' id='checkbox"+i+"'>"+
                    "<label for='checkbox"+i+"' style='display:inline'>"+tname+"</label>";
                }/*for(var i = 0...*/
                  content+= "<h4>Amigos de TandaKlub</h4>"+newRows;
                  $( "#frndList" ).append( content );
                }/* if (result.list.length != 0)*/
                else {
                  $( "#frndList" ).append( "<p>No se encontraron amigos</p>" );
                }
              }
            } /*  success: function(result..*/
            });
   });
