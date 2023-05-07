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
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
  /*remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  while (titleList.firstChild) {
    titleList.removeChild(titleList.firstChild);
  }
  /* for each article*/
  const articles = document.querySelectorAll(optArticleSelector);

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