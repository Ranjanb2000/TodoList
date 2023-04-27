var input=document.querySelector('#inp');
var add=document.querySelector('#add');
var list=document.querySelector('#list');
var count=document.querySelector('#count');
var button=document.querySelector('.custom')
var tasks=[];
function handpress(e)
{

    let target=e.target;
    //target variable holds the element,class and id wherever the mouse is clicked

    if(target.className=='delete')
    {
        //click on the delete icon then it's classname should match with string delete
        //then that particular id is send to the deletetask function as a parameter to delete
        //that particular id.
        let tid=target.id;
        deleteTask(tid);
        return;
    }
    if(target.className=='custom')
    {
        //user clicks on the checkbox then its classname is custom so it matches with
        //custom then that element id is taken and send as a parameter to toggletask function
        let tid=target.id;
        toggleTask(tid);
        return;

    }
    if(target.className=='clear')
    {
        
        tasks=[];
        renderList();
        //returns the empty list. 
        //it will delete all the tasks.
    }
    if(target.id=='tick')
    {
        for(var i=0;i<tasks.length;i++)
        {
            tasks[i].done=true;
        }
        renderList();
        return;
        //returns all the tasks completed or done
        //In tasks object done variable is set to true.
    }
    if(target.id=='uncomplete')
    {
        console.log("jg")
        let newTasks=tasks.filter(function(task){
            return task.done==false;
        })
        tasks=newTasks;
        renderList();
        return;
        //returns only  the  undo tasks.
    }
    if(target.id=='all')
    {
        renderList();
        return;
        //return all the tasks in the list
    }
    if(target.id=='uncomp')
    {
        let newTasks=tasks.filter(function(task){
            return task.done==false;
        })
        renderingList(newTasks);
        return;
        //returns the duplicate of undo taks
    }
    if(target.id=='complete')
    {
        let newTasks=tasks.filter(function(task){
            return task.done==true;
        })
        renderingList(newTasks);
        //returns the duplicate of completed tasks
    }
}
//add the particular list to the html or webpage.
function addDom(cur)
{
    
    let li=document.createElement('li');//it wiil create new element in html "li"
    if(cur.done)
    {
        //below code used to add html to the webpage using innerHTML keyword
        li.innerHTML +=` 
        <li> 
            <input type="radio" id="${cur.id}" ${cur.done ? 'checked':''} class="custom">
            <label><s>${cur.text}</s></label>
            <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" class="delete" id="${cur.id}">
        </li>
        `;
    }
    else
    {
    li.innerHTML +=`
    <li> 
        <input type="radio" id="${cur.id}" ${cur.done ? 'checked':''} class="custom">
        <label>${cur.text}</label>
        <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" class="delete" id="${cur.id}">
    </li>
    `;
    }
    list.append(li);// this will add the list to the webpage one after the other.
    
}
//renderlist fun is used to update the list whenever the change occurs
function renderList()
{
    list.innerHTML='';
    for(var i=0;i<tasks.length;i++)
    {
        addDom(tasks[i]);//add the particular list to the html or webpage.
    }
    count.innerHTML=tasks.length+'';//update the list count in the webpage
}
function renderingList(curtask)
{
    list.innerHTML='';
    for(var i=0;i<curtask.length;i++)
    {
        addDom(curtask[i]);//add the particular list to the html or webpage.
    }
    count.innerHTML=curtask.length;//update the list count in the webpage
    return;
}
function toggleTask(tid)
{
    let newTask=tasks.filter(function(task){
        return task.id==tid;
    })//this function stores the array object where the parameter id should match with object id.
    //if any is present
    if(newTask.length>0)
    {
        let ntask=newTask[0];
        ntask.done=!ntask.done;
        renderList();//this will update the list
        return
    }
    alert("task cannot be completed");
    return;
}
function deleteTask(tid)
{
    let newTasks=tasks.filter(function(task){
        return task.id!==tid;
    })//this function stores the array object where the parameter id should not  match with object id.
      // it means it wiil not include whenever there is a match with id.
      // in turn it will delete the object with that particular id.
    tasks=newTasks;
    renderList();
}
//add new task to the list.
function addTask(task)
{
    if(task)
    {
        tasks.push(task);//inbuilt fun used to insert the new list.
        
        renderList();
        return;
    }
    alert("task cannot be added");
}
//when the add button clicked
function handlepress()
{
    const text=input.value;//this will fetch the text in the textbox what ever is typed by user
                           //and stored as string
    if(!text)
    {
        alert("Task text cannot be empty");
        return;
    }
    //textbox is not empty
    //new object is created with some keys and values.
    const task={
        text,
        id:Date.now().toString(),
        done:false
    }
    input.value="";//update the text box to empty.
    addTask(task);//add the task to the list
}
function startApp()
{
    add.addEventListener('click',handlepress);//clicked on the add button handlepress fun is called.
    document.addEventListener('click',handpress);//clicked on the screen handpress fun is called.
}
startApp();