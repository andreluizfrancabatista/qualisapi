let jsonViewer = new JSONViewer();
document.querySelector("#json").appendChild(jsonViewer.getContainer());

let url = "https://qualisapi.herokuapp.com/api/qualis/issn/";

let alertMsg = function(msg1, msg2, color = 'bg-warning'){
  let msg = "<div class='alert alert-warning alert-dismissible fade show mt-2 " + color + "' role='alert'><span class='alert-inner--icon'><i class='ni ni-bell-55'></i></span><span class='alert-inner--text'><strong>" + msg1 + "</strong> " + msg2 + "</span>    <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span>    </button></div>";
  return msg;
}

function consultaQualis(fullURL) {
  fetch(fullURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data['message']);
      console.log(data);
      if (data['data'][0]) {
        //issn encontrado
        let newData = removeIdCreateDate(data['data']);
        console.table(newData);
        document.getElementsByClassName('json-viewer')[0].style.display = 'block';
        jsonViewer.showJSON(newData);
        document.getElementById('loader').style.display = 'none';
      } else {
        //issn não encontrado
        console.table(data['data']);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('alertMsgBox').innerHTML = alertMsg("Aviso!", "Número de ISSN não encontrado.", "bg-info");
      }
    })
    .catch((erro) => {
      console.log("Erro:" + erro);
      document.getElementById('loader').style.display = 'none';
    });
}

function removeIdCreateDate(data) {
  Object.keys(data).forEach(function (key) {
    delete data[key]['_id'];
    delete data[key]['create_date'];
  });
  return data;
}

function criaLinkDirectResults(fullURL) {
  let anchorLink = document.getElementById('directresults');
  anchorLink.innerHTML = fullURL;
  anchorLink.setAttribute('href', fullURL);
}

function isIssnEmpty() {
  return !document.getElementById("issn").value;
}

let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener('click', function () {
  let dataISSN = document.getElementById("issn").value;
  let fullURL = url + dataISSN;

  if (isIssnEmpty()) {
    document.getElementById('alertMsgBox').innerHTML = alertMsg("Atenção!", "Insira um número de ISSN no campo acima.");
  } else {
    document.getElementById('loader').style.display = 'inline-block';
    document.getElementsByClassName('json-viewer')[0].style.display = 'none';
    consultaQualis(fullURL);
    criaLinkDirectResults(fullURL);
  }
});

let hints = document.getElementsByClassName('hints');
Array.prototype.forEach.call(hints, function (item) {
  item.addEventListener('click', function () {
    document.getElementById("issn").value = item.innerHTML;
  });
});

document.getElementById('issn').addEventListener('keyup', function () {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSubmit.click();
  }
});

window.onload = function () {
  btnSubmit.click();
};