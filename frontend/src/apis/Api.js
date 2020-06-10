import mock from "./mock"

class Api {

    constructor() {
      this.authToken = localStorage.getItem("id_token");
    }
  
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  
    BASE_URL = '{{localPath}}/api';

    createHeaders() {
      return !!this.authToken ? {
        ...this.headers,
        'Authorization': 'Bearer ' + this.authToken
      } : this.headers;
    }

    async getAll() {
      return await fetch(this.BASE_URL, {
        method: 'GET',
        headers: this.createHeaders()
      });
    }
  
    async getById(id) {
      return await fetch(`${this.BASE_URL}/${id}`, {
        method: 'GET',
        headers: this.createHeaders()
      });
    }
  
    async delete(id) {
      return await fetch(`${this.BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: this.createHeaders()
      });
    }
  
    async update(item) {
      return await fetch(`${this.BASE_URL}/${item.id}`, {
        method:'PUT',
        headers: this.createHeaders(),
        body: JSON.stringify(item),
      });
    }
  
    async create(item) {
      return await fetch(this.BASE_URL, {
        method:'POST',
        headers: this.createHeaders(),
        body: JSON.stringify(item),
      });
    }

  async getCountryDataByIsoDate(iso,dateinicial,datefinal) {
    try{
      const data = mock.countryByIso 

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
      const data = mock.near

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

  loginUser(loginValue,passwordValue) { //al api.js
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
    /*return await fetch(`${BASE_URL}/`, {
          method:'POST',
          headers: headers,
          body: JSON.stringify(item),
        });
      }*/
  }

  createUser(nameValue,loginValue,passwordValue) { //esto va al api.js
    try{
      const res = mock.signUp
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res);
        }, 2000);
      })
    }catch(error){
      console.log(error)
    }
    /*return await fetch(`${BASE_URL}/`, {
          method:'POST',
          headers: headers,
          body: JSON.stringify(item),
        });
      }*/
  }
}
  export default Api;
  