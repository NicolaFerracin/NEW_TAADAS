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
    
    var brandImg = $('.brandimage').find('img');
    var decreasingPos = 400;
    
    $(document).on('scroll',function(e){
      
      if ($(window).scrollTop()>decreasingPos) {
        brandImg.css({width:'87px',transition:'0.3s'});
      } else {
        brandImg.css({width:'348px',transition:'0.3s'});
      }
    });
      if ($(window).scrollTop()>decreasingPos) {
        brandImg.css({width:'87px'});
      }
    
    
  });

  function height() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  }

  $('a.apos-files-name').attr('target','_blank');
  

  //hide emty columns
  $('.hide-if-empty').each(function(){
    if(!$(this).text().replace(/^\s+|\s+$/g, '') && ($('img', this).length===0) && !(apos.data.user && apos.data.user.permissions.edit)) {
      $(this).hide();
    } else {
      $(this).removeClass('hide-if-empty');
    }
  });
  
  
  
  //pdf links tracking 
  var trackOutboundPdfLink = function(event) {
     ga('send', 'event', 'pdf', 'click', event.target.text);
  }
  $('a[href$=".pdf"]').each(function(){
     $(this).on('click', trackOutboundPdfLink);
  })
  
  
  
});
  
function navBarCompensation(){
   var n = $('.navbar-fixed-top');
   n.css({position:'fixed'});
    var navH = n.height();
    n.parent().css({'padding-top':navH+'px'});

}

