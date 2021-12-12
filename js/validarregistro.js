
function saveUser() {
  var name = $.trim($("#name").val());
  var email = $.trim($("#email").val());
  var password = $.trim($("#password").val());
  var password2 = $.trim($("#password2").val());

  if (name != "" && email != "" && password != "" && password2 != "") {
    if (password != password2) {
      alert("Las claves no coinciden");
      $("#password2").focus();
    } else {
      $.ajax({
        url: "http://144.22.59.33:8080/api/user/new",
        data: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
        type: "POST",
        contentType: "application/json",

        error: function (result) {
          alert("Usuario no registrador..!");
          console.log(result);
        },
        success: function () {

          alert("Cuenta Creada de Manera Correcta...!");
          $("#formregister").trigger("reset");

        },
      });
    }
  }
  return false;
}

