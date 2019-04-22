
class TimeLine {
  // time:间隔时间, timeSlot:传入的数据, item:数据中时间的key名字
  constructor(time, timeSlot, item, input) {
    this.time = time;
    this.timeSlot = timeSlot;
    this.item = item;
    this.num = 0;
    this.ul = document.getElementsByClassName('time-line')[0]
    this.lis = this.ul.getElementsByClassName('time-line__item')
    this.play = document.getElementsByClassName('time-line__play')[0]
    this.prev = document.getElementsByClassName('time-line__prev')[0]
    this.next = document.getElementsByClassName('time-line__next')[0]
    this.wrapper = document.getElementsByClassName('time-wrapper__inner')[0]
    this.intervalometer = null;
    this.timerSwitch = true;
    this.input = document.querySelector(input);
    // 是否是第一次点击
    this.onOff = true;
    // this.ellipsisData = [];
  }
  init() {
    this.creatDOM()
    this.controlPlay()
    // this.openTimer(true)
    this.trigger()
    document.addEventListener('mousedown', function(ev) {
      ev.preventDefault();
    })
  }
  
  get returnDate() {
      return this.timeSlot[this.num][this.item];
  }
  set returnDate(value) {
    // console.log(this.input)
    this.input['value'] = value;
    // input.value = value;
  }

  clearActive(){
    for (let ele of this.lis) {
      ele.firstElementChild.classList.remove('active');
    }
  }
  
// 启动定时器
  openTimer(boolean){
    if(boolean){
      this.timer();
    }
    this.intervalometer = setInterval(() => {
      this.timer();
    }, this.time)
  }
  // 渲染DOM
  creatDOM() {
    // data过长时处理数据
    // window.onresize = ()=>{
    //   let interval = Math.ceil(40*this.timeSlot.length/(this.wrapper.offsetWidth-100))
    //   this.ellipsisData = this.timeSlot.filter((item,index)=>index % interval ===0)
    //   console.log(this.ellipsisData)
    // }
    this.timeSlot.forEach((item,index) => {
      let li = `
      <li class="time-line__item" >
        <div class="time-line__point" index = "${index}"></div>
        <div class="time-line__label">${item[this.item]}</div>
      </li>`
      this.ul.innerHTML += li;
    })
  }

  // 定时器函数
  timer() {
    let returnNum = this.num;
    this.clearActive();
    
    let li = this.lis[this.num];
    li.firstElementChild.classList.add('active');
    this.num++;
    if (this.num > this.timeSlot.length - 1) {
      this.num = 0;
    }
    this.onOff = true;
    this.timerSwitch = true;
    this.returnDate = this.timeSlot[returnNum][this.item];
   
    return this.timeSlot[returnNum][this.item];
  }
  // 开关
  controlPlay() {
    let onOff = false
    this.play.addEventListener('click', ev => {
      if (onOff) {
        ev.target.className = 'time-line__play iconfont icon-kaishi';
        clearInterval(this.intervalometer);
        onOff = false;
        this.timerSwitch = false;
      } else {
        ev.target.className = 'time-line__play iconfont icon-zanting';
        this.openTimer(false);
        onOff = true;
      }
    })
  }
  // 判断target,选择执行方法
  trigger() {
    this.wrapper.addEventListener('click', ev => {
      let classArr = Array.from(ev.target.classList)
      switch (classArr[0]) {
        case 'time-line__prev':
          this.controlDirection('time-line__prev');
        break;
        case 'time-line__next':
          this.controlDirection('time-line__next');
        break;
        case 'time-line__point':
        let targetIndex = ev.target.attributes.index.nodeValue;
          this.clickSingle(targetIndex);
        break;
        default:
          null
        break
      }
    })
  }
  // 点击圆点
  clickSingle(targetIndex){
   
    this.clearActive();
    this.lis[targetIndex].firstElementChild.classList.add('active');
    this.num = +targetIndex ;
    this.returnDate = this.timeSlot[+targetIndex][this.item];
  }
  // 执行左右内容
  controlDirection(targetClass) {
    clearInterval(this.intervalometer);
    if (this.onOff) {
      this.num--;
      if (this.num < 0) {
        this.num = this.timeSlot.length - 1;
      }
    }
    // let classArr = Array.from(direction.classList);
    if (targetClass === 'time-line__prev') {
      this.num--;
      if (this.num < 0) {
        this.num = this.timeSlot.length - 1
      }
    } else if (targetClass === 'time-line__next') {
      this.num++
      if (this.num > this.timeSlot.length - 1) {
        this.num = 0
      }
    }
    
    this.clearActive();
    let li = this.lis[this.num];
    li.firstElementChild.classList.add('active');
    if (this.timerSwitch) {
      this.openTimer(false);
    }
    this.onOff = false;
    this.returnDate = this.timeSlot[this.num][this.item];
  }
}
let timeSlot = [{ data: '7-1' }, { data: '7-2' }, { data: '7-3' }, { data: '7-4' }, { data: '7-5' }, { data: '7-6' }, { data: '7-8' }, { data: '7-9' }, { data: '7-10' },]
let time = new TimeLine(800, timeSlot, 'data', '#input')
time.init()

// let input = document.getElementById('input')
// input.value = time.input;
