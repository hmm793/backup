import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parent } from '../../../models/parent';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'headmaster-detail-parent',
  templateUrl: './detail-parent.component.html',
  styleUrls: ['./detail-parent.component.css'],
})
export class DetailParentComponent implements OnInit {
  idUser: any;
  parentsId: string[] = [];

  constructor(
    private parentService: ParentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  parentData: Parent;
  ngOnInit(): void {
    this._checkParent();

    this.route.params.subscribe((params) => {
      this.idUser = [params['idParent']];
      setTimeout(() => {
        if (this.parentsId?.includes(this.idUser[0])) {
          this._parentInit();
        } else {
          this.router.navigate(['/not-found']);
        }
      }, 500);
    });
  }

  private _checkParent() {
    this.parentService.getAllParent().subscribe((res) => {
      this.parentsId = res.map((element) => {
        return element._id;
      });
    });
  }

  private _parentInit() {
    this.parentService.getParentById(this.idUser).subscribe((res) => {
      this.parentData = res;
    });
  }
}
