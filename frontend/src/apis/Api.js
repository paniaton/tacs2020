import mock from "./mock"

class Api {

    constructor() {
      this.authToken = localStorage.getItem("id_token");
      this.userSessionId = localStorage.getItem("id_session");
      this.countryMap = localStorage.getItem("countriesList");
    }
  
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  
    BASE_URL = 'https://37d48d2c79b1.ngrok.io';

    createHeaders() {
      return !!this.authToken ? {
        ...this.headers,
        'Authorization': 'Bearer ' + this.authToken
      } : this.headers;
    }

  async getCountryList(){
      /*try{
        const data = mock.countriesNameISo 
  
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(data);
          }, 500);
        })
      }catch(error){
        console.log(error)
      }*/
    try {
        return await fetch(`${this.BASE_URL}/api/countries/names`, {
          method:'GET',
          headers: this.createHeaders(),  
        });
    } catch(error) {
      console.log(error)
    }

  }

  async getUserLists() {
      /*const data = mock.userLists
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      })*/
      
    try{
      return await fetch(`${this.BASE_URL}/api/user/${this.userSessionId}/lists`, {
        method: 'GET',
        headers: this.createHeaders()
      });
    }catch(e){
      console.log(e)
    }
  }

  async createCountryList(nombreLista,listarray){
   /* try{
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 500);
      })
    }catch(error){
      console.log(error)
    }*/
    try {
      return fetch( `${this.BASE_URL}/api/user/${this.userSessionId}/lists`,{
        method:"POST",
        headers: this.createHeaders(),
        body:JSON.stringify({
            "name": nombreLista,
            "countries":listarray
        })
      })
    } catch(error) {
      console.log(error)
    }
  }

  async editCountryList(name,listId,countries){
      /*
      return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 500);
        })
      */
    try{
      return fetch( `${this.BASE_URL}/api/user/${this.userSessionId}/lists/${listId}`,{
        method:"PUT",
        headers: this.createHeaders(),
        body:JSON.stringify({
            "name": name,
            "countries":countries
        })
      })
    } catch(error){
        console.log(error)
    }
  }
    
  async deleteUserList(listId) {
    try{
      return await fetch(`${this.BASE_URL}/api/user/${this.userSessionId}/lists/${listId}`,{
            method:"DELETE",
            headers: this.createHeaders()
            });
    }catch(e){
      console.log(e)
    }
    /*return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 500);
    })*/
  }

  async getCountriesDataByDate(isoList,dateinicial,datefinal) {
    try{
      const data = mock.singleCountryLastday

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      })
    }catch(error){
      console.log(error)
    }
    /*const res = await fetch(`${this.BASE_URL}/api/countries/timeseries?`, {
          method:'POST',
          headers: this.createHeaders(),
          body: JSON.stringify(item),
        });

      if(res.ok)
        const data = await res.json()
      
      return data.timeseries
      }*/
  }

  async getCountriesDataByDays(iso,startDay,endDay) {
    try{
      const data = mock.nearWithOffset 

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      })
    }catch(error){
      console.log(error)
    }
    /*const res = await await fetch(this.BASE_URL, {
          method:'POST',
          headers: this.createHeaders(),
          body: JSON.stringify(item),
        });

      if(res.ok)
        const data = await res.json()
      
      return data.timeseries
      }*/
  }

  async getCountriesData(isoList) {
    try{
      const data = mock.nearordered 

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      })
    }catch(error){
      console.log(error)
    }
    /*const res = await await fetch(this.BASE_URL, {
          method:'POST',
          headers: this.createHeaders(),
          body: JSON.stringify(item),
        });

      if(res.ok)
        const data = await res.json()
      
      return data.timeseries
      }*/
  }
  
  async getNearCountries() {
    try{
      const data = mock.nearordered

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 500);
      })

      /*let position = await getLocation()
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      return await fetch(`${this.BASE_URL}/api/countries?lat=${lat}&lon=${lng}}`, {
        method: 'GET',
        headers: this.createHeaders()
      });*/

    }catch(e){
      console.log(e)
    }
  }

  async loginUser(loginValue,passwordValue) { //al api.js
    /*const res = mock.loginUser
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res);
        }, 2000);
      })*/
    
    try{
      return await fetch(`${this.BASE_URL}/api/login`, {
          method:'POST',
          headers: this.createHeaders(),
          body: JSON.stringify(
            {
              email: loginValue,
              password: passwordValue
            }),
        });
    }catch(error){
      console.log(error)
    } 
  }

  async loginUserWithGoogle(tokenId) { //al api.js
    const res = mock.loginUser
    
    try{
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res);
        }, 2000);
      })
    }catch(error){
      console.log(error)
    }
    /*return await fetch(`${BASE_URL}/auth/google`, {
          method:'POST',
          headers: this.createHeaders(),
          body: JSON.stringify(
            {
              token: tokenId
            }
          ),
        });
      }*/
  }

  async createUser(nameValue,loginValue,passwordValue,countryIso) {
      /*const res = mock.signUp
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res);
        }, 2000);
      })*/
    try{
      return await fetch(`${this.BASE_URL}/api/signup`, {
          method:'POST',
          headers: this.createHeaders(),
          body: JSON.stringify({
                        name: nameValue,
                        email: loginValue,
                        password: passwordValue,
                        country: countryIso,
                        isAdmin: false
                        }),
                      });
    } catch(error){
      console.log(error)
    }
  }
}

export default Api;
  