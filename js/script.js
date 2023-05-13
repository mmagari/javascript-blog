'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-articleTag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloudLink').innerHTML)
};


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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
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
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    /* generate HTML of the link */
      const linkHTMLData = {id:tag, title: tag};
      const linkHTML = templates.articleTag(linkHTMLData);
      /* add generated code to html variable*/
      tagsWrapperList.insertAdjacentHTML('beforeend', ' ' + linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
  /* END LOOP: for every article */
  }
  /* [NEW] find list of tags in right column */
  const tagsParms = calculateTagParms(allTags);
  const tagList = document.querySelector(optTagsListSelector);
  /* create variable for all links HTML code */
  const allTagsData = {tags: []};
  /* START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /*generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag],tagsParms)
    });
    /*END LOOP: for each tag in allTags: */
  }
  /* add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
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
    /* get tags from data-author attribute */
    const authorName = article.getAttribute('data-author');
    /* add generated code to html variable*/
    const authorFullName = authorName.replace('-', ' ');
    const linkHTMLData = {id: authorName, title: authorFullName};
    const linkHTML = templates.articleAuthor(linkHTMLData);
    /* insert HTML for author name into paragraph */
    authorList.insertAdjacentHTML('beforeend', linkHTML);
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
  const allAuthorCloudList = {authors: []};
  /* START LOOP: for each author in allAuthors */
  for(let author in allAuthors){
    /* generate code od a link and add it to allAuthorsSideList */
    allAuthorCloudList.authors.push({
      author: author,
      count: allAuthors[author]
    });
  /* END LOOP: for each authors */
  }
  /* add html from authorSideList to authorList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorCloudList);
  console.log(allAuthorCloudList);
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
