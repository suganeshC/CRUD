import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDto } from '../dialog/Dto/employeeDto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<EmployeeDto>('http://localhost:3000/employeeList/', data);
  }
  getEmployee() {
    return this.http.get<EmployeeDto[]>('http://localhost:3000/employeeList/');
  }
  putEmployee(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/employeeList/' + id, data);
  }
  deleteEmployee(id:number){
    return this.http.delete<any>('http://localhost:3000/employeeList/'+id);
  }
}
