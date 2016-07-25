$(function(){
	$(window).bind("load", function() {
    
    
    function positionFooter() {
      navBarCompensation();
     
     // get body height
      var bodyH = $("body").height();
      // doc height
      var docH = $(document).height();
      // nav height
      var navH = $("nav").height();
      // get window height
      // var windowH = height()
      // get footer height
      var footerH = $("footer").height();
      // get footer margin
      // var footerM = $("footer").css("margin-top");
      // footerM = parseInt(footerM.substring(0, footerM.indexOf("px")));
      var margin = bodyH - navH - footerH
      // var margin = windowH - bodyH + footerM - 1;
      // console.log("doc", docH, "body", bodyH, "window", windowH, "footer", footerH, "footerM", footerM, "nav", navH);
      if (docH == bodyH) {
        $("footer").css("margin-top", margin+'px');
      }
      else {
       margin = 36+'px';
        $("footer").css("margin-top", margin);
        $("footer").css({position: "static"});
      }
      
      
   
      
      
    }

    $(window).resize(positionFooter)
    positionFooter();
    
    
  });

  function height() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  }
  });
  
  function navBarCompensation(){
    
     var n = $('.navbar-fixed-top');
      var navH = n.height();
      n.parent().css({'padding-top':navH+'px'});

  }
