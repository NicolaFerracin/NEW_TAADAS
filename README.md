# TADAAS phase 2

testing the branches - take 3



example of html comment form:

<div id="comment_form_container">
<form action="/order" method="post" target="redirectholder_f2323fsa">

<input name="to" value="training.director" type="hidden">
<input name="subj" value="New comment on training page" type="hidden">

<textarea name="comments" placeholder="Leave a comment for the Training Director" id="comments" style="font-family:sans-serif;width:100%;height:150px;padding:2%;font-size:1.2em;border:1px solid #000;"></textarea>

<input id="submit-comment-btn" type="submit" value="Submit">
</form>
<iframe name="redirectholder_f2323fsa" style="display:none"></iframe>
</div>
<script>
  $('#submit-comment-btn').click(function(){
  var f = $('#comment_form_container');
  f.hide();
  f.parent().append('<h2>Tahank you</h2>your comment will be delivered to our training director.');
  
})

</script>

