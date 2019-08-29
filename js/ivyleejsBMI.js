var list=document.querySelector('.list');
var btn=document.querySelector('.btn');
var data=JSON.parse(localStorage.getItem('BMIrecord')) || [];

btn.addEventListener('click',addBMI,false);
updateList(data);

function addBMI(e){
  e.preventDefault();  
  var heightcm=document.querySelector('.hcm').value;
  var heightm=heightcm/100;
  var weightkg=document.querySelector('.wkg').value;
  var bmiOrigin=weightkg/(heightm*heightm);
  var bmi=bmiOrigin.toFixed(2);
  var grade='';
  if(bmi<18.5){
      	grade='過輕';
    } else if(bmi>=18.5 && bmi<24){
      	grade='理想';
    } else if(bmi>=24 && bmi<27){
      	grade='過重';
    } else if(bmi>=27 && bmi<30){
      	grade='輕度肥胖';
    } else if(bmi>=30 && bmi<35){
     	grade='中度肥胖';
    } else if(bmi>=35){
      	grade='重度肥胖';
    }  
  if (heightcm=="" || weightkg==""){alert('未填寫完畢');};
  var BMI={
      //BMI = 體重(公斤) / 身高(公尺)*身高(公尺)
      bmi: bmi,
      w: weightkg,
      h: heightcm,
      grade: grade
    };
  data.push(BMI);
  updateList(data);
  localStorage.setItem('BMIrecord',JSON.stringify(data));
}

function updateList(items){
    var str='';
    var len=items.length;
    for(var i=0;len>i;i++){
      str+='<li class='+color(data[i])+'><div>'+
      items[i].grade+'</div><b><span>BMI</span>'+
      items[i].bmi+'</b><b><span>weight</span>'+
      items[i].w+'kg</b><b><span>height</span>'+
      items[i].h+'cm</b><a href="#" data-index='+i+'>X</a></li>';
      }
    list.innerHTML=str;
}

function color(data){
	if(data.bmi<18.5){
		return 'blue';
    }else if(data.bmi>=18.5 && data.bmi<24){
      	return 'green';
    }else if(data.bmi>=24 && data.bmi<27){
      	return 'orange';
    }else if(data.bmi>=27 && data.bmi<30){
      	return 'red';
    }else if(data.bmi>=30 && data.bmi<35){
      	return 'redder';
    }else if(data.bmi>=35){
      	return 'reddest';
    }
}

list.addEventListener('click',deleteBMI,false);
function deleteBMI(e){
  e.preventDefault();
  if(e.target.nodeName !== 'A'){return};
  var index = e.target.dataset.index;
  data.splice(index,1);
  localStorage.setItem('BMIrecord',JSON.stringify(data));
  updateList(data);
}