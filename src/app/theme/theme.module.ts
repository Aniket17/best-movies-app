import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { BaseComponent } from './base/base.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
@NgModule({
  declarations: [BaseComponent, BrandComponent, MobileHeaderComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [BaseComponent],
})
export class ThemeModule {}
