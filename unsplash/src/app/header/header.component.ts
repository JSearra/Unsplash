import { Component , Inject, PLATFORM_ID} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isDarkMode: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      // Only access localStorage if in browser environment
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
      this.applyDarkMode(this.isDarkMode);
    }
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      this.applyDarkMode(this.isDarkMode);
      localStorage.setItem('darkMode', String(this.isDarkMode));
    }
  }

  private applyDarkMode(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = this.document.body;
      isDarkMode ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');
    }
  }

}
