import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirective]',
  standalone: true
})
export class DirectiveDirective implements OnChanges {

  @Input() text: string='';
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.renderer.setAttribute(this.el.nativeElement, 'title', this.text);
  }

}
