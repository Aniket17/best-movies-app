import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubheaderService } from 'src/app/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent implements OnInit {
  subscriptions: Subscription[];
  constructor(private subheaderService: SubheaderService) {}
  pageTitle: string;
  pageParent: string;
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let sub = this.subheaderService.title$.subscribe((bt) => {
      //sometimes can be null
      if (bt) {
        Promise.resolve(null).then(() => {
          this.pageTitle = bt.title;
          this.pageParent = bt.parent;
        });
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
