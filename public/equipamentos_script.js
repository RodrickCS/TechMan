const uriCreateEquipamento = "https://techman-production.up.railway.app/equipamentos/create";
const uriGetComentarios = "https://techman-production.up.railway.app/equipamentos/readComments/";
const uriCreateComentarios = "https://techman-production.up.railway.app/equipamentos/addComment";
const uriExcluirEquipamento = "https://techman-production.up.railway.app/equipamentos/excluir/";

var idEquipamento;

function checkUser() {
  let info = JSON.parse(localStorage.getItem("info"));
  let role = info.Role;
  let buttonsExcluir = document.querySelectorAll(".btExcluir");
  let buttonsNovo = document.querySelectorAll(".btNovo");

  buttonsExcluir.forEach((button) => {
    if (role === "Administrador") {
      button.classList.remove("model");
    } else {
      button.classList.add("model");
    }
  });

  buttonsNovo.forEach((button) => {
    if (role === "Administrador") {
      button.classList.remove("model");
    } else {
      button.classList.add("model");
    }
  });
}

function openModalCriar() {
  document.querySelector(".backModal").classList.remove("model");
  document.querySelector(".modalCriarEquipamento").classList.remove("model");
}

function openModalCriarComentario() {
  document.querySelector(".backModal").classList.remove("model");
  document.querySelector(".modalCriarComentario").classList.remove("model");
  document.querySelector(".modalComentarios").classList.add("model");
}

function closeModalCriarComentario() {
  document.querySelector(".backModal").classList.add("model");
  document.querySelector(".modalCriarComentario").classList.add("model");
}

function openModalComentarios() {
  document.querySelector(".backModal").classList.remove("model");
  document.querySelector(".modalComentarios").classList.remove("model");
}

function closeModalComentarios() {
  document.querySelector(".backModal").classList.add("model");
  document.querySelector(".modalComentarios").classList.add("model");
}

function closeModalCriar() {
  document.querySelector(".backModal").classList.add("model");
  document.querySelector(".modalCriarEquipamento").classList.add("model");
}

function openModalConfirm() {
  document.querySelector(".backModal").classList.remove("model");
  document.querySelector(".modalConfirm").classList.remove("model");
}

function closeModalConfirm() {
  document.querySelector(".backModal").classList.add("model");
  document.querySelector(".modalConfirm").classList.add("model");
}

function logout() {
  window.location.href = "https://techman-production.up.railway.app";
}

function criarEquipamento() {
  var inputNome = document.querySelector(".inpNome").value;
  var inputImagem = document.querySelector(".inpImagem").value;
  var inputDescricao = document.querySelector(".inpDescricao").value;
  var inpCheckBox = 0;

  var checkBox = document.querySelector("#checkAtivo");

  checkBox.checked ? (inpCheckBox = 1) : inpCheckBox === 0;

  let form = {
    equipamento: inputNome,
    imagem: inputImagem,
    descricao: inputDescricao,
    ativo: inpCheckBox,
    data: new Date(),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  };

  fetch(uriCreateEquipamento, options)
    .then((resp) => {
      return resp.status;
    })
    .then((data) => {
      if (data === 201) {
        window.location.reload();
      }
    });
}

function fetchComentarios(id) {
  idEquipamento = id;
  const options = {
    method: "GET",
  };

  fetch(uriGetComentarios + id, options)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      data.forEach((dado) => {});

      openModalComentarios();
      buildComentarios(data);
    });
}

function buildComentarios(dados) {
  const modalComentarioBody = document.querySelector(".modalComentarioBody");

  while (modalComentarioBody.firstChild) {
    modalComentarioBody.removeChild(modalComentarioBody.firstChild);
  }

  dados.forEach((comentario) => {
    const data = new Date(comentario.data);
    const dataFormatada = data.toLocaleDateString("pt-BR");

    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    div.style.borderBottom = "1px solid black";
    div.style.padding = "12px";
    div.style.gap = "12px";
    h2.classList.add("headerText");
    p.classList.add("descText");

    h2.innerHTML = comentario.perfil + " - " + dataFormatada;
    p.innerHTML = comentario.comentario;

    div.appendChild(h2);
    div.appendChild(p);

    modalComentarioBody.appendChild(div);
  });
}

function cadastrarComentario() {
  const data = new Date();
  const dataBrasilia = new Date(data.getTime() - 3 * 60 * 60 * 1000);
  const dataIso = dataBrasilia.toISOString();

  let comentario = document.querySelector("#inpComentario").value;
  let info = JSON.parse(localStorage.getItem("info"));

  let form = {
    comentario: comentario,
    equipamento: idEquipamento,
    perfil: info.Perfil,
    data: dataIso,
  };

  console.log(form);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  };

  fetch(uriCreateComentarios, options)
    .then((resp) => {
      return resp.status;
    })
    .then((data) => {
      if (data === 201) {
        window.location.reload();
      } else {
        alert("Ocorreu um erro");
      }
    });
}

function excluirEquipamento(id) {
  if (confirm("Confirma exclusão")) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(uriExcluirEquipamento + id, options)
      .then((resp) => {
        return resp.status;
      })
      .then((data) => {
        if (data === 204) {
          window.location.reload();
        } else {
          alert("Ocorreu um erro");
        }
      });
  }
}

checkUser();
