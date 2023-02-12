import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [],
	exports: [SharedModule],
	imports: [CommonModule, SharedModule],
})
export class UserTeamModule {}
