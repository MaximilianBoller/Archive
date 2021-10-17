



// load header of page
const header = document.getElementById('header');

// load Header and Footer
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

  xhr.open('GET', '../html/header.html', true);
  xhr.send('');

}

// set subheader to page name
function setSubheader(subheader){
  document.getElementById('subheader').innerText = "Blog > Submit new blog"
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

  xhr.open('GET', '../html/footer.html', true);
  xhr.send('');
}

//-----------------------------------------------------------------


let file_code = document.getElementById('file-code');




getBlogTemplate();

function getBlogTemplate() {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "text";

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      let templateDocument;
      templateDocument = xhr.response;
      file_code.value = templateDocument;
    }
  }

  xhr.open('GET', '../blog-posts/blog-template.html', true);
  xhr.send('');
}









enableTab();
function enableTab() {
  file_code.onkeydown = function(e) {
      if (e.keyCode === 9) { // tab was pressed

          // get caret position/selection
          var val = this.value,
              start = this.selectionStart,
              end = this.selectionEnd;

          // set textarea value to: text before caret + tab + text after caret
          this.value = val.substring(0, start) + '\t' + val.substring(end);

          // put caret at right position again
          this.selectionStart = this.selectionEnd = start + 1;

          // prevent the focus lose
          return false;

      }
  };
}

let viewport = document.getElementById('viewport');

let execute = document.getElementById('execute').addEventListener('click', executeToViewport);





function executeToViewport(){

  let htmlSite = new Document();
  htmlSite = file_code.value;


  if(viewport.innerHTML != null){
    viewport.innerHTML = '';
  }


  //let blog = htmlSite.getElementById('blog-site');
  console.log("BLOG | " + htmlSite);

  viewport.innerHTML = htmlSite;
}



