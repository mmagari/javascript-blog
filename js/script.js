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
    activeArticle.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link*/
  const articleSelector = clickedElement.getAttribute('href');

  /*find the correct article using the selector (value of 'href' attribute)*/
  const targetArticle = document.querySelector(articleSelector);

  /*add class 'active' to the correct article*/
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.sidebar .tags',
  optCloudClassCount ='5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector ='.sidebar .authors';

function generateTitleLinks(customSelector = ''){
  /*remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  while (titleList.firstChild) {
    titleList.removeChild(titleList.firstChild);
  }
  /* for each article*/
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function calculateTagParms(tags){
  const values = Object.values(tags);
  const smallestNumber = Math.min(...values);
  const biggestNumber = Math.max(...values);
  return {smallestNumber, biggestNumber};
}

function calculateTagClass(count,params){
  const normalizedCount = count - Math.min(...Object.values(params));
  const normalizedMax = Math.max(...Object.values(params)) - Math.min(...Object.values(params));
  const percentage = (normalizedCount / normalizedMax);
  const classNumber = Math.floor( percentage * (optCloudClassCount -1) + 1);
  const result = optCloudClassPrefix + classNumber;
  return result;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const tagsWrapperList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let tagsHTML;
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    /* generate HTML of the link */
      tagsHTML = '<li><a href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';
      /* add generated code to html variable*/
      tagsWrapperList.insertAdjacentHTML('beforeend', ' ' + tagsHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article */
  }
  /* [NEW] find list of tags in right column */
  const tagsParms = calculateTagParms(allTags);
  const tagList = document.querySelector(optTagsListSelector);
  /* create variable for all links HTML code */
  let allTagsHTML = '';
  /* START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*generate code of a link and add it to allTagsHTML */
    const tagClass = calculateTagClass(allTags[tag],tagsParms);
    allTagsHTML += '<li><a href="#" class="' + tagClass + '">' +tag + '</a></li>';
  /*END LOOP: for each tag in allTags: */
  }
  /* add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
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
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
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
    /* add generated code to html variable*/
    const authorFullName = authorName.replace('-', ' ');
    author = '<a href="#' + authorName +'">' + 'by ' + authorFullName + '</a>';
    /* insert HTML for author name into paragraph */
    authorList.insertAdjacentHTML('beforeend', author);
    /*check if this author is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(authorName)){
      /*add generated name to allAuthors object */
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  /* END LOOP: for every article */
  }
  /*find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  /* create variable for all authors links HTML code */
  let allAuthorSideList = '';
  /* START LOOP: for each author in allAuthors */
  for(let author in allAuthors){
    /* generate code od a link and add it to allAuthorsSideList */
    allAuthorSideList += '<li><a href="#"><span class="author-name">'+ author + '</a> (' + allAuthors[author] + ')</span></li>';
  /* END LOOP: for each authors */
  }
  /* add html from authorSideList to authorList */
  authorList.innerHTML = allAuthorSideList;
}

generateAuthors();

function authorClickHandler(event){
  
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  let href = clickedElement.getAttribute('href');
  /* find all tag authors with class active */
  const activeAuthorTags = document.querySelectorAll('a.active[href^="#"]');
  /* START LOOP: for each active tag author */
  for (let activeAuthorTag of activeAuthorTags){
    /* remove class active */
    activeAuthorTag.classList.remove('active');
  /* END LOOP: for each active tag author */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagAuthorLinks = document.querySelectorAll('a[href="' + href +'');
  /* START LOOP: for each found tag author */
  tagAuthorLinks.forEach( tagAuthorLink => {
    /* add class active */
    tagAuthorLink.classList.add('active');
  /* END LOOP: for each found tag author */
  });
  /* execute function "generateTitleLinks" with author selector as argument */
  href = href.replace('#','');
  generateTitleLinks('[data-author="' + href + '"]'); 
}

function addClickListenersToAuthors(){
  /* find all authors in the posts */
  const authors = document.querySelectorAll('.post-author a[href^="#"]'); 
  /* START LOOP: for each author */
  for(let author of authors){
    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
