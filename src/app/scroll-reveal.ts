import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
  standalone: false
})
export class ScrollReveal {

  private shown = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight - 100 && rect.bottom >= 100;
    if (isVisible && !this.shown) {
      this.setVisibleStyles();
      this.shown = true;
    } else if (!isVisible && this.shown) {
      this.setHiddenStyles();
      this.shown = false;
    }
  }

  private setVisibleStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
  }

  private setHiddenStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(20px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease-out, transform 0.6s ease-out');
  }
}
