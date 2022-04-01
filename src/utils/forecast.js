const request = require('request')

const forecast= (address,callback) => { 
    const url ='https://samples.openweathermap.org/data/2.5/'+ address + '?id=524901&appid=b1b15e88fa797225412429c1c50c122a1'
    request({ url,json:true},(error, { body} ) => { 
        if(error){ 
            callback('Unable to connect to weather service!', undefined)       
         } else if(body.error){
                    callback('Unable to find location.Try another search.',undefined)
            
                 } else{ 
                     
                    callback(undefined,{ 
                        forecast:'It is currently ' + body.list[0].main.temp_max + ' degress out. This tempresture is'+body.list[0].main.temp+ 'with a humidity'+ body.list[0].main.humidity+ '.There is a '+  body.list[0].main.pressure+ ' % chance of rain',
                        latitude: body.list[0].main.temp_max  ,
                        longitude: body.list[0].main.temp_max,
                        description: body.list[0].weather[0].description
                    })
                 }
    })
} 

module.exports = forecast