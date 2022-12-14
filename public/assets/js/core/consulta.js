let jsonViewer = new JSONViewer();
document.querySelector("#json").appendChild(jsonViewer.getContainer());

/**URL da API */
let url = "https://qualisapi.herokuapp.com/api/qualis/"; //url para commit no heroku
//let url = "http://localhost:8080/api/qualis/"; //url para teste local nodemon

/**Cria um alerta  */
let alertMsg = function (msg1, msg2, color = 'bg-warning') {
  let msg = "<div class='alert alert-warning alert-dismissible fade show mt-2 " + color + "' role='alert'><span class='alert-inner--icon'><i class='ni ni-bell-55'></i></span><span class='alert-inner--text'><strong>" + msg1 + "</strong> " + msg2 + "</span>    <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span>    </button></div>";
  return msg;
}
/**Realiza consulta no API, e apresenta os resultados em formato json */
function consultaQualis(fullURL) {
  fetch(fullURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data['message']);
      //console.log(data);
      //console.table(data);
      if (data['data'][0]) {
        //issn encontrado
        //let newData = removeIdCreateDate(data['data']);
        let newData = data['data'];
        console.table(newData);
        document.getElementsByClassName('json-viewer')[0].style.display = 'block';
        jsonViewer.showJSON(newData);
        document.getElementById('loader').style.display = 'none';
      } else {
        //issn não encontrado
        console.table(data);
        document.getElementsByClassName('json-viewer')[0].style.display = 'block';
        jsonViewer.showJSON(data);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('alertMsgBox').innerHTML = alertMsg("Aviso!", "Número de ISSN não encontrado.", "bg-info");
      }
    })
    .catch((erro) => {
      console.log("Erro:" + erro);
      document.getElementById('loader').style.display = 'none';
    });
}

/*Não tem mais utilidade porque estou usando um filter no .find() do Mongoose para excluir o _id e create-date */
/*
function removeIdCreateDate(data) {
  Object.keys(data).forEach(function (key) {
    delete data[key]['_id'];
    delete data[key]['create_date'];
  });
  return data;
}
*/

/**Cria o link direto para os resultados */
function criaLinkDirectResults(fullURL) {
  let anchorLink = document.getElementById('directresults');
  anchorLink.innerHTML = fullURL;
  anchorLink.setAttribute('href', fullURL);
}

function isIssnEmpty() {
  return !document.getElementById("issn").value;
}
// Validação da URL de consulta
function isValidURL(issn) {
  //v[1-2]\/issn\/[0-9]{4}-[0-9]{3}[0-9|x]{1} //REGEX ISSN com url da api
  let str = issn;
  let patt = new RegExp('^v[1-2]\/issn\/[0-9]{4}-[0-9]{3}[0-9|X]{1}', 'gmi');
  return patt.test(str);
}

/**Botão submit, alerta de erro no issn inserido */
let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener('click', function () {
  let dataISSN = document.getElementById("issn").value;
  let fullURL = url + dataISSN;

  if (isIssnEmpty()) {
    document.getElementById('alertMsgBox').innerHTML = alertMsg("Atenção!", "Insira um número de ISSN no campo acima.");
  } else if (!isValidURL(dataISSN)) {
    document.getElementById('alertMsgBox').innerHTML = alertMsg("Atenção!", "Formato de busca inválido. <br>Use uma pesquisa válida:<br>v1/issn/0000-0000 --> para dados do quadriênio 2013-2016<br>v2/issn/0000-0000 --> para dados do período 2017-2018");
  } else {
    document.getElementById('alertMsgBox').innerHTML = "";
    document.getElementById('loader').style.display = 'inline-block';
    document.getElementsByClassName('json-viewer')[0].style.display = 'none';
    consultaQualis(fullURL);
    criaLinkDirectResults(fullURL);
  }
});

/**Hints quer uma dica? */
let hints = document.getElementsByClassName('hints');
Array.prototype.forEach.call(hints, function (item) {
  item.addEventListener('click', function () {
    document.getElementById("issn").value = item.innerHTML;
    btnSubmit.click();
  });
});

/*Ao usar a tecla ENTER no search-box, realiza a consulta*/
document.getElementById('issn').addEventListener('keyup', function () {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSubmit.click();
  }
});

window.onload = function () {
  btnSubmit.click();
};