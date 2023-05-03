'use strict';
function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);

/*remove class 'active' from all article links*/
const activeLinks = document.querySelectorAll('.titles a.active');
for (let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

/*add class 'active' to the clicked link*/
event.preventDefault();
const clickedElement = this;
console.log('clickedElement:', clickedElement);
clickedElement.classList.add('active');

/*remove class 'active' fromm all articles*/
const activeArticles = document.querySelectorAll('.posts article.active');
for (let activeArticle of activeArticles){
  $(activeArticle).fadeOut(1000);
  activeArticle.classList.remove('active');
}

/*get 'href' attribute from the clicked link*/
const articleSelector = clickedElement.getAttribute('href');
console.log('My link:', articleSelector);

/*find the correct article using the selector (value of 'href' attribute)*/
const targetArticle = document.querySelector(articleSelector);
console.log('My article:', targetArticle);

/*add class 'active' to the correct article*/
$(targetArticle).fadeIn(2000);
targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
console.log('Links to deleted:', optTitleListSelector);
/*remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector);
while (titleList.firstChild) {
  titleList.removeChild(titleList.firstChild);
}
/* for each article*/
const articles = document.querySelectorAll(optArticleSelector);
console.log('Articles:', articles);

for (let article of articles){
/* get the article id*/
const articleId = article.getAttribute('id');
console.log('Article title:', articleId);

/* find the title element */
const articleTitle = article.querySelector(optTitleSelector).innerHTML;
/* create HTML of the link */
const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
console.log('Correct link:', linkHTML);
/* insert link into titleList */
titleList.insertAdjacentHTML('beforeend', linkHTML);
}
const links = document.querySelectorAll('.titles a');
console.log('What is in the link: ', links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();