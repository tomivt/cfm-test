import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Champion} from '../../models/champion.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ChampionService} from '../../services/champion.service';
import {Subscription} from 'rxjs';
import {Tag, TAGS} from '../add-page/add-page.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private championService: ChampionService = inject(ChampionService);
  private sub: Subscription = new Subscription();

  protected champion!: Champion;
  protected availableTags: Tag[] = [...TAGS];
  protected isDeleting: boolean = false;

  protected form: FormGroup = new FormGroup({
    name:  new FormControl('', [Validators.required]),
    key:   new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    tags:  new FormArray([], [Validators.required]),
  });

  get tagsArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  get canAddTag(): boolean {
    return this.tagsArray.length < 2;
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.sub.add(
      this.championService.getChampionById(id).subscribe(champion => {
        if (!champion) { this.router.navigate(['/']); return; }
        this.champion = champion;
        this.fillForm(champion);
      })
    );
  }

  private fillForm(champion: Champion): void {
    this.form.patchValue({
      name:  champion.name,
      key:   champion.key,
      title: champion.title,
    });
    this.tagsArray.clear();
    champion.tags.forEach(tag => {
      this.tagsArray.push(new FormControl(tag, Validators.required));
    });
  }

  getAvailableTagsFor(index: number): Tag[] {
    const selected = this.tagsArray.controls
      .map((c, i) => i !== index ? c.value : null)
      .filter(Boolean);
    return this.availableTags.filter(t => !selected.includes(t));
  }

  addTag(): void {
    if (this.canAddTag) {
      this.tagsArray.push(new FormControl('', [Validators.required]));
    }
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  onUpdate(): void {
    if (this.form.invalid) return;
    const updated: Champion = {
      ...this.champion,
      ...this.form.value,
    };
    this.sub.add(
      this.championService.updateChampion(updated).subscribe(() => {
        this.router.navigate(['/']);
      })
    );
  }

  onDelete(): void {
    this.isDeleting = true;
    this.sub.add(
      this.championService.deleteChampion(this.champion.id).subscribe(() => {
        this.router.navigate(['/']);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
