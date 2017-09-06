import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'main-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {
    @Output() onPageSelect: EventEmitter<string> = new EventEmitter<string>()

    public ChangePage(page: string) {
        this.onPageSelect.emit(page);
    }
}
