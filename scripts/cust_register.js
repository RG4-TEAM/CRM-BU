window.onload = function(e) {
  liff.init(function(data) {
    initializeApp(data);
  });
};

function initializeApp(data) {
  liff
    .getProfile()
    .then(function(profile) {
      // check registered status
      $.ajax({
        url: "api/check_registered_status.php",
        method: "GET",
        data: "userId=" + profile.userId,
        beforeSend: function() {},
        success: function(response) {
          var responseJSON = JSON.parse(response) || {};
          if (!("status" in responseJSON)) {
            window.alert("ระบบทำงานไม่ถูกต้อง, กรุณาลองใหม่อีกครั้ง");
            liff.closeWindow();
            return;
          }

          if (responseJSON.status == 200) {
            window.alert(
              "ท่านลงทะเบียนเรียบร้อยแล้ว, ระบบจะนำท่านสู่ PEA SmartBiz ค่ะ"
            );
            window.location.replace("customer.php?action=liff_service");
          } else {
            $("#uIdInput").val(profile.userId);
            $("#profileImage").attr("src", profile.pictureUrl);
            $("#uNameInput").text(profile.displayName);
          }
        },
        error: function() {
          window.alert("Error ajax fetch data");
        }
      });
    })
    .catch(function(error) {
      window.alert("Error getting profile: " + error);
    });
}

$(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "api/update_line_infomation.php",
      method: "POST",
      data: $(this).serializeArray(),
      beforeSend: function() {
        // window.alert("beforeSend alert");
        $.blockUI({
          message: "<h4 class=\"p-1 font-weight-bold text-center\">กำลังตรวจสอบข้อมูล</h4>"
        });
      },
      success: function(response) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "ระบบบันทึกข้อมูลของท่านเรียบร้อยแล้ว ขอบคุณครับ",
          type: "success",
          confirmButtonText: "ปิดหน้าต่างนี้"
        }).then(function() {
          liff
            .sendMessages([
              {
                type: "text",
                text: "ลงทะเบียนสำเร็จ"
              }
            ])
            .then(function() {
              liff.closeWindow();
            });
        });
      },
      error: function() {
        Swal.fire({
          title: "Error!",
          text: "ไม่พบหมายเลข CA ที่ท่านกรอก, กรุณาตรวจสอบหมายเลขดังกล่าวอีกครั้งค่ะ",
          type: "error",
          confirmButtonText: "ปิดหน้าต่างนี้"
        });
        // window.location.reload();
      },
      complete: function() {
        // window.alert("endding form");
        $.unblockUI();
      }
    });
  });
});
