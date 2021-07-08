	
	
	console.log('判断啦')
	var userAgentInfo = navigator.userAgent;  
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
	var flag = false;
	var v=0
	for ( v = 0; v < Agents.length; v++) 
{  
		 if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }  
	}  
	if(flag){
		window.location='https://m.yihuichuang.com';  //如果是移动设备访问，就跳转到m.html。
	}
