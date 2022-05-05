import { Course } from './course';
import { Component } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   public course: Course[] = [];

   constructor(private coureseService: CourseService) { }

   public getCourese(): void{
      this.coureseService.getCourse().subscribe(
        (response: Course[])=>{
          this.course = response;
        }
      )
   }
}
