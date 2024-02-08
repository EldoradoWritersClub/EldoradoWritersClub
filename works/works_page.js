const LAST_WORK_VAR = "last_work_ELDO_HIGH_SCHOOL_WRITERS_CLUB"; //{person: STRING name, index: INT workIndex, page: INT pageNumber}

var doc_CurrentPage = 0, doc_MaxPages = 0;
var scrollValue = 800;

var currentWork, currentWorkIndex, currentWorkPerson;

window.onload = function () {


   LoadPeople()
   const queryString = window.location.search;
   console.log(queryString);
   const urlParams = new URLSearchParams(queryString);

   if(urlParams.has("view"))
   {
      document.getElementById("fullscreen_button").remove();
      HideWorksListing();

      currentWorkIndex = urlParams.get("view")
      const person = atob(urlParams.get("viewp"));
      const page = urlParams.get("page")

      LoadWork(person, currentWorkIndex)
      const el = "<center>" + document.getElementById("page_display").parentElement.innerHTML + "</center>";
      document.body.innerHTML = el;
      document.getElementById("page_display").setAttribute("id", "fullscreen_page");
      if(page != 1)
      {
         NextPage(page - 1);
      }
   }else{
      if(localStorage.getItem(LAST_WORK_VAR))
      {
         const lastWork = JSON.parse(atob(localStorage.getItem(LAST_WORK_VAR)));

         console.log(lastWork)

         HideWorksListing();
         LoadWork(lastWork.person, lastWork.index);

         if(lastWork.page != 1){
            NextPage(lastWork.page - 1);

         }

      }
   }
}

function LoadPeople()
{
   for(var p in People)
   {
      const personButton = document.createElement("button")
      personButton.className = "person_button"
      personButton.setAttribute("person", People[p].replace(/ /g, ""));
      personButton.onclick = function () {LoadWorks(this.getAttribute("person"))}
      personButton.textContent = People[p];
      document.getElementById("people_holder").appendChild(personButton);
   }
}

LoadWorks = (person) => {

   ShowWorksListing()

   Array.from(document.getElementById("people_holder").children).forEach(child => {
      if(child.getAttribute("person") == person)
      {
         child.setAttribute("class", "person_button selected_person_button_menu")
      }else{
         child.setAttribute("class", "person_button")
      }
   })

   document.getElementById("works_list").innerHTML = "";

   var i = 0;
   for(var work in Works)
   {
      if(Works[work].file.includes(person))
      {
         const listingItem = document.createElement('button');
         listingItem.setAttribute("class", "work_list_button");

         listingItem.innerHTML = Works[work].file.replace(person, "").replace(".txt", "");
         listingItem.setAttribute("person", person);
         listingItem.setAttribute("work_id", i);

         listingItem.addEventListener('click', function () {
            LoadWork(this.getAttribute("person"), this.getAttribute("work_id"));
            HideWorksListing();
         })

         document.getElementById("works_list").appendChild(listingItem);
         i++;
      }
   }
}

//Loads a work from a person at the given index.
LoadWork = (person, index) => {

  setTimeout(function () {
   Array.from(document.getElementById("people_holder").children).forEach(child => {
      if(child.getAttribute("person") == currentWorkPerson)
      {
         child.setAttribute("class", "person_button selected_person_button")
      }else{
         child.setAttribute("class", "person_button")
      }
   })
  }, 500)

   document.getElementById('page_scroll_holder').scrollTop = 0;

   var i = 0;
   for(var work in Works)
	{
      if(Works[work].file.includes(person)){
         if(i == index)
         {
            document.getElementById('page_display_content').setAttribute("src", "./works/" + Works[work].text);
            //Update page displays
            doc_CurrentPage = 1;
            doc_MaxPages = Works[work].page_count;

            if(Works[work].scroll_value != undefined)
            {
               scrollValue = Works[work].scroll_value;
            }else{
               scrollValue = 800;
            }

            if(doc_MaxPages == 1)
            {
               document.getElementById("page_button_next").hidden = true;
               document.getElementById("page_button_prev").hidden = true;
            }else{
               document.getElementById("page_button_next").hidden = false;
               document.getElementById("page_button_prev").hidden = false;
            }

            //Update current work.
            currentWorkIndex = i;
            currentWork = Works[work];
            currentWorkPerson = person;

            UpdatePageNumber();

            return;    
         }
         i++;
      }
   }
}

//Go to next page.
NextPage = (pgCount) => {

   //On last page.
   if(doc_CurrentPage == doc_MaxPages){return;}

   //Animation stuff
   const pg = document.getElementById('page_display_content');
   pg.setAttribute("class", "anim_page_next_out");
   const pg_fade = document.getElementsByClassName("page_fade_div")[0];
   pg_fade.className = "fade_div_out";
   setTimeout(function () {
      //Update half way through animation.
      pg_fade.className = "fade_div_in";
      document.getElementById('page_scroll_holder').scrollTop += scrollValue * (pgCount ? pgCount : 1);
      doc_CurrentPage += pgCount != undefined ? pgCount : 1; //Uodate current page.
      pg.setAttribute("class", "anim_page_next_in");
      UpdatePageNumber();
   }, 375)

   setTimeout(function () {
      //End of animation.
      pg_fade.className = "page_fade_div";
      document.getElementById('page_display_content').setAttribute("class", "");

   }, 800)

}

//Go to previous page.
PreviousPage = () => {

   //On first page.
   if(doc_CurrentPage == 1){return;}

const pg = document.getElementById('page_display_content');
pg.setAttribute("class", "anim_page_next_out_rev");
const pg_fade = document.getElementsByClassName("page_fade_div")[0];
pg_fade.className = "fade_div_out";
setTimeout(function () {
   pg_fade.className = "fade_div_in";
   document.getElementById('page_scroll_holder').scrollTop -= scrollValue;
   doc_CurrentPage--; //Uodate current page.
   pg.setAttribute("class", "anim_page_next_in_rev");
   UpdatePageNumber();
}, 375)

setTimeout(function () {
   pg_fade.className = "page_fade_div";
   document.getElementById('page_display_content').setAttribute("class", "");

}, 800)

}

//Update the page number displayed.
function UpdatePageNumber()
{
   localStorage.setItem(LAST_WORK_VAR, btoa(JSON.stringify({person: currentWorkPerson, index: currentWorkIndex, page: doc_CurrentPage })))

   document.getElementById("page_number").textContent = doc_CurrentPage + " / " + doc_MaxPages;
}

function Fullscreen()
{
   window.open(window.location.pathname + "?view=" + currentWorkIndex + "&viewp=" + btoa(currentWorkPerson) + "&page=" + doc_CurrentPage, '_self')
}

function HideWorksListing()
{
   const wl = document.getElementById("works_list");

   if(wl)
   {
      wl.id = "fade_works_list"
     wl.innerHTML = ""
   }

   if(document.getElementById("page_display_hidden"))
   {
      document.getElementById("page_display_hidden").id = "page_display";
   }

   if(document.getElementById("page_hider"))
   {
      document.getElementById("page_hider").id = "page_hider_vanish";
   }
}

function ShowWorksListing()
{

   if(document.getElementById("fade_works_list"))
   {
      const wl = document.getElementById("fade_works_list");
      wl.id = "works_list"
   }

   if(document.getElementById("page_display"))
   {
      document.getElementById("page_display").id = "page_display_hidden";
   }

   setTimeout(function () {

      if(document.getElementById("page_hider_vanish"))
      {
         document.getElementById("page_hider_vanish").id = "page_hider";
      }
   }, 700)
}