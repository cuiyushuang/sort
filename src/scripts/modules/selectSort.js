//动态生成数组
function num(){
  return Math.floor(Math.random()*100+1);
}
function create(n){
  let list = [];
  while(list.length<n){
    let a = num();
    let Onoff = true;
    for(let i=0;i<list.length;i++){
      if( list[i]==a) {
        Onoff= false;
        break;
      }else{
        Onoff = true;
      }
    }
    if(Onoff){
      list.push(a);
    }
  }
  return list;
}
$('createArr').onclick = function(){
  let val1 = $('in').value;
  let val2 = $('import').value;
  if(val2){
    let pcs =($('import').value).split(',');
    let arr = pcs;
    show(arr);
  }else{
    let pcs = val1;
    let arr = create(parseInt(pcs));
    show(arr);
  }
};
$('select').onclick = function(){
  selectSort();
};
//计算最大高度
function getMax(data){
  let max = data[0];
  for(let i in data){
    if(data[i]>max){
      max = data[i];
    }
  }
  return max;
}

//获取元素
function $(id){
  return document.getElementById(id);
}

function hasClass(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

function removeClass(elem, cls) {
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//产生柱状图
function show(data){
  let maxWidth = 800;
  let maxHeight = 450;
  let maxNum = getMax(data);
  //计算比例
  let percent = maxHeight/maxNum;
  //柱子间隔
  let space = maxWidth/(data.length*2+1);
  let width = space;

  //柱子宽度
  let zhuWidth = 800/(data.length*2+1);
  const spaceWidth = 20;
  $('box').innerHTML='';
  //循环数据
  for(let i=0;i<data.length;i++){
    let liDom = document.createElement('li');
    liDom.style.width = space+'px';
    let left1 = (i+1)*spaceWidth+i*zhuWidth;
    liDom.style.height = (data[i]*percent)+'px';
    liDom.innerHTML = data[i];
    liDom.style.left =left1+'px';
    $("box").appendChild(liDom);
  }
}

async function selectSort(){
  let arrC = [];
  let data = document.getElementsByTagName('li');
  data = Array.apply(null,data);
  data.forEach(function (v, i) {
    arrC[i] = v.innerHTML;
  });
  console.log(`之前的${arrC}`);
  let len = data.length;
  let minIndex, temp;
  for (let i = 0; i < len- 1; i++) {
    minIndex = i;
    addClass(data[minIndex],'light');
    for (let j = i + 1; j < len; j++) {
      //addClass(data[j],'end');
      if (parseInt(arrC[j]) < parseInt(arrC[minIndex])) { //寻找最小的数
        minIndex = j; //将最小数的索引保存
      }
    }
    swap(data[i],data[minIndex]);
    let temp = data[i];
    data[i] = data[minIndex];
    data[minIndex] = temp;
    addClass(data[i],'light1');  //橙色
    data.forEach(function (v, i) {
      arrC[i] = v.innerHTML;
    });
    await sleep(2000);
  }
  for(let i=0;i<data.length;i++){
    addClass(data[i],'light1');
  }
}

function swap(ele1,ele2){
  let dis1 = ele1.offsetLeft;
  let dis2 = ele2.offsetLeft;
  const d1 = dis1;
  const d2 = dis2;
  let timer = setInterval(function(){
    if(dis1<d2){
      ele1.style.left = `${dis1++}px`
    }else {
      clearInterval(timer);
    }
  },10);
  let timer2 = setInterval(function(){
    if(d1<dis2){
      ele2.style.left = `${dis2--}px`;
    }else{
      clearInterval(timer2);
    }
  },10);
  ele2.parentNode.insertBefore(ele2,ele1);
}
