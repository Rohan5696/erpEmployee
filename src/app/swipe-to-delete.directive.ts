import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSwipeToDelete]'
})
export class SwipeToDeleteDirective {
  @Output() swipeToDelete = new EventEmitter<void>();

  private startX: any;
  private swiped = false;

  constructor(private el: ElementRef) {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.swiped = false;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;

    if (deltaX > -50) { // Adjust this value to control swipe distance
      this.swiped = true;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.swiped) {
      this.swipeToDelete.emit();
    }
  }
}

