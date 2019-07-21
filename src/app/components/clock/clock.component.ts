import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(
    private utilities: UtilitiesService
  ) { }

  hour: string;
  min: string;
  sec: string;
  suffix: string;

  ngOnInit() {
    this.tick();
    setInterval(()=>{
      this.tick();
    }, 1000)
  }

  tick(){
    let now = new Date();
    this.hour = String(this.utilities.format12Hour(now.getHours()));
    this.min = `:${String(this.utilities.addZeros(now.getMinutes()))}`;
    this.sec = `:${String(this.utilities.addZeros(now.getSeconds()))}`;
    this.suffix = this.utilities.formatAmPm(this.hour);
  }

}
