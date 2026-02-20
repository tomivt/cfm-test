import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChampionService } from '../../services/champion.service';
import { Subscription } from 'rxjs';

export const TAGS = ['Fighter', 'Tank', 'Assassin', 'Mage', 'Marksman', 'Support'] as const;
export type Tag = typeof TAGS[number];

@Component({
  selector: 'app-add-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.css'
})
export class AddPageComponent implements OnInit, OnDestroy {

  private championService: ChampionService = inject(ChampionService);
  private sub: Subscription = new Subscription();

  protected nextId: number = 0;
  protected availableTags: Tag[] = [...TAGS];

  protected form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    key:   new FormControl('', [Validators.required]),
    name:  new FormControl('', [Validators.required]),
    tags:  new FormArray([], [Validators.required]),
  });

  get tagsArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  get canAddTag(): boolean {
    return this.tagsArray.length < 2;
  }

  ngOnInit(): void {
    this.sub.add(
      this.championService.getNextId().subscribe((id: number) => {
        this.nextId = id;
      })
    );
  }

  addTag(): void {
    if (this.canAddTag) {
      this.tagsArray.push(new FormControl('', [Validators.required]));
    }
  }

  getAvailableTagsFor(index: number): Tag[] {
    const selected = this.tagsArray.controls
      .map((c, i) => i !== index ? c.value : null)
      .filter(Boolean);

    return this.availableTags.filter(t => !selected.includes(t));
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const newChampion = {
      id:    this.nextId,
      key:   this.form.value.key,
      name:  this.form.value.name,
      title: this.form.value.title,
      tags:  this.form.value.tags,
    };

    this.sub.add(
      this.championService.addChampion(newChampion).subscribe({
        next: (): void => {
          this.form.reset();
          this.nextId++;
        },
        error: err => console.error('Error:', err),
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
