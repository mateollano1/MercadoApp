import { Component, OnInit } from '@angular/core';
import { MLApiService } from 'src/app/Services/mlapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: any[]
  word: string = ""
  p: number = 1;
  loading: boolean = false
  data: boolean = true
  constructor(private mlService: MLApiService) { }

  ngOnInit() {
  }
  search(word: string) {
    this.data = true
    this.loading = true
    this.word = word
    this.results = []
    this.mlService.getItems(word).subscribe(data => {
      this.results = data['results']
      this.loading = false
      console.log(this.results.length)
      if (this.results.length ===0) {
        this.data = false
      }
      console.log(this.results)
    })
  }

}
