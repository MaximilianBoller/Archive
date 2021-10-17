





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
  document.getElementById('subheader').innerText = "Blog"
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











const blog_card_section = document.getElementById("blog-card-section");
const pinned_blog_section = document.getElementById("right-section");


const full_blog_area = document.getElementById("full-blog-area");
 // raw blog preview data



//-----------------------------------------------------------------------
// VERSUCH
console.log("----------");

let testArray = [ ];
testArray.push("Peter");
testArray.push("Peter");
testArray.push("Peter");
testArray.push("Peter");


for(let i = 0; i < 5; ++i)
{
  var person = {
    name: "Hans",
    alter: 24
  };

  testArray.push(person);
}


testArray.push(person);

console.log("NAME object | " + testArray[5].name);
console.log("TEST ARRAY | " + testArray);
console.log("LENGTH | " + testArray.length);

console.log("----------");
//-------------------------------------------------------------------------



getFileList();

function getFileList() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log("SCAN DIR | " + xhr.result);
    }
  }
  xhr.open('GET', 'blog-posts/scanDir.php', true);
  xhr.send('');
}






// Initialize Files
let blogCardDataArr = [ ];
let blogCardSortedArr = [ ];








// Array with the filenames of the individual blogs
let blog_list = [];

for(let i = 0; i < 6; ++i)
{
  let source = `Blog0${i+1}.html`;
  blog_list[i] = source;
}

let doneWithLoadingData = false;







loadDocuments();

let allCategorie = document.getElementById("all-categorie").addEventListener('click', showAll);
let cssCategorie = document.getElementById("css-categorie").addEventListener('click', showCSS);
let htmlCategorie = document.getElementById("html-categorie").addEventListener('click', showHTML);
let javaCategorie = document.getElementById("java-categorie").addEventListener('click', showJAVA);
let javaScriptCategorie = document.getElementById("java-script-categorie").addEventListener('click', showJavaScript);
//let subHeaderText = document.getElementById("subheader-text");



function showAll(){
  readArrayAndCreateHTML(blogCardDataArr);
  console.log("SHOW ALL |-------------------------------------");
  //subHeaderText.innerHTML = "Blog > ALL";
  clearFullBlog();
}

function showCSS(){
  sortBy("../icons/CSS-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");

  //subHeaderText.innerHTML = "Blog > css";
  clearFullBlog();
}

function showHTML(){
  sortBy("../icons/HTML-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");
  //subHeaderText.innerHTML = "Blog > html";
  clearFullBlog();
}

function showJAVA(){
  sortBy("../icons/Java-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");
  //subHeaderText.innerHTML = "Blog > java";
  clearFullBlog();
}

function showJavaScript(){
  sortBy("../icons/JavaScript-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");
  //subHeaderText.innerHTML = "Blog > java";
  clearFullBlog();
}


function sortBy(categorie_name){
  blogCardSortedArr = [ ];
  for(let i = 0; i < blogCardDataArr.length; ++i){
    if(blogCardDataArr[i].icon === categorie_name){
      let object = blogCardDataArr[i];
      blogCardSortedArr.push(object);
    }
  }
}



function clearFullBlog(){
  full_blog_area.innerHTML = '';
}




















function loadDocuments(){

  let doneLoading = 0;

  for(let i = 0; i < blog_list.length; ++i) {
    load(`../blog-posts/${blog_list[i]}`);

    function load(url) {
      var xhr= new XMLHttpRequest();
      xhr.responseType = "document";
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          doneLoading = doneLoading + 1;
          readContentForPreview(xhr.response, url);
          showAll();

        }
      }
      xhr.async = false;
      xhr.open('GET', url, true);
      xhr.send('');
    }
  }
}










function readContentForPreview(callback, filename){
  
  let blog_post = new Document();

  let blog_header = "";
  let blog_preview = "";
  let blog_categorie = "";
  let blog_date = "";
  let blog_icon = "";
  let blog_index = "";
  let blog_pinn = "";

  let blog_site = new Document();




  blog_post = callback; 

  blog_header = blog_post.getElementById("site-header").innerHTML;
  blog_preview = blog_post.getElementById("site-preview").innerHTML;
  blog_categorie = blog_post.getElementById("categorie").innerHTML;
  blog_date = blog_post.getElementById("date").innerHTML;
  blog_site = blog_post.getElementById("blog-site");
  blog_pinn = blog_post.getElementById("pinn").innerHTML;

  let blog_subcategorie_string = blog_post.getElementById("sub-categorie").innerHTML;
  let blog_subcategorie_array =blog_subcategorie_string.split(',');


  /*
  console.log(blog_post.getElementById("site-header").innerHTML);
  console.log(blog_post.getElementById("site-preview").innerHTML);
  console.log(blog_post.getElementById("categorie").innerHTML);
  console.log(blog_post.getElementById("date").innerHTML);
  */
  //console.log(blog_post.children);

  switch(blog_categorie){

    case "java":
      blog_icon = "../icons/Java-icon.svg";
      break;

    case "javascript":
      blog_icon = "../icons/JavaScript-icon.svg";
      break;

    case "html":
      blog_icon = "../icons/HTML-icon.svg";
      break;

    case "css":
      blog_icon = "../icons/CSS-icon.svg";
      break;
    
    default:
        blog_icon = "../icons/default-file-icon.svg";
  }

  let blogCardPreviewData = {
    file_name: filename,
    header: blog_header,
    icon: blog_icon,
    preview: blog_preview,
    date: blog_date,
    path: "#",
    blog: blog_site,
    index: blog_index,
    categorie: blog_categorie,
    sub_categorie: blog_subcategorie_array,
    pinn: blog_pinn
  };

  console.log("-----readContentForPreview-----")
  console.log("PUSH ->")

  blogCardDataArr.push(blogCardPreviewData);

  // add index to object in array
  blogCardDataArr[blogCardDataArr.length - 1].index = blogCardDataArr.indexOf(blogCardPreviewData);


  console.log("INDEX | " + blogCardDataArr.indexOf(blogCardPreviewData));

  console.log("DATA | " + blogCardDataArr);
  console.log("LENGTH | " + blogCardDataArr.length);
  console.log(blogCardDataArr[blogCardDataArr.length - 1].header);
  console.log(blogCardDataArr[blogCardDataArr.length - 1]);
}








function readArrayAndCreateHTML(array){

  
  console.log("-----readArrayAndCreateHTML-----")
  
  console.log("DATA | " + array);
  console.log("LENGTH | " + array.length);

  if(blog_card_section.children != null){
    blog_card_section.innerHTML = '';
  }

  if(pinned_blog_section.children != null){
    pinned_blog_section.innerHTML = '';
  }

  //TEST
  full_blog_area.innerHTML = '';

  for(let y = 0; y < array.length; ++y)
  {
    let card = document.createElement('div');
    let card_header_section = document.createElement('div');
    let card_header = document.createElement('div');
    let card_header_h6 = document.createElement('h6');
    let card_header_icon = document.createElement('img');
    let card_description = document.createElement('div');
    let body_1 = document.createElement('div');
    let date_text = document.createElement('div');
    let more_button = document.createElement('a');
    let card_categories = document.createElement('div');

    let pinn_button = document.createElement('img');
    pinn_button.classList.add("pinn-button");

    if(array[y].pinn == 'true'){
      pinn_button.classList.add("pinn-button-enabled");
    }else{
      pinn_button.classList.add("pinn-button-disabled");
    }


    pinn_button.setAttribute("src", "../icons/pinn-icon.svg");

    
    // sub-categorie

    for( let b = 0; b < array[y].sub_categorie.length; ++b){
      let card_sub_categorie = document.createElement('div');

      card_sub_categorie.className = "card-sub-categorie";

      card_sub_categorie.innerText = array[y].sub_categorie[b];

      card_categories.appendChild(card_sub_categorie);
    }


    



    let card_index = array[y].index;

    card.className = "card";

    card_header.className = "card-header";

    card_header_icon.className = "icon";
    card_description.className = "card-description";

    body_1.className = "body-1";
    body_1.className = "card-description-text";

    date_text.className = "body-1";
    date_text.className = "date-text";

    card_index.className = "date-text";

    more_button.className = "button more-button";

    card_categories.className = "card-categorie";


    
    



    
    card_header_h6.innerText = array[y].header;
    card_header_icon.src = array[y].icon;
    body_1.innerText = array[y].preview;
    date_text.innerText = weeksAgo(array[y].date);
    more_button.innerText = "Erfahre mehr";
    more_button.setAttribute("href", "#");
 

    card_index.innerText = array[y].index;  
    
    more_button.addEventListener("click", function () {moreButtonEvent(card_index)});
    pinn_button.addEventListener("click", function() {togglePinnEvent(card_index)});

    //Pinned sign
    let pinn_sign = document.createElement('div');
    pinn_sign.className = "pinned-sign button";
    pinn_sign.innerText = "Pinned";






    card.append(card_header_section,  card_description);
    
    card_header.append(card_header_icon, card_header_h6);
    card_description.append(card_categories, body_1, date_text, more_button, pinn_button);

    if(array[y].pinn == "true"){

      card_header_section.append(card_header);

      console.log(card);

      pinned_blog_section.appendChild(card);

    } else{
      card_header_section.append(card_header);
      blog_card_section.appendChild(card);
    }
  }
}




function moreButtonEvent(blog_index){
  console.log("FUck FUck " + blog_index);
  let index = blog_index;
  addFullBlogToSite(index);
}

function togglePinnEvent(blog_index){
  console.log("Toggle Pinn " + blog_index);
  console.log(blogCardDataArr[blog_index].file_name);

  let filePath = blogCardDataArr[blog_index].file_name;

  var xhr = new XMLHttpRequest();
  xhr.responseType = "document";

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      
      let file = xhr.response;

      //toggle pinn
      console.log(file.getElementById('pinn').innerHTML);
      if(file.getElementById('pinn').innerHTML == 'true'){
        file.getElementById('pinn').innerHTML = 'false';
      }else{
        file.getElementById('pinn').innerHTML = 'true';
      }
      console.log(file.getElementById('pinn').innerHTML);


      let toggledFile = new XMLHttpRequest();
      toggledFile.open('POST', filePath,  true);
      toggledFile.send(file);
    }
  }

    xhr.open('GET', filePath, true);
    xhr.send('');

  let index = blog_index;

}










function addFullBlogToSite(index)
{
  if(blog_card_section.children != null){
    blog_card_section.innerHTML = '';
  }

  if(full_blog_area.innerHTML != null){
    clearFullBlog();
  }



    full_blog_area.append(blogCardDataArr[index].blog);
    console.log("BLOG |" + blogCardDataArr[index].blog);

    subHeaderText.innerHTML = "Blog" + " > " + blogCardDataArr[index].categorie + " > " + blogCardDataArr[index].header;


}








// Get weeks ago
function weeksAgo (date) {
  let countDate = new Date(`${date} 00:00:00`).getTime();
  let now = new Date().getTime();

  let second = 1000;
  let minute = 60*second;
  let hour = 60*minute;
  let day = 24*hour;
  let week = 7*day;

  let gap = countDate - now;
  return Math.abs(Math.floor(gap/week)) + " weeks ago.";
}









