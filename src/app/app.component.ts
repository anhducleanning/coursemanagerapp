import { SliderService } from './slider.service';
import { Slider } from './slider';
import { Course } from './course';
import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   public courses: Course[] = [];
   public slider : Slider[] = [];
   public editCourse: Course;
   public deleteCourse :Course;
   public countCourse :Course;



// Slider 
imageObject = [{
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
 thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  title: 'Hummingbirds are amazing creatures'
}, {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
}, {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  title: 'Example with title.'
}];



    //Count Courese
   countCounse:number = 0;
   countCounseStop:number = setInterval(()=>{
    this.countCounse++;
    this.coureseService.getCourse().subscribe(
     (response: Course[])=>{
       this.courses = response;
     },
     (error: HttpErrorResponse)=>{
       alert(error.message);
     }
     )
    if(this.countCounse ==  this.courses.length){
     clearInterval(this.countCounseStop)
   }
  },120)

  //ONLINE
  accuratecount:number = 0;
  accuratecountstop:any = setInterval(()=>{
    this.accuratecount++;
    if(this.accuratecount == 95)
    {
      
      clearInterval(this.accuratecountstop);
    }
  },10) 

  //% QUAY LẠI
  customerfeedback:number = 0;
  customerfeedbackstop:any = setInterval(()=>{
    this.customerfeedback++;
    if(this.customerfeedback == 85)
    {
      
      clearInterval(this.customerfeedbackstop);
    }
  },10)


   constructor(private coureseService: CourseService, private sliderService: SliderService){ }


   ngOnInit()  {
     this.getCourese();
     this.getSlider();
     console.log("anh duc");
    
   }
    //Get Course
   public getCourese(): void{
      this.coureseService.getCourse().subscribe(
        (response: Course[])=>{
          this.courses = response;
          console.log(this.courses.length);
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
        )
   }

   //Get Slider
   public getSlider(): void{
     this.sliderService.getSlider().subscribe(
       (reponse: Slider[]) =>{
         this.slider = reponse;
         console.log(this.slider);
       },
       (error: HttpErrorResponse)=>{
         alert(error.message);
       }
     )
   }

   public onAddCourse(addForm: NgForm): void {
     document.getElementById('add-employee-form').click();
    this.coureseService.addCourse(addForm.value).subscribe(
        (response: Course) =>{
          console.log(response);
          this.getCourese();
          addForm.reset();
          window.location.reload();
        },
        (error : HttpErrorResponse)=>{
          alert(error.message);
        }

    )
  }
   
  public onUpdateCourse(course: Course,courseId: number): void {
    document.getElementById('add-employee-form').click();
   this.coureseService.updateCourse(course,courseId).subscribe(
       (response: Course) =>{
         console.log(response);
         this.getCourese();
         window.location.reload();
       },
       (error : HttpErrorResponse)=>{
         alert(courseId);
         alert(error.message);
       }
   )
 }

 
 public onDeleteCourse(courseId: number): void {
  
 this.coureseService.deleteCourse(courseId).subscribe(
     (response: void) =>{
       console.log(response);
       this.getCourese();
       window.location.reload();
     },
     (error : HttpErrorResponse)=>{
       alert(courseId);
       alert(error.message);
     }
 )
}



public searchCourse(key:string): void{
    console.log(key);
    const results: Course[] = [];
    for(const course of this.courses){
       if(course.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||course.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||course.imageUrl.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||course.link.toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
         results.push(course);
       }
    }
    this.courses = results;
    if(results.length ==0 || !key){
      this.getCourese();
    }

}


  public onOpenModal(course: Course, mode: string): void {

  
  

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCourse= course;
      button.setAttribute('data-target', '#updateCourseModal');
    }
    if (mode === 'delete') {
      this.deleteCourse =course;
      button.setAttribute('data-target', '#deleteCourseModal');
    }
    container.appendChild(button);
    button.click();
  }

  
}
