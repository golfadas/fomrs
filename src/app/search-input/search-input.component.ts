import { Component, OnInit, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { FormField } from "../form-field";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: SearchInputComponent}
  ]

})
export class SearchInputComponent implements OnInit, ControlValueAccessor {
  @Input() formField: any;
  _onChange: (value: any) => void;
  options: string[];

  constructor() { }

  ngOnInit() {
    this.options = this.formField.suggestions.map(sug => sug.name.toLowerCase());
  }

  filterOptions(value) {
    console.log(value);
    const inputString = value.toLowerCase();

    this.options = this
      .formField
      .suggestions
      .map(sug => sug.name.toLowerCase());

    if (inputString.length > 0) {this.options = this.options.filter(sug => sug.indexOf(inputString) !== -1) }
  }

  writeValue(value: any) { }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() {}
}
