window.onload = function(e) {
  liff.init(function(data) {
    initializeUserId(data);
    liff
    .getProfile()
    .then(function(profile){
      $("#dear_title").text("เรียน คุณ "+profile.displayName);
      //alert(JSON.stringify(profile));
    });
  });
  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "userId");
  input.setAttribute("id", "userId");
  //input.setAttribute("value", data.context.userId);
  input.setAttribute("value", 'Uaef7a8e9eedce02d663bf83aec1dd910');
  document.getElementsByTagName("body")[0].append(input);
  quantity_service();
};

function initializeUserId(data) {
  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "userId");
  input.setAttribute("id", "userId");
  input.setAttribute("value", data.context.userId);
  document.getElementsByTagName("body")[0].append(input);
  //window.alert("created element successfully: " + $("#userId").val());
  // document.getElementById("languagefield").textContent = data.language;
  // document.getElementById("viewtypefield").textContent = data.context.viewType;
  // document.getElementById("useridfield").textContent = data.context.userId;
  // document.getElementById("utouidfield").textContent = data.context.utouId;
  // document.getElementById("roomidfield").textContent = data.context.roomId;
  // document.getElementById("groupidfield").textContent = data.context.groupId;
  quantity_service();
}

function render_lineitem(obj)
{
  var i = 0;
  var html_text = "";
  while(obj[i])
  {
    html_text = "<p>" + obj[i][0].product_name + "<i class='fa fa-trash float-right' onclick='del("+obj[i].purchase_lineitem_id+")' aria-hidden='true'></i></p><hr>" + html_text;
    i++;
  }
  return html_text;
}

function check_lineitem()
{
  var UserID = document.getElementById('userId').value;
  var formData = new FormData();
  formData.append('userid',UserID);
  $.ajax({
    url: './api/check_lineitem_api.php',
    method: 'POST',
    data: formData,
    async: true,
		cache: false,
		processData: false,
		contentType: false,
    success: function(response) 
              {
                var obj = JSON.parse(response) || {};
                var html_text = render_lineitem(obj);
                $("#lineitem_area").html(html_text);
              }				
    });
  }

  function del(itemId)
  {
    alert(itemId);
    var formData = new FormData();
    formData.append('lineitem_id',itemId);
    $.ajax({
      url: './api/del_lineitem_api.php',
      method: 'POST',
      data: formData,
      async: true,
      cache: false,
      processData: false,
      contentType: false,
      success: function(response) 
                {
                  alert(response);
                  $("#lineitem_area").html('');
                  check_lineitem()
                  quantity_service()
                }				
    });
  }
$("#cartModal").on('shown.bs.modal', function(){
  check_lineitem();
});

