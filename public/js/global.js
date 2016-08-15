$(function(){
	$(window).bind("load", function() {
    
    navBarCompensation();
    
    function positionFooter() {
     
     // get body height
      var bodyH = $("body").height();
      // doc height
      var docH = $(document).height();
      // nav height
      var navH = $("nav").height();
      // get footer height
      var footerH = $("footer").height();
      var margin = bodyH - navH - footerH
     
      if (docH == bodyH) {
        $("footer").css("margin-top", margin+'px');
      }
      
      else {
      margin = 36+'px';
        $("footer").css("margin-top", margin);
        $("footer").css({position: "static"});
        $("footer").css({bottom: 0});
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
