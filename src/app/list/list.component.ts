import { Component, OnInit } from '@angular/core';
import { combineLatest, map, of, tap } from 'rxjs';

const newCars = [
  {
    type: 'Tesla',
    model: '3',
    year: 2022,
  },
  {
    type: 'BMW',
    model: 'i3',
    year: 2023,
  },
  {
    type: 'Mercedes',
    model: 'EQS',
    year: 2023,
  },
];

const usedCars = [
  {
    type: 'Opel',
    model: 'Corsa',
    year: 2020,
  },
  {
    type: 'Audi',
    model: 'A4',
    year: 2019,
  },
  {
    type: 'BMW',
    model: 'X6',
    year: 2021,
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  newCars$ = of(newCars);
  usedCars$ = of(usedCars);

  mergedCars$ = combineLatest([this.newCars$, this.usedCars$]).pipe(
    tap(([newCars, usedCars]) => console.log(newCars, usedCars)),
    map(([newCars, usedCars]) => {
      const newCarsUsed = newCars.map((car) => ({ ...car, isUsed: false }));
      const usedCarsUsed = usedCars.map((car) => ({ ...car, isUsed: true }));
      return [newCarsUsed, usedCarsUsed];
    }),
    map(([newCars, usedCars]) => [...newCars, ...usedCars]),
    map((cars) => cars.sort((a, b) => a.year - b.year))
  );

  constructor() {}

  ngOnInit(): void {}
}
