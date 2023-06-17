import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CatRespObject } from 'src/app/types/catResponseObject';
import { getLimitState } from 'src/app/store/selectors/limitSelector';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetImages } from 'src/app/store/images.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SetBreed, SetLimit } from 'src/app/store/settings.state';
import { getBreedIdState } from 'src/app/store/selectors/breedIdSelector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filters-menu',
  templateUrl: './filters-menu.component.html',
  styleUrls: ['./filters-menu.component.scss']
})
export class FiltersMenuComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private store: Store,
              private fb: FormBuilder) {
                this.filterForm = this.fb.group({
                  breedControl: [this.currentBreedId],
                  limitControl: [this.limit]
                })
              }

  filterForm: FormGroup;
  breedsList: Array<{name: string, id: string}> = [];
  limit = 10;
  currentBreedId: string = '';
  isResponseLoading = false;

  private completion$ = new Subject<void>();
  
  ngOnInit(): void {
    this.getLimit();
    this.getCurrentBreed();
    this.getBreedsList();
    this.subscribeFormValueChanges();
  }

  @Select(getLimitState)
  limit$!: Observable<number>;

  @Select(getBreedIdState)
  currentBreedId$!: Observable<string>;

  getImages(): void {
    this.isResponseLoading = true;
    this.httpService.getCats(this.limit, this.currentBreedId)
    .pipe(takeUntil(this.completion$))
    .subscribe((resp: Array<CatRespObject>) => {
      this.isResponseLoading = false;
      this.retrieveImages(resp);
    })
  }

  retrieveImages(responseObj: Array<CatRespObject>): void {
    const imgUrls: string[] = [];
    responseObj.forEach((obj) => {
      imgUrls.push(obj.url);
    });
    this.store.dispatch(new SetImages(imgUrls));
  }

  getLimit(): void {
    this.limit$
    .pipe(takeUntil(this.completion$)).
    subscribe(limit => {
      this.limit = limit;
    });
 }

 getCurrentBreed(): void {
  this.currentBreedId$
  .pipe(takeUntil(this.completion$)).
  subscribe(id => {
    this.currentBreedId = id;
  })
 }

 getBreedsList(): void {
  this.httpService.getBreedsList()
  .pipe(takeUntil(this.completion$))
  .subscribe(breeds => {
    breeds.forEach((breed: any) => {
    this.breedsList.push({name: breed.name, id: breed.id});
    });
    this.breedsList.unshift({name: 'All', id: ''})
  });
 }

 subscribeFormValueChanges(): void {
  this.filterForm.valueChanges.subscribe(values => {
    this.store.dispatch(new SetBreed(values.breedControl));
    this.store.dispatch(new SetLimit(values.limitControl));
  });
 }

 ngOnDestroy(): void {
  this.completion$.next();
  this.completion$.complete();
 }
}