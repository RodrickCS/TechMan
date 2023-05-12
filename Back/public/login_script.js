function addChar(char) {
  var passwordInput = document.getElementById("senha")
  passwordInput.value += char
}

function clearInput() {
  var passwordInput = document.getElementById("senha")
  passwordInput.value = ""
}

function submitForm() {
  var passwordInput = document.getElementById("senha")

  fetch("/entrar", {
    method: "POST",
    body: JSON.stringify({
      senha: passwordInput.value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.length > 0)
        data.forEach(dado => {
          localStorage.setItem("info", JSON.stringify(dado))
          window.location.href = "/equipamentos"
        })
        else
          alert("Ocorreu um erro")
    })

}
