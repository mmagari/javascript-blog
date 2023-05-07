/* global $ */
'use strict';

function titleClickHandler(event){

  /*remove class 'active' from all article links*/
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*add class 'active' to the clicked link*/
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');

  /*remove class 'active' fromm all articles*/
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles){
    $(activeArticle).fadeOut(1000);
    activeArticle.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link*/
  const articleSelector = clickedElement.getAttribute('href');

  /*find the correct article using the selector (value of 'href' attribute)*/
  const targetArticle = document.querySelector(articleSelector);

  /*add class 'active' to the correct article*/
  $(targetArticle).fadeIn(2000);
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  /*remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  while (titleList.firstChild) {
    titleList.removeChild(titleList.firstChild);
  }
  /* for each article*/
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Custom selector: ', articles);
  for (let article of articles){
  /* get the article id*/
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
   
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('Articles function tags:', articles);
  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapperList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let tagsHTML = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    /* generate HTML of the link */
      console.log('One tag:', tag);
      tagsHTML = '<li><a href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';
      console.log('Link tag:', tagsHTML);
      /* add generated code to html variable*/
      tagsWrapperList.insertAdjacentHTML('beforeend', ' ' + tagsHTML);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article */
  }
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Link: ', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Tag: ', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Active tags: ', activeTags);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href +'"');
  /* START LOOP: for each found tag link */
  tagLinks.forEach( tagLink => {
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  });
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post a[href^="#"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all post authors */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every author: */
  for (let article of articles){
    /* find tags authors */
    const authorList = article.querySelector(optArticleAuthorSelector); 
    /* make html variable with empty string */
    let author = '';
    /* get tags from data-author attribute */
    const authorName = article.getAttribute('data-author');
    console.log('author name: ', authorName);
    /* add generated code to html variable*/
    author = '<p><a href="#">'+ 'by ' + authorName + '</a></p>';
    console.log('Author p:', author);
    /* insert HTML for author name into paragraph */
    authorList.insertAdjacentHTML('beforeend', author);
  /* END LOOP: for every article */
  }
}
generateAuthors();
