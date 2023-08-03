
// const time=document.getElementById('time')  最原始的方法
// const time1=document.querySelector('#time')  和下面的get function 方法等价
let currentTime=new Date()
render(currentTime)
get('#prevMonth').onclick= () =>{
  const firstDay=new Date(currentTime.getFullYear(),currentTime.getMonth(),1)
 render(new Date(firstDay-86400*1000))
}
get('#nextMonth').onclick= () =>{
  render(new Date(currentTime.getFullYear(),currentTime.getMonth()+1,1))
}
get('#today').onclick= () =>{
  render(new Date())
}

function render(time){
const year=time.getFullYear()
const month=time.getMonth()+1
currentTime=time
console.log('11111')
console.log(currentTime)
 initTime()
  generateDays()
  function initTime(){
    const time=get('#time')
    console.log('哪年'+year)
    console.log('哪月'+month)
    time.textContent=`${year}年${month}月`
  }
  function generateDays(){
    const now=new Date()
    const firstDay=new Date(year,month-1,1)
    console.log('月初'+firstDay)
    weekDayOfFirstDay=firstDay.getDay()
    console.log('月初是周'+weekDayOfFirstDay)
    const lastDay=new Date(new Date(year,month-1+1,1)-86400*1000)
    const weekDayOfLastDay=lastDay.getDay()
    console.log('月末是周'+weekDayOfLastDay)
    const numberOfMonth=lastDay.getDate()
    console.log('这个月有多少天'+numberOfMonth)
    const days=get('#days')
    days.innerHTML="";
    fragment=document.createDocumentFragment()
    let selectedLi
    let n=0

    for(let i=1;i< weekDayOfFirstDay;i++){
      const li=document.createElement('li')
      const d=new Date(firstDay-86400*1000*i)
      li.textContent=d.getDate()
      fragment.prepend(li)
      n+=1;
      li.classList.add("calendar-days-disabled")
      li.onclick = ()=>{
        if(selectedLi){
          selectedLi.classList.remove("calendar-days-selected")
        }
        li.classList.add("calendar-days-selected")
        selectedLi=li
    }
  
  }
    for(let i=1;i<=numberOfMonth;i++){
      const li=document.createElement('li')
      if(i===now.getDate()&&month===now.getMonth()+1 &&year===now.getFullYear()){
      li.classList.add("calendar-days-today")
    }
    li.onclick = ()=>{
      if(selectedLi){
        selectedLi.classList.remove("calendar-days-selected")
      }
      li.classList.add("calendar-days-selected")
      selectedLi=li
      if(events){
        const fragment=document.createDocumentFragment()
        events.map(event=>{
          const div=document.createElement('div')
          div.classList.add('events-item')
          div.textContent=event
          fragment.append(div)
        
        })
       
         get('#events').innerHTML=''
         get('#events').append(fragment)
        
      }else{
        get('#events').innerHTML='无'
      }
    }
      li.textContent=i
     fragment.append(li)
     n+=1;
     const key=`${year}-${month}-${i}`
     const events=window.data[key]
     console.log(events)
     if(events){
      li.classList.add("calendar-days-events")
     }
      
    
     }
    
    let i=weekDayOfLastDay+1
    for(j=0;j<42-n;j++){
      i++
      const delta=i-weekDayOfLastDay;
      const li=document.createElement('li')
      const d=new Date(lastDay-0+86400*1000*delta)
      li.textContent=d.getDate()
     fragment.append(li)
      li.onclick = ()=>{
        if(selectedLi){
          selectedLi.classList.remove("calendar-days-selected")
        }
        li.classList.add("calendar-days-selected")
        selectedLi=li
      }
      li.classList.add("calendar-days-disabled")
     
    }
    days.append(fragment)
  }
}
//help function
function get(selector){
  return document.querySelector(selector)
}//用querySelector 只能得到第一个元素
function gets(selector){
  return document.querySelectorAll(selector)
}//用querySelectorAll 能得到所有的元素
