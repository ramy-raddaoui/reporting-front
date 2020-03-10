import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RESTService {

  constructor(
    private http:HttpClient 
  ) { }

  PiechartGetDATA(data,headers)
{
  //return this.http.get<any>(`http://localhost:3000/api/embed/card/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJxdWVzdGlvbiI6MX0sInBhcmFtcyI6e30sImV4cCI6NzU4MjU1NDc1NywiaWF0IjoxNTgyNTU0ODE2fQ.gUIfkQHQpI7n49V5wtezybY_hhHDA7NWn0IftnZJYgA/query`)
  
	return this.http.post<any>(`http://localhost:8080/piechart`,JSON.stringify({data: data}),{headers: headers})
}

  /*
  executeHelloWorldBeanServicewithParams(data,headers)
{
  //return this.http.get<any>(`http://localhost:3000/api/embed/card/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJxdWVzdGlvbiI6MX0sInBhcmFtcyI6e30sImV4cCI6NzU4MjU1NDc1NywiaWF0IjoxNTgyNTU0ODE2fQ.gUIfkQHQpI7n49V5wtezybY_hhHDA7NWn0IftnZJYgA/query`)
  
	return this.http.get<any>(`http://localhost:8080/test/${param1}/${param2}/${metrique}/${seuil}`)
}
*/
}
