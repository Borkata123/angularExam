import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { appEmailValidator } from './email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
    }
  ]
})
export class EmailDirective implements OnChanges, Validator {

  @Input() appEmail: string[] = [];

  constructor() { }

  validator: ValidatorFn = () => null;
  
  ngOnChanges(changes: SimpleChanges): void{
    const appEmailChange = changes['appEmail'];
    if(appEmailChange){
      this.validator = appEmailValidator(appEmailChange.currentValue);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null{
    return this.validator(control);
  }

}
