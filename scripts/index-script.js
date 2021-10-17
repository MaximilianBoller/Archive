

getHeader();
let headerDocument;

function getHeader() {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "text";

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      
      headerDocument = xhr.response;
      header.innerHTML = headerDocument;
      setSubheader();
    }
  }

  xhr.open('GET', 'html/header.html', true);
  xhr.send('');

}

// set subheader to page name
function setSubheader(subheader){
  document.getElementById('subheader').innerText = "Home"
}





getFooter();

function getFooter() {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "text";

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      let footerDocument;
      footerDocument = xhr.response;
      footer.innerHTML = footerDocument;
    }
  }

  xhr.open('GET', 'html/footer.html', true);
  xhr.send('');
}