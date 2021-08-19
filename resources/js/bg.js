/**
 * 
 */

let getBackgroundImage = async ()=>{
	
		let prevBackground = JSON.parse(localStorage.getItem('bg-log'));
		
		if(prevBackground && (prevBackground.expiresOn >  Date.now())) {
			return prevBackground.imgInfo;
		}
	
		
		let imgObject = await requestBackground();
		insertBackgroundLog(imgObject);
		return imgObject;
		
};

let requestBackground = async () =>{
	
	let params = {
		orientation:'landscape',
		query:'landscape'
	}
	
	let queryString = createQueryString(params);
	 
	let response = await fetch('https://api.unsplash.com/photos/random?'+ queryString ,{
					method:'get',
					headers:{Authorization: 'Client-ID kY2CM42VK0U4H8ovy-Xucb8Dd7OcswJmIPgSuOlHZ48'}
				});
	let obj = await response.json();
		
	return {
			img : obj.urls.full,
			place : obj.location.title
		}
}

let insertBackgroundLog = (imgObject) => {
	let expirationDate = new Date()
		expirationDate = expirationDate.setSeconds(expirationDate.getSeconds() + 10);
		
		
		const backgroundLog = {
			expiresOn : expirationDate,
			imgInfo : imgObject
		}
		
		localStorage.setItem('bg-log',JSON.stringify(backgroundLog));
	
}


	
let setCurrentPositionInfo = async () => {
	let coords = await getCoords();
	
	
}

let getLocationTemp = async ()=>{
		const OPEN_WATHER_API_KEY = '83b95d9b8f39524ac69a9c4834ff1553';
		let coords = await getCoords();
		
		let params = {
				lat:coords.latitude,
				lon:coords.longitude,
				appid:OPEN_WATHER_API_KEY,
				units:'metric',
				lang:'kr'
		};
		let queryString = createQueryString(params);
		let url = `https://api.openweathermap.org/data/2.5/weather?${queryString}`;
		
		let response = await fetch(url,{
			method : 'get'
		});
		let obj = await response.json();
		console.dir(obj);
		return{
			temp : obj.main.temp,
			palce : obj.name
		}
		
	}

  let getCoords = () => {
      if(!navigator.geolocation) {
          return new Promise((resolve,reject)=>{	
             reject();
           });
      }else{
           return new Promise((resolve,reject)=>{
              navigator.geolocation.getCurrentPosition((position) => {
                 resolve(position.coords);
              });
           })
       }
   }

(async ()=>{
	
	/* 배경이미지와 이미지의 위치정보 랜더링*/
	let background = await getBackgroundImage();
	document.querySelector('body').style.backgroundImage=`url(${background.img})`;
	document.querySelector('.footer_test').innerHTML = background.place;
	/* 지역과 기온 랜더링 */
	let locationTemp = await getLocationTemp();
	document.querySelector('.location_text').innerHTML = locationTemp.temp + 'º  @' + locationTemp.place;
})();



















