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
  paginate: boolean = false
  loading: boolean = false
  data: boolean = true
  p: number = 1
  totalItemsPagination: number = 0
  constructor(private mlService: MLApiService) { }

  ngOnInit() {
  }
  search(word: string) {
    this.word = word
    this.searchItem(0)
  }
  searchItem(offset: number){
    this.clearData()
    this.mlService.getItems(this.word,offset).subscribe(data => {
      this.results = data['results']
      console.log(data);
      this.totalItemsPagination = data['paging']['total']
      
      this.loading = false
      if (this.results.length === 0) {
        this.data = false
        this.paginate = false
      }
      this.paginate = true
     this.getSellers()
    })
  }
  clearData(){
    this.data = true;
    this.loading = true
    this.results = []
    this.sellers = []
    this.shipping = []
  }
  getSellers(){
    for (let index = 0; index < this.results.length; index++) {
      this.shipping.push(this.results[index]['shipping']['free_shipping'])
      const element = this.results[index]['seller']['id'];
      this.mlService.getSeller(element).subscribe(data => {
        this.sellers.push(data)
      })
    }
  }

  pageChanged(event:any){
    this.p = event
    console.log(event);
    this.searchItem((event - 1) * 50)
    window.scroll(0, 0);
  }
}
