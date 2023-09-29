import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../model/Student";
import {MatTableDataSource} from "@angular/material/table";
import {StudentsService} from "../../services/students.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit{

  isEditMode = false

  studentData:Student
  dataSource:MatTableDataSource<any>
  displayedColumns: string[]=['id', 'name', 'age', 'address','actions']

  @ViewChild(MatPaginator, {static:false}) paginator !: MatPaginator
  @ViewChild(MatSort, {static:false}) sort!:MatSort

  constructor(private _studentService:StudentsService) {
    this.studentData = {} as Student
    this.dataSource = new MatTableDataSource<any>()

  }

  ngOnInit(): void {
    this.getAllStudents()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort= this.sort
  }

  private resetEditState(){
    this.isEditMode = false
    this.studentData = {} as Student
  }


  private getAllStudents(){
    this._studentService.getAll().subscribe((response:any)=>{
      this.dataSource.data = response
    })
  }

  private addStudent(){
    this._studentService.create(this.studentData).subscribe((response:any)=>{
      this.dataSource.data.push({...response})
      this.dataSource.data = this.dataSource.data.map((o:Student)=>{
        return o
      })
    })
  }

  private  updateStudent(){
    let student = this.studentData
    this._studentService.update(student.id, student).subscribe((response:any)=>{
      this.dataSource.data = this.dataSource.data.map((o:Student)=>{
        if(o.id == response.id){
          o = response
        }
        return o
      })
    })
  }

  private deleteStudent(id:number){
    this._studentService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:Student)=>{
        return o.id !==id ? o : false
      })
    })
  }

  onEditItem(element:Student){
    this.studentData = element
    this.isEditMode = true

  }

  onDeleteItem(element:Student){
    this.deleteStudent(element.id)
  }

  onCancelEdit(){
    this.isEditMode=false
    this.getAllStudents()
  }

  onStudentAdded(student:Student){
    this.studentData = student
    this.addStudent()
    this.resetEditState()
  }

  onStudentUpdate(student:Student){
    this.studentData = student
    this.updateStudent()
    this.resetEditState()
  }
}
