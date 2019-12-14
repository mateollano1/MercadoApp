import { Component, OnInit } from '@angular/core';
import { MLApiService } from 'src/app/Services/mlapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: any[]
  sellers: any[]
  shipping: boolean[] = []
  word: string = ""
  p: number = 1;
  paginate: boolean = false
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
    this.sellers = []
    this.mlService.getItems(word).subscribe(data => {
      this.results = data['results']
      // this.shipping = data['results']['shipping']
      this.loading = false
      console.log(this.results.length)
      if (this.results.length === 0) {
        this.data = false
        this.paginate = false
      }
      this.paginate = true
      console.log(this.results)
      for (let index = 0; index < this.results.length; index++) {
        this.shipping.push(this.results[index]['shipping']['free_shipping'])
        const element = this.results[index]['seller']['id'];
        this.mlService.getSeller(element).subscribe(data => {
          this.sellers.push(data)
        })
      }
      console.log(this.sellers)
      console.log(this.shipping)
    })
  }

}
