const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

const check ='fa-check-circle';
const uncheck ='fa-circle-thin';
const line_through='lineThrough';

let List ,id;

//add and get localstorage

let data = localStorage.getItem("todo");
if(data){
List=JSON.parse(data);
id=List.length;
loadList(List);
}else{
List=[];
id=0;
}

function loadList(array){
    array.forEach(function(element)
    {
        addToDo(element.name, element.id, element.done, element.trash);
        
    });
}
clear.addEventListener("click",function(){
localStorage.clear();
location.reload();
});

const options = {weekday :"long" , month:"short" , day:"numeric" };
const today = new Date();
dateElement.innerHTML =today.toLocaleDateString("en-us",options);
//add to do
function addToDo(toDo,id,done,trash){
    if(trash)
    {return;}
    const Done = done ? check: uncheck;
    const line =  done ? line_through : "";
    const item =`<li class="item">
        <i class="fa ${Done} co" job="complete" id="${id}"></i>
       <p class="text ${line}"  > ${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
      </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position,item);
}

document.addEventListener("keypress",function(event){
    if(event.key ==="Enter"){
        const toDo =input.value;
       
        if(toDo){
            addToDo(toDo); 
            List.push({
                name : toDo,
                id:id,
                done:false,
                trash:false

            });
            localStorage.setItem("todo",JSON.stringify(List));
            id++;
        }
        input.value="";

    }
});
function completetodo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    List[element.id].done = List[element.id].done ? false :true;
}

function removetodo(element){
   
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;
    
}
list.addEventListener("click",function(event)
{
const element = event.target;
const elementjob = element.attributes.job.value;
  if(elementjob == "complete")
  {
    completetodo(element);
    
  }
   else if(elementjob == "delete")
  {
    removetodo(element);
  
  }
  localStorage.setItem("todo",JSON.stringify(List));
});


