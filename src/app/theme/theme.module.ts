import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { BaseComponent } from './base/base.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    BaseComponent,
    BrandComponent,
    MobileHeaderComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [BaseComponent],
})
export class ThemeModule {}
