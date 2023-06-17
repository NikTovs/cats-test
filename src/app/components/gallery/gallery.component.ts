import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getImagesState } from 'src/app/store/selectors/imagesSelector';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.subscribeOnImages();
  }
  completion$ = new Subject<void>();
  imagesArray: string[] = [];

  @Select(getImagesState)
  images$!: Observable<string[]>;

  subscribeOnImages() {
    this.images$
    .pipe(takeUntil(this.completion$))
    .subscribe(images => {
      this.imagesArray = images;
    });
  }

  ngOnDestroy(): void {
    this.completion$.next();
    this.completion$.complete();
  }
}
