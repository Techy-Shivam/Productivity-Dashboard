function openFeatures() {
    var allElems = document.querySelectorAll(".elem");
    var allfullElems = document.querySelectorAll(".fullElem");
    var backBtn = document.querySelectorAll(".back");
    // console.log(allfullElems[0]);

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allfullElems[elem.id].style.display = 'block'
        })
        backBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                allfullElems[btn.id].style.display = 'none'
            })
        })
    })
}
openFeatures();

function ToDoList(){
    //locaalStorage--->
    
    //For rendering the task-lists
    var currentTask=[]
    
    if(localStorage.getItem('currentTask')){
        currentTask=JSON.parse(localStorage.getItem('currentTask'))
    }
    function renderTask(){
    
        var allTask = document.querySelector(".allTask");
        
        if(currentTask.length===0){
            allTask.innerHTML=`<p style="text-align:center; margin-top:150px; margin-left:120px">Task list is empty</p>`;
            return;
        }
        var sum = '';
        currentTask.forEach(function (allElems,index) {
            
            sum = sum + `<div class="task">
            <h5>${allElems.task} <span class=${allElems.imp}>Important</span></h5>
            <details>
            <summary style="color:black ">Details</summary>
            <p style="color:black; font-size:16px">${allElems.description}</p>
            </details>
            <button data-index="${index}">Mark as Completed</button>
            </div>`
        })
        allTask.innerHTML=sum
        localStorage.setItem('currentTask',JSON.stringify(currentTask))
        
        //To delete a task
        document.querySelectorAll(".task button").forEach(function(btn){
            btn.addEventListener('click',function(){
            const index = parseInt(btn.getAttribute("data-index"));
            currentTask.splice(index, 1);
            localStorage.setItem('currentTask', JSON.stringify(currentTask)); // <-- update localStorage
            renderTask(); //after deletion
            })
        })        
    }
    renderTask();//	Show tasks on page load
    //Adding form details which are pushed in rendering details....
    
    var form = document.querySelector(".addTask form");
    var taskInput = document.querySelector(".addTask form #task-inp");
    var taskDetails = document.querySelector(".addTask form textarea");
    var check = document.querySelector(".addTask form #checkbox")
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentTask.push({
             task:taskInput.value,
            description:taskDetails.value,
            imp:check.checked
        })
        renderTask(); //show newly added list
        taskInput.value=""
        taskDetails.value="" 
        check.checked=false
        // form.reset();
    
    })
}

ToDoList();

//Logic for Daily-planner-->

function dailyPlanner(){

var dailyPlan=document.querySelector(".daily-planner")

var dailyData= JSON.parse(localStorage.getItem('dailyData')) || {}

var hours=Array.from({length:18},(_,index)=>`${6+index}:00 - ${7+index}:00`)



var wholeDaySum='';

hours.forEach(function(elem,id){

    var saveData=(dailyData[id]  || '');
    
    wholeDaySum=wholeDaySum + `<div class="daily-planner-time">
    <p>${elem}</p>
    <input id=${id} type="text" placeholder="Enter your Plan" value="${saveData}">
    </div>`
})

dailyPlan.innerHTML=wholeDaySum;

var dailyPlanInp=document.querySelectorAll(".daily-planner input");

dailyPlanInp.forEach(function(elem){
    elem.addEventListener('input',function(){
        dailyData[elem.id]=elem.value
        console.log(dailyData);  
        localStorage.setItem("dailyData",JSON.stringify(dailyData))
    })
})
}

dailyPlanner();

//logic for motivational quotes-->

function moivationalQuotes(){
    
    //date And Day logic-->
    
    //Api Logic
    var quote=document.querySelector(".motivation-2 p")
    var author=document.querySelector(".motivation-3 h1")
    
    async function fetchQuotes(){
      
        try {
            let response=await fetch('https://api.realinspire.live/v1/quotes/random')
        let data=await response.json()
        
        quote.innerHTML=data[0].content
        author.innerHTML=`-${data[0].author}`
        } catch (error) {
            console.log(error);
            
        }
    }
    
    function updateDate(){
        let dayNames=["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" ,"Sunday"] //Array of day
    let now=new Date(); //date function
    
    let day=dayNames[now.getDay()]; //the getDay() fetch the index of array dayNames using now=new Date()
    let date=now.toLocaleDateString('en-IN',{ //This converts the current date into a readable string format.
        day:'numeric',
        month:'long',
        year:'numeric'
        })
    document.getElementById("day").textContent=day
    document.getElementById("date").textContent=date
}

fetchQuotes()
updateDate()
}

moivationalQuotes()

 //Logic for Pomodoro Timer-->

function pomodoroTimer(){
    
let totalSeconds=25*60;
let timer=document.querySelector(".pomo-timer h1")
let startBtn=document.querySelector(".pomo-timer .start")
let pausetBtn=document.querySelector(".pomo-timer .pause")
let resetBtn=document.querySelector(".pomo-timer .reset")
let session=document.querySelector(".pomodoro-fullpage .session")
let timeInterval = null;
var isWorkSession=true

function updateTime(){
    let minutes=Math.floor(totalSeconds/60);
    let seconds=totalSeconds%60;
    timer.innerHTML=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
}
updateTime()

function startTimer(){
    
    clearInterval(timeInterval)
    if(isWorkSession){
        timeInterval=setInterval(function(){
            if(totalSeconds>0){
                totalSeconds--
            updateTime()
    }
    else{
        isWorkSession=false
        clearInterval(timeInterval)
        timer.innerHTML="05:00"
        session.innerHTML="Take Break"
        session.style.backgroundColor="rgb(8, 120, 180)"
        totalSeconds=5*60
    }
},1000)
}
else{ //code for break session--->
    timeInterval=setInterval(function(){
        if(totalSeconds>0){
            totalSeconds--
            updateTime()
        }
        else{
            isWorkSession=true
            clearInterval(timeInterval)
            timer.innerHTML="25:00"
            session.innerHTML="Work Session"
            session.style.backgroundColor="rgb(9, 138, 89)"
            totalSeconds=25*60
    }
    },1000)
}
}
    
function pauseTimer(){
    clearInterval(timeInterval)
}


function resetTImer(){
    clearInterval(timeInterval)
    totalSeconds=25*60
    updateTime()
}

startBtn.addEventListener('click',startTimer)
pausetBtn.addEventListener('click',pauseTimer)
resetBtn.addEventListener('click',resetTImer)

}

pomodoroTimer()

//Logic for Daily Goals--->

function dailyGoalList(){
    function dailyGoals(){
    let currentGoal=[];

if(localStorage.getItem('currentGoal')){
    currentGoal=JSON.parse(localStorage.getItem('currentGoal'));
}

function renderGoal(){
    var allGoals=document.querySelector(".allGoals")
    if(currentGoal.length===0){
        allGoals.innerHTML=`<p style="text-align:center; margin-top:150px; margin-left:120px">Goal list is empty</p>`
        return;
    }
    var sum=''
    currentGoal.forEach(function(allG,idx){
    sum=sum+`<div class="goal">
                    <h5>${allG.goal} 
                        <span class="${allG.important}">Important</span>
                    </h5>
                    <details>
                        <summary style="color:black">Details</summary>
                        <p style="color:black; font-size:16px">
                        ${allG.process}
                        </p>
                    </details>
                    <button data-index="${idx}">Mark as Completed</button>
                </div>`
    
            })
            allGoals.innerHTML=sum

localStorage.setItem('currentGoal',JSON.stringify(currentGoal));
document.querySelectorAll(".goal button").forEach(function(btn){
    btn.addEventListener('click', function(){
        const index = parseInt(btn.getAttribute("data-index"));
        currentGoal.splice(index, 1);
        localStorage.setItem('currentGoal', JSON.stringify(currentGoal)); // <-- update localStorage
        renderGoal();
    });
});

}
renderGoal();
let form=document.querySelector(".add-goals form")
let goalInput=document.querySelector(".add-goals form #goal-inp")
let goalDetails=document.querySelector(".add-goals form textarea")
let ImpCheck=document.querySelector(".add-goals form #checkbox")

form.addEventListener('submit',function(e){
    e.preventDefault()
    currentGoal.push({
        goal:goalInput.value,
        process:goalDetails.value,
        important:ImpCheck.checked,
    })
    renderGoal();
    form.reset();
})
}
dailyGoals()
}
dailyGoalList()

//Weather and date api logic--->

function forcast(){


    let currentDay=document.querySelector(".header-1 h1");
    let now=null
    let currentDate=document.querySelector(".header-1 h3");
    let currentCity=document.querySelector(".header-1 h4");
    let temp=document.querySelector(".header-2 h1")
    let condition=document.querySelector(".header-2 h2")
    let precep=document.querySelector(".header-2 h3")
    let humid=document.querySelector(".header-2 h5")
    let wind=document.querySelector(".header-2 h4")
    
    let apiKey="12748c89aa3d4afd977154645252806"
    let city='Lucknow'
    
    
    var data=null
    async function weatherCallApi() {
        let response=await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        let data=await response.json()
        console.log(data); 
        currentCity.innerHTML=`${data.location.name}`
        temp.innerHTML=`${data.current.temp_c}°C`
        condition.innerHTML=data.current.condition.text
        precep.innerHTML=`Precipitation : ${data.current.precip_in}`
        humid.innerHTML=`Humidity : ${data.current.humidity}`
        wind.innerHTML=`Wind : ${data.current.wind_kph}`
    }
    weatherCallApi()
    
    function timeDate(){
        
        let dayNames=["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" ,"Sunday"]    
        let monthNames=["January" , "Ferbuary" , "March" , "April" , "May" , "June" , "July" ,"August" , "September" , "October" , "November" , "December"]    
        now=new Date()
        let hours=now.getHours()
        let minutes=now.getMinutes()
        let seconds=now.getSeconds()
        let ampm = hours >= 12 ? "PM" : "AM";
        hours=hours%12 || 12
        let day=dayNames[now.getDay()]
        let month=monthNames[now.getMonth()]
        currentDay.innerHTML=`${day} ${String(hours).padStart("2",0 )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart("2",0 )} ${ampm}`
        currentDate.innerHTML=`${String(now.getDate()).padStart(2,"0")} ${month} ${now.getFullYear()}`

        let header=document.querySelector(".allElems header")
        // header.style.backgroundImage="url(https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg)";
        if(ampm==='AM'){
            if(hours >= 5 && hours < 12){
                header.style.backgroundImage="url(https://images.pexels.com/photos/3546778/pexels-photo-3546778.jpeg)";
            }
            else{
                header.style.backgroundImage="url(https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg)";
            }
        }
        else{
            if(hours >=1 && hours<6){
                header.style.backgroundImage="url(https://images.pexels.com/photos/164175/pexels-photo-164175.jpeg)";
            }
            else{
                header.style.backgroundImage="url(https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg)";
            }
        }
    header.style.objectFit="cover"
    header.style.backgroundSize = "cover";
    header.style.backgroundPosition = "center";
    }
    
    setInterval(()=>{
        timeDate()
    },1000)
    
    timeDate()
}
forcast()