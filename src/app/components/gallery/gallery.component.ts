import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { getImagesState } from 'src/app/store/selectors/imagesSelector';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  ngOnInit(): void {
    this.subscribeOnImages();
  }
  imagesArray: string[] = [];

  @Select(getImagesState)
  images$!: Observable<string[]>;

  subscribeOnImages() {
    this.images$.subscribe(images => {
      this.imagesArray = images;
    });
  }
}
