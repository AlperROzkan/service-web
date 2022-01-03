import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../model/loan';
import { LoanService } from '../services/loan.service';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import { repeat } from 'lodash';
import { CopyService } from '../services/copy.service';

interface LoanInfo extends Loan {
  username: string,
  bookname: string
}

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  public loans$: Observable<Loan[]>;
  public loans: Loan[];
  public loansInfos : LoanInfo[];

  constructor(
    private loanService:LoanService,
    private userService:UserService,
    private bookService:BookService,
    private copyService:CopyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();
  }

  public init() {
    this.loanService.getAll()
    .pipe(first(),
    tap(console.log)
    )
    .subscribe(
      res => {
        this.loansInfos = res as LoanInfo[];
        this.loansInfos.forEach(
          loan => {
            this.copyService.getBook(loan.copyId).subscribe(
              book => loan.bookname = book.name
            )
            this.getUserName(loan.userId).subscribe( (name) => loan.username = name);
          }
        )

      }
    );

    console.log("loans récupérés")
    console.log(this.loans)
  }

  public returnCopy(copyId){
    this.loanService.return(copyId)
    .pipe(
      //pas convaincu
      tap(() => this.router.navigateByUrl('/users'))
    )
    .subscribe();
  }

  public getBookName(bookId){
    return this.bookService.get(bookId)
    .pipe(
      first(),
      map(book=>book.name)
    );
  }

  public getUserName(userId){
    return this.userService.get(userId)
    .pipe(first(),
    map(user => user.name)
    );
  }
}
