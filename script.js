




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
      console.log("SCAN DIR | " + xhr.response);
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
let subHeaderText = document.getElementById("subheader-text");



function showAll(){
  readArrayAndCreateHTML(blogCardDataArr);
  console.log("SHOW ALL |-------------------------------------");
  subHeaderText.innerHTML = "Blog > ALL";
  clearFullBlog();
}

function showCSS(){
  sortBy("icons/css-file-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");

  subHeaderText.innerHTML = "Blog > css";
  clearFullBlog();
}

function showHTML(){
  sortBy("icons/html-file-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");
  subHeaderText.innerHTML = "Blog > html";
  clearFullBlog();
}

function showJAVA(){
  sortBy("icons/java-file-icon.svg");
  readArrayAndCreateHTML(blogCardSortedArr);
  console.log("SHOW ALL |-------------------------------------");
  subHeaderText.innerHTML = "Blog > java";
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


function refreshSubheader(extension){
  subHeaderText.innerHTML = subHeaderText.innerHTML + extension;
}


function clearFullBlog(){
  full_blog_area.innerHTML = '';
}




















function loadDocuments(){
  for(let i = 0; i < blog_list.length; ++i) {
    load(`blog-posts/${blog_list[i]}`);

    function load(url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "document";
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          readContentForPreview(xhr.response);
        }
      }
      xhr.open('GET', url, true);
      xhr.send('');
    }
  }
}









function readContentForPreview(callback){
  
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

  /*
  console.log(blog_post.getElementById("site-header").innerHTML);
  console.log(blog_post.getElementById("site-preview").innerHTML);
  console.log(blog_post.getElementById("categorie").innerHTML);
  console.log(blog_post.getElementById("date").innerHTML);
  */
  //console.log(blog_post.children);

  switch(blog_categorie){

    case "java":
      blog_icon = "icons/java-file-icon.svg";
      break;

    case "javascript":
      blog_icon = "icons/javascript-file-icon.svg";
      break;

    case "html":
      blog_icon = "icons/html-file-icon.svg";
      break;

    case "css":
      blog_icon = "icons/css-file-icon.svg";
      break;
    
    default:
        blog_icon = "icons/default-file-icon.svg";
  }

  let blogCardPreviewData = {
    header: blog_header,
    icon: blog_icon,
    preview: blog_preview,
    date: blog_date,
    path: "#",
    blog: blog_site,
    index: blog_index,
    categorie: blog_categorie,
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
    



    
    card_header_h6.innerText = array[y].header;
    card_header_icon.src = array[y].icon;
    body_1.innerText = array[y].preview;
    date_text.innerText = weeksAgo(array[y].date);
    more_button.innerText = "Erfahre mehr";
    more_button.setAttribute("href", "#");

    card_index.innerText = array[y].index;  
    
    more_button.addEventListener("click", function () {moreButtonEvent(card_index)});
    

//Pinned sign
    let pinn_sign = document.createElement('div');
    pinn_sign.className = "pinned-sign button";
    pinn_sign.innerText = "Pinned";






    card.append(card_header_section,  card_description);
    
    card_header.append(card_header_h6, card_header_icon);
    card_description.append(body_1, date_text, more_button);

    if(array[y].pinn == "true"){

      card_header_section.append( pinn_sign, card_header);

      
      let card1 = card.cloneNode(true);
      console.log(card);
      console.log(card1);

      pinned_blog_section.appendChild(card);
      blog_card_section.appendChild(card1);


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

